"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Play,
  RotateCcw,
  Trophy,
  Gamepad2,
  Target,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// This is the main component that holds both games.
export default function MiniGames() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <section id="games" className="py-20 relative text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gray-900 z-0"></div>
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
            Interactive coding games built with React - test your developer
            skills!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CodeMemoryGame />
          <SnakeGame />
        </div>
      </motion.div>
    </section>
  );
}

// Memory Game Component
function CodeMemoryGame() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Developer-themed card pairs
  const devIcons = ["⚛️", "🟨", "🟢", "🔷", "🟣", "🔶", "⚡", "🔥"];

  const initializeGame = useCallback(() => {
    const shuffled = [...devIcons, ...devIcons].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const handleCardClick = (index: number) => {
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(index)
    ) {
      setFlipped((prev) => [...prev, index]);
    }
  };

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
          <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
            Moves: {moves}
          </span>
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
          <span className="text-green-400 font-bold text-lg">
            🎉 ACCESS GRANTED! Completed in {moves} moves!
          </span>
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
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              rotateY:
                flipped.includes(index) || matched.includes(index) ? 180 : 0,
            }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {card}
              </motion.span>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center text-gray-500"
              style={{ backfaceVisibility: "hidden" }}
            >
              💻
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Match the developer tools to unlock access! 🔓
        </p>
      </div>
    </motion.div>
  );
}

// Snake Game Component
function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [highScore, setHighScore] = useState(0);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return currentSnake;
      }

      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          return currentSnake;
        }
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });

        let newFoodPosition: { x: number; y: number };
        do {
          newFoodPosition = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          };
        } while (
          newSnake.some(
            (segment) =>
              segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
          )
        );
        setFood(newFoodPosition);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameStarted, gameOver, highScore]);

  const handleDirectionChange = useCallback(
    (newDirection: { x: number; y: number }) => {
      if (direction.y === 0 && newDirection.y !== 0) setDirection(newDirection);
      if (direction.x === 0 && newDirection.x !== 0) setDirection(newDirection);
    },
    [direction]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      switch (e.key) {
        case "ArrowUp":
          handleDirectionChange({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          handleDirectionChange({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          handleDirectionChange({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          handleDirectionChange({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, handleDirectionChange]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameStarted, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 0.5;
    for (let i = 1; i < GRID_SIZE; i++) {
      const pos = i * (CANVAS_SIZE / GRID_SIZE);
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(CANVAS_SIZE, pos);
      ctx.stroke();
    }

    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#10b981" : "#059669";
      ctx.fillRect(
        segment.x * (CANVAS_SIZE / GRID_SIZE),
        segment.y * (CANVAS_SIZE / GRID_SIZE),
        CANVAS_SIZE / GRID_SIZE,
        CANVAS_SIZE / GRID_SIZE
      );
    });

    const foodCellSize = CANVAS_SIZE / GRID_SIZE;
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(
      food.x * foodCellSize,
      food.y * foodCellSize,
      foodCellSize,
      foodCellSize
    );
    ctx.shadowBlur = 0;
  }, [snake, food]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-4 sm:p-6 w-full"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Gamepad2 className="text-green-400" size={24} />
          <h3 className="text-xl font-bold text-white">Code Snake</h3>
        </div>
        <div className="text-right">
          <div className="text-lg">
            <span className="text-gray-400">Score: </span>
            <span className="text-green-400 font-bold">{score}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">High: </span>
            <span className="text-yellow-400 font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="bg-gray-900 rounded-lg border border-gray-600 w-full h-auto aspect-square shadow-lg shadow-black/30"
        />

        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg">
            <div className="text-center">
              {gameOver ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4"
                >
                  <Trophy className="mx-auto mb-3 text-yellow-400" size={48} />
                  <h3 className="text-2xl text-red-500 font-bold">
                    System Crash!
                  </h3>
                  <p className="text-white font-bold text-lg mb-4">
                    Final Score: {score}
                  </p>
                  <motion.button
                    onClick={startGame}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white font-bold flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw size={16} /> Play Again
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <Play className="mx-auto mb-3 text-green-400" size={48} />
                  <p className="text-white font-bold mb-2">Ready to Deploy?</p>
                  <motion.button
                    onClick={startGame}
                    className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white font-bold flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={16} /> Start Game
                  </motion.button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 grid-rows-3 gap-2 max-w-[200px] mx-auto">
        <div className="col-start-2 row-start-1 flex justify-center">
          <motion.button
            onClick={() => handleDirectionChange({ x: 0, y: -1 })}
            className="p-4 bg-gray-700/80 rounded-lg active:bg-green-500/50"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp />
          </motion.button>
        </div>
        <div className="col-start-1 row-start-2 flex justify-center">
          <motion.button
            onClick={() => handleDirectionChange({ x: -1, y: 0 })}
            className="p-4 bg-gray-700/80 rounded-lg active:bg-green-500/50"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft />
          </motion.button>
        </div>
        <div className="col-start-2 row-start-2 flex justify-center">
          <motion.button
            onClick={resetGame}
            className="p-4 bg-gray-700/80 rounded-full active:bg-red-500/50"
            whileTap={{ scale: 0.9 }}
          >
            <RotateCcw size={16} />
          </motion.button>
        </div>
        <div className="col-start-3 row-start-2 flex justify-center">
          <motion.button
            onClick={() => handleDirectionChange({ x: 1, y: 0 })}
            className="p-4 bg-gray-700/80 rounded-lg active:bg-green-500/50"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight />
          </motion.button>
        </div>
        <div className="col-start-2 row-start-3 flex justify-center">
          <motion.button
            onClick={() => handleDirectionChange({ x: 0, y: 1 })}
            className="p-4 bg-gray-700/80 rounded-lg active:bg-green-500/50"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowDown />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
