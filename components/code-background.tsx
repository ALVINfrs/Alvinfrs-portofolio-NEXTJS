"use client"

import { useEffect, useRef } from "react"

export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const codeLines = [
      "const developer = new FullStackDev();",
      "import React from 'react';",
      "app.get('/api/users', async (req, res) => {",
      "  const users = await User.findAll();",
      "  res.json(users);",
      "});",
      "function useEffect(callback, deps) {",
      "  // React hook implementation",
      "}",
      "SELECT * FROM projects WHERE status = 'completed';",
      "git commit -m 'feat: add new feature'",
      "npm install express mongoose cors",
      "docker run -p 3000:3000 my-app",
      "const [state, setState] = useState(null);",
      "export default function Component() {",
      "  return <div>Hello World</div>;",
      "}",
      "CREATE TABLE users (id SERIAL PRIMARY KEY);",
      "fetch('/api/data').then(res => res.json())",
      "const server = express();",
      "mongoose.connect('mongodb://localhost');",
      "if (condition) { return true; }",
    ]

    const particles: Array<{
      x: number
      y: number
      text: string
      speed: number
      opacity: number
      fontSize: number
    }> = []

    // Initialize particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: codeLines[Math.floor(Math.random() * codeLines.length)],
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.2,
        fontSize: 12 + Math.random() * 4,
      })
    }

    function animate() {
      ctx.fillStyle = "rgba(17, 24, 39, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.font = `${particle.fontSize}px 'Courier New', monospace`
        ctx.fillStyle = `rgba(34, 197, 94, ${particle.opacity})`
        ctx.fillText(particle.text, particle.x, particle.y)

        particle.y += particle.speed
        particle.x += Math.sin(particle.y * 0.01) * 0.5

        if (particle.y > canvas.height + 50) {
          particle.y = -50
          particle.x = Math.random() * canvas.width
          particle.text = codeLines[Math.floor(Math.random() * codeLines.length)]
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30" />
}
