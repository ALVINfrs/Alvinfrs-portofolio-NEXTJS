// app/api/git-history/route.ts

import { NextResponse } from "next/server";

function parseCommitMessage(message: string): {
  type: string;
  message: string;
} {
  const match = message.match(
    /^(feat|fix|style|docs|refactor|test|chore)(\(.*\))?:\s*(.*)/
  );
  if (match) {
    return { type: match[1], message: match[3] };
  }
  return { type: "chore", message };
}

export async function GET() {
  const GITHUB_PAT = process.env.GITHUB_PAT;
  const USERNAME = "ALVINfrs"; // Ganti dengan username GitHub Anda

  if (!GITHUB_PAT) {
    return NextResponse.json(
      { error: "GitHub token tidak dikonfigurasi" },
      { status: 500 }
    );
  }

  // 1. Ambil event publik terbaru dari pengguna
  const eventsUrl = `https://api.github.com/users/${USERNAME}/events/public?per_page=100`;

  try {
    const eventsResponse = await fetch(eventsUrl, {
      headers: { Authorization: `Bearer ${GITHUB_PAT}` },
      next: { revalidate: 900 }, // Cache data selama 15 menit
    });

    if (!eventsResponse.ok) {
      throw new Error(
        `Gagal mengambil event dari GitHub: ${eventsResponse.statusText}`
      );
    }

    const events = await eventsResponse.json();

    // 2. Filter untuk mendapatkan commit dari PushEvent dan kumpulkan
    let allCommits: any[] = [];
    for (const event of events) {
      if (event.type === "PushEvent" && event.payload.commits) {
        const repoName = event.repo.name;
        const branch = event.payload.ref.split("/").pop(); // Mendapatkan nama branch

        const commitsFromEvent = event.payload.commits.map((commit: any) => ({
          ...commit,
          repo: repoName,
          branch: branch,
        }));
        allCommits.push(...commitsFromEvent);
      }
    }

    // 3. Ambil 5 commit terbaru dan dapatkan detail filenya
    const recentCommits = allCommits.slice(0, 5);

    const commitsWithFiles = await Promise.all(
      recentCommits.map(async (commit: any) => {
        const detailUrl = `https://api.github.com/repos/${commit.repo}/commits/${commit.sha}`;
        const detailResponse = await fetch(detailUrl, {
          headers: { Authorization: `Bearer ${GITHUB_PAT}` },
        });

        if (!detailResponse.ok) return { ...commit, files: [] };

        const commitDetail = await detailResponse.json();
        const files = commitDetail.files.map((file: any) => file.filename);

        return { ...commit, files };
      })
    );

    // 4. Format data akhir sesuai kebutuhan frontend
    const formattedCommits = commitsWithFiles.map(
      (commit: any, index: number) => {
        const parsed = parseCommitMessage(commit.message);
        const commitDate = new Date(commit.author.date || Date.now());

        return {
          id: index + 1,
          hash: commit.sha.substring(0, 7),
          message: parsed.message,
          author: commit.author.name,
          date: commitDate.toISOString().split("T")[0],
          time: commitDate.toTimeString().split(" ")[0].substring(0, 5),
          repo: commit.repo, // Tambahkan nama repo
          branch: commit.branch, // Tambahkan nama branch
          type: parsed.type,
          files: commit.files || [],
        };
      }
    );

    return NextResponse.json(formattedCommits);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
