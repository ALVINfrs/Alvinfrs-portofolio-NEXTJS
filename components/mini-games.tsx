"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Play, RotateCcw, Trophy, Gamepad2, Target } from "lucide-react"

export default function MiniGames() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  return (
    <section id="games" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/80 to-gray-900/0 z-0"></div>

      <motion.div
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 inline-block"
            initial={{ y: 50 }}
            animate={isInView ? { y: 0 } : { y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">Developer Games</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>

          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Interactive coding games built with React - test your developer skills!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CodeMemoryGame />
          <SnakeGame />
        </div>
      </motion.div>
    </section>
  )
}

function CodeMemoryGame() {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  // Developer-themed card pairs
  const devIcons = ["⚛️", "🟨", "🟢", "🔷", "🟣", "🔶", "⚡", "🔥"]

  const initializeGame = () => {
    const shuffled = [...devIcons, ...devIcons].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second])
        setFlipped([])
        // Success sound effect simulation
        console.log("🎵 Match sound!")
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flipped, cards])

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true)
      console.log("🎵 Victory sound!")
    }
  }, [matched, cards])

  const handleCardClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped((prev) => [...prev, index])
      console.log("🎵 Card flip sound!")
    }
  }

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-6"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="text-green-400" size={24} />
          <h3 className="text-xl font-bold text-white">Code Memory</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">Moves: {moves}</span>
          <motion.button
            onClick={initializeGame}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
          </motion.button>
        </div>
      </div>

      {gameWon && (
        <motion.div
          className="mb-6 p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500 rounded-lg text-center"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Trophy className="inline-block mr-2 text-yellow-400" size={24} />
          <span className="text-green-400 font-bold text-lg">🎉 ACCESS GRANTED! Completed in {moves} moves!</span>
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`aspect-square rounded-lg border-2 cursor-pointer flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
              flipped.includes(index) || matched.includes(index)
                ? "bg-gradient-to-br from-green-600 to-green-700 border-green-400 text-white shadow-lg shadow-green-500/30"
                : "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 hover:border-gray-500 hover:shadow-lg"
            }`}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={flipped.includes(index) || matched.includes(index) ? { rotateY: [0, 180, 360] } : {}}
            transition={{ duration: 0.6 }}
          >
            {flipped.includes(index) || matched.includes(index) ? (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                {card}
              </motion.span>
            ) : (
              <span className="text-gray-500">💻</span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">Match the developer tools to unlock access! 🔓</p>
      </div>
    </motion.div>
  )
}

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 0, y: 0 })
  const [highScore, setHighScore] = useState(0)

  const GRID_SIZE = 20
  const CANVAS_SIZE = 400

  // Game logic
  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        console.log("🎵 Game over sound!")
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10
          if (newScore > highScore) {
            setHighScore(newScore)
          }
          return newScore
        })
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        })
        console.log("🎵 Eat sound!")
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameStarted, gameOver, highScore])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, gameStarted])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameInterval = setInterval(moveSnake, 150)
    return () => clearInterval(gameInterval)
  }, [moveSnake, gameStarted, gameOver])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with grid pattern
    ctx.fillStyle = "#1f2937"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw grid
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * (CANVAS_SIZE / GRID_SIZE), 0)
      ctx.lineTo(i * (CANVAS_SIZE / GRID_SIZE), CANVAS_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * (CANVAS_SIZE / GRID_SIZE))
      ctx.lineTo(CANVAS_SIZE, i * (CANVAS_SIZE / GRID_SIZE))
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const x = segment.x * (CANVAS_SIZE / GRID_SIZE)
      const y = segment.y * (CANVAS_SIZE / GRID_SIZE)
      const size = CANVAS_SIZE / GRID_SIZE - 2

      if (index === 0) {
        // Snake head
        ctx.fillStyle = "#10b981"
        ctx.fillRect(x + 1, y + 1, size, size)
        ctx.fillStyle = "#065f46"
        ctx.fillRect(x + 3, y + 3, size - 4, size - 4)
      } else {
        // Snake body
        ctx.fillStyle = "#059669"
        ctx.fillRect(x + 1, y + 1, size, size)
      }
    })

    // Draw food
    const foodX = food.x * (CANVAS_SIZE / GRID_SIZE)
    const foodY = food.y * (CANVAS_SIZE / GRID_SIZE)
    const foodSize = CANVAS_SIZE / GRID_SIZE - 2

    ctx.fillStyle = "#ef4444"
    ctx.fillRect(foodX + 1, foodY + 1, foodSize, foodSize)
    ctx.fillStyle = "#dc2626"
    ctx.fillRect(foodX + 3, foodY + 3, foodSize - 4, foodSize - 4)
  }, [snake, food])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setGameOver(false)
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 15, y: 15 })
    setDirection({ x: 1, y: 0 })
  }

  const resetGame = () => {
    setGameStarted(false)
    setScore(0)
    setGameOver(false)
    setSnake([{ x: 10, y: 10 }])
    setDirection({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-6"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Gamepad2 className="text-green-400" size={24} />
          <h3 className="text-xl font-bold text-white">Code Snake</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            <div>
              Score: <span className="text-green-400 font-bold">{score}</span>
            </div>
            <div>
              High: <span className="text-yellow-400 font-bold">{highScore}</span>
            </div>
          </div>
          <motion.button
            onClick={gameStarted ? resetGame : startGame}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {gameStarted ? <RotateCcw size={16} /> : <Play size={16} />}
          </motion.button>
        </div>
      </div>

      {gameOver && (
        <motion.div
          className="mb-6 p-4 bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-red-500 rounded-lg text-center"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Trophy className="inline-block mr-2 text-yellow-400" size={24} />
          <span className="text-red-400 font-bold text-lg">💥 System Crash! Final Score: {score}</span>
        </motion.div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="bg-gray-900 rounded-lg border border-gray-600 w-full max-w-md mx-auto shadow-lg"
        />

        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg">
            <div className="text-center">
              <Play className="mx-auto mb-3 text-green-400" size={48} />
              <p className="text-white font-bold mb-2">Ready to Code?</p>
              <p className="text-gray-400 text-sm">Use arrow keys to navigate</p>
              <p className="text-green-400 text-xs mt-2">Collect data packets to grow!</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">Navigate through the code matrix! 🐍💻</p>
      </div>
    </motion.div>
  )
}
