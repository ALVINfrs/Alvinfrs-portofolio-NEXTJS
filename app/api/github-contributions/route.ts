// app/api/github-contributions/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  const GITHUB_TOKEN = process.env.GITHUB_PAT;
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  // Query GraphQL untuk mengambil data kontribusi selama setahun terakhir
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("GitHub API Error:", errorBody);
      throw new Error(
        `Failed to fetch from GitHub API: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      throw new Error(data.errors.map((e: any) => e.message).join("\n"));
    }

    // Data dari API berbentuk array of weeks. Kita perlu meratakannya.
    const contributionDays =
      data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week: any) => week.contributionDays
      );

    return NextResponse.json(contributionDays);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
