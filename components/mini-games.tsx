"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  Bug,
  Keyboard,
  Binary,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function MiniGames() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playSound = useCallback(
    (type: string) => {
      if (!soundEnabled) return;
      const audio = new Audio(
        type === "click"
          ? "/sounds/click.mp3"
          : type === "win"
          ? "/sounds/win.mp3"
          : "/sounds/error.mp3"
      );
      audio.play().catch(() => {});
    },
    [soundEnabled]
  );

  return (
    <section id="games" className="py-20 relative text-white">
      <div className="absolute inset-0 bg-gray-900 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/80 to-gray-900/0 z-0"></div>

      <motion.div
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">Developer Games</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>

          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />

          <motion.p
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Challenge your coding skills with these interactive developer-themed
            games!
          </motion.p>

          <motion.button
            className="mt-4 p-2 bg-gray-700 rounded-lg"
            onClick={() => setSoundEnabled(!soundEnabled)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg grail-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <CodeMemoryGame playSound={playSound} />
          <SnakeGame playSound={playSound} />
          <BugSquasher playSound={playSound} />
          <CodeTyper playSound={playSound} />
          <BinaryBlaster playSound={playSound} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CodeMemoryGame({ playSound }: { playSound: (type: string) => void }) {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [highScores, setHighScores] = useState<{ [key: string]: number }>({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const devIcons = ["⚛️", "🟨", "🟢", "🔷", "🟣", "🔶", "⚡", "🔥"];
  const cardCounts = { easy: 6, medium: 8, hard: 10 };

  const initializeGame = useCallback(() => {
    const iconCount = cardCounts[difficulty];
    const selectedIcons = devIcons.slice(0, iconCount);
    const shuffled = [...selectedIcons, ...selectedIcons].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
    playSound("click");
  }, [difficulty, playSound]);

  useEffect(() => {
    initializeGame();
    const storedScores = JSON.parse(
      localStorage.getItem("memoryHighScores") || "{}"
    );
    setHighScores({ easy: 0, medium: 0, hard: 0, ...storedScores });
  }, [initializeGame]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        playSound("win");
      } else {
        setTimeout(() => {
          setFlipped([]);
          playSound("error");
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flipped, cards, playSound]);

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setGameWon(true);
      setHighScores((prev) => {
        const newScores = {
          ...prev,
          [difficulty]: Math.min(prev[difficulty] || Infinity, moves),
        };
        localStorage.setItem("memoryHighScores", JSON.stringify(newScores));
        return newScores;
      });
      playSound("win");
    }
  }, [matched, cards.length, difficulty, playSound]);

  const handleCardClick = (index: number) => {
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(index)
    ) {
      setFlipped((prev) => [...prev, index]);
      playSound("click");
    }
  };

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-6"
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
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

      <div className="flex justify-center gap-2 mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <motion.button
            key={level}
            className={`px-3 py-1 rounded-lg text-sm ${
              difficulty === level
                ? "bg-green-500 text-black"
                : "bg-gray-700/50 text-gray-400"
            }`}
            onClick={() => {
              setDifficulty(level as "easy" | "medium" | "hard");
              initializeGame();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="text-center mb-4">
        <span className="text-sm text-gray-400">
          High Score: {highScores[difficulty]}
        </span>
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

function SnakeGame({ playSound }: { playSound: (type: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;
  const speedMap = { easy: 200, medium: 150, hard: 100 };

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
        playSound("error");
        return currentSnake;
      }

      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          playSound("error");
          return currentSnake;
        }
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snakeHighScore", newScore.toString());
          }
          playSound("win");
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
  }, [direction, food, gameStarted, gameOver, highScore, playSound]);

  const handleDirectionChange = useCallback(
    (newDirection: { x: number; y: number }) => {
      if (direction.y === 0 && newDirection.y !== 0) setDirection(newDirection);
      if (direction.x === 0 && newDirection.x !== 0) setDirection(newDirection);
      playSound("click");
    },
    [direction, playSound]
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
    const gameInterval = setInterval(moveSnake, speedMap[difficulty]);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameStarted, gameOver, difficulty]);

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

  useEffect(() => {
    const storedScore = parseInt(localStorage.getItem("snakeHighScore") || "0");
    setHighScore(storedScore);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    playSound("click");
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    playSound("click");
  };

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-4 sm:p-6 w-full"
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
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

      <div className="flex justify-center gap-2 mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <motion.button
            key={level}
            className={`px-3 py-1 rounded-lg text-sm ${
              difficulty === level
                ? "bg-green-500 text-black"
                : "bg-gray-700/50 text-gray-400"
            }`}
            onClick={() => {
              setDifficulty(level as "easy" | "medium" | "hard");
              resetGame();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="bg-gray-900 rounded-lg border border-gray-600 w-full h-auto aspect-square shadow-lg shadow-black/30"
        />

        {(!gameStarted || gameOver) && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-center">
              {gameOver ? (
                <motion.div className="p-4">
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
                <motion.div>
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
                </motion.div>
              )}
            </div>
          </motion.div>
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

function BugSquasher({ playSound }: { playSound: (type: string) => void }) {
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const timeLimits = { easy: 40, medium: 30, hard: 20 };
  const bugSpeeds = { easy: 2, medium: 1.5, hard: 1 };

  const spawnBug = useCallback(() => {
    if (!containerRef.current || !gameStarted || gameOver) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newBug = {
      id: Math.random(),
      x: Math.random() * (width - 50),
      y: Math.random() * (height - 50),
    };
    setBugs((prev) => [...prev, newBug]);
    setTimeout(() => {
      setBugs((prev) => prev.filter((b) => b.id !== newBug.id));
    }, bugSpeeds[difficulty] * 1000);
  }, [gameStarted, gameOver, difficulty]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = setInterval(spawnBug, bugSpeeds[difficulty] * 1000);
    return () => clearInterval(interval);
  }, [spawnBug, gameStarted, gameOver, difficulty]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          playSound("error");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, playSound]);

  useEffect(() => {
    const storedScore = parseInt(localStorage.getItem("bugHighScore") || "0");
    setHighScore(storedScore);
  }, []);

  const handleBugClick = (id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => {
      const newScore = prev + 10;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("bugHighScore", newScore.toString());
      }
      playSound("win");
      return newScore;
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(timeLimits[difficulty]);
    setBugs([]);
    setGameOver(false);
    playSound("click");
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setBugs([]);
    setTimeLeft(0);
    playSound("click");
  };

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 w-full"
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bug className="text-green-400" size={24} />
          <h3 className="text-xl font-bold text-white">Bug Squasher</h3>
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

      <div className="flex justify-center gap-2 mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <motion.button
            key={level}
            className={`px-3 py-1 rounded-lg text-sm ${
              difficulty === level
                ? "bg-green-500 text-black"
                : "bg-gray-700/50 text-gray-400"
            }`}
            onClick={() => {
              setDifficulty(level as "easy" | "medium" | "hard");
              resetGame();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-center text-gray-400 mb-1">
          Time Left: {timeLeft}s
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(timeLeft / timeLimits[difficulty]) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-64 bg-gray-900 rounded-lg border border-gray-600 overflow-hidden"
      >
        <AnimatePresence>
          {bugs.map((bug) => (
            <motion.div
              key={bug.id}
              className="absolute w-12 h-12 flex items-center justify-center text-3xl cursor-pointer"
              style={{ x: bug.x, y: bug.y }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => handleBugClick(bug.id)}
            >
              🐞
            </motion.div>
          ))}
        </AnimatePresence>

        {(!gameStarted || gameOver) && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-center">
              {gameOver ? (
                <motion.div className="p-4">
                  <Trophy className="mx-auto mb-3 text-yellow-400" size={48} />
                  <h3 className="text-2xl text-red-500 font-bold">
                    Debug Complete!
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
                <motion.div>
                  <Play className="mx-auto mb-3 text-green-400" size={48} />
                  <p className="text-white font-bold mb-2">Squash the Bugs!</p>
                  <motion.button
                    onClick={startGame}
                    className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white font-bold flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={16} /> Start Game
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function CodeTyper({ playSound }: { playSound: (type: string) => void }) {
  const [codeSnippet, setCodeSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const snippets = {
    easy: [
      "console.log('Hello World');",
      "let x = 10;",
      "function add(a, b) { return a + b; }",
    ],
    medium: [
      "const arr = [1, 2, 3].map(n => n * 2);",
      "fetch('api/data').then(res => res.json());",
      "class Person { constructor(name) { this.name = name; } }",
    ],
    hard: [
      "const debounce = (fn, delay) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; };",
      "async function fetchData() { try { const res = await fetch('api'); return await res.json(); } catch (e) { throw e; } }",
      "const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn(...args); cache.set(key, result); return result; }; };",
    ],
  };

  const timeLimits = { easy: 40, medium: 30, hard: 20 };

  const generateSnippet = useCallback(() => {
    const snippetList = snippets[difficulty];
    setCodeSnippet(snippetList[Math.floor(Math.random() * snippetList.length)]);
    setUserInput("");
    playSound("click");
  }, [difficulty, playSound]);

  useEffect(() => {
    if (gameStarted) generateSnippet();
    const storedScore = parseInt(localStorage.getItem("typerHighScore") || "0");
    setHighScore(storedScore);
  }, [gameStarted, generateSnippet]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          playSound("error");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, playSound]);

  const handleSubmit = () => {
    if (userInput.trim() === codeSnippet.trim()) {
      setScore((prev) => {
        const points =
          difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
        const newScore = prev + points;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("typerHighScore", newScore.toString());
        }
        playSound("win");
        return newScore;
      });
      generateSnippet();
    } else {
      playSound("error");
    }
    setUserInput("");
    inputRef.current?.focus();
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(timeLimits[difficulty]);
    setGameOver(false);
    generateSnippet();
    inputRef.current?.focus();
    playSound("click");
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setTimeLeft(0);
    setCodeSnippet("");
    setUserInput("");
    playSound("click");
  };

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 w-full"
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Keyboard className="text-green-400" size={24} />
          <h3 className="text-xl font-bold text-white">Code Typer</h3>
        </div>
        <div>
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

      <div className="flex justify-center gap-2 mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <motion.button
            key={level}
            className={`px-3 py-1 rounded-lg text-sm ${
              difficulty === level
                ? "bg-green-500 text-black"
                : "bg-gray-700/50 text-gray-400"
            }`}
            onClick={() => {
              setDifficulty(level as "easy" | "medium" | "hard");
              resetGame();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-center text-gray-400 mb-1">
          Time Left: {timeLeft}s
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(timeLeft / timeLimits[difficulty]) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-900 rounded-lg">
        <pre className="text-green-400 text-sm">
          {codeSnippet || "Press Start to begin..."}
        </pre>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
        placeholder="Type the code here..."
        disabled={!gameStarted || gameOver}
      />

      {(!gameStarted || gameOver) && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="text-center">
            {gameOver ? (
              <motion.div className="p-4">
                <Trophy className="mx-auto mb-3 text-yellow-400" size={48} />
                <h3 className="text-2xl text-red-500 font-bold">
                  Code Compiled!
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
              <motion.div>
                <Play className="mx-auto mb-3 text-green-400" size={48} />
                <p className="text-white font-bold mb-2">Type the Code!</p>
                <motion.button
                  onClick={startGame}
                  className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white font-bold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} /> Start Game
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function BinaryBlaster({ playSound }: { playSound: (type: string) => void }) {
  const [targetNumber, setTargetNumber] = useState(0);
  const [binaryInput, setBinaryInput] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  const maxNumbers = { easy: 15, medium: 63, hard: 255 };
  const timeLimits = { easy: 40, medium: 30, hard: 20 };

  const generateTarget = useCallback(() => {
    setTargetNumber(Math.floor(Math.random() * maxNumbers[difficulty]) + 1);
    setBinaryInput(new Array(8).fill(0));
    playSound("click");
  }, [difficulty, playSound]);

  useEffect(() => {
    if (gameStarted) generateTarget();
    const storedScore = parseInt(
      localStorage.getItem("binaryHighScore") || "0"
    );
    setHighScore(storedScore);
  }, [gameStarted, generateTarget]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          playSound("error");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, playSound]);

  const handleBitClick = (index: number) => {
    const newInput = [...binaryInput];
    newInput[index] = newInput[index] === 0 ? 1 : 0;
    setBinaryInput(newInput);
    playSound("click");
  };

  const checkAnswer = () => {
    const inputDecimal = parseInt(binaryInput.join(""), 2);
    if (inputDecimal === targetNumber) {
      setScore((prev) => {
        const points =
          difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;
        const newScore = prev + points;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("binaryHighScore", newScore.toString());
        }
        playSound("win");
        return newScore;
      });
      generateTarget();
    } else {
      playSound("error");
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(timeLimits[difficulty]);
    setGameOver(false);
    generateTarget();
    playSound("click");
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setTimeLeft(0);
    setTargetNumber(0);
    setBinaryInput(new Array(8).fill(0));
    playSound("click");
  };

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 w-full"
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Binary className="text-green-400" size={24} />
          <h3 className="text-xl font-bold text-white">Binary Blaster</h3>
        </div>
        <div>
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

      <div className="flex justify-center gap-2 mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <motion.button
            key={level}
            className={`px-3 py-1 rounded-lg text-sm ${
              difficulty === level
                ? "bg-green-500 text-black"
                : "bg-gray-700/50 text-gray-400"
            }`}
            onClick={() => {
              setDifficulty(level as "easy" | "medium" | "hard");
              resetGame();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-center text-gray-400 mb-1">
          Time Left: {timeLeft}s
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(timeLeft / timeLimits[difficulty]) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg mb-2">
          Convert{" "}
          <span className="text-green-400 font-bold">{targetNumber}</span> to
          binary:
        </p>
        <div className="flex justify-center gap-1 mb-4">
          {binaryInput.map((bit, index) => (
            <motion.button
              key={index}
              className={`w-10 h-10 rounded-lg text-lg font-bold ${
                bit === 1
                  ? "bg-green-500 text-black"
                  : "bg-gray-700 text-gray-400"
              }`}
              onClick={() => handleBitClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {bit}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold"
          onClick={checkAnswer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </div>

      {(!gameStarted || gameOver) && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="text-center">
            {gameOver ? (
              <motion.div className="p-4">
                <Trophy className="mx-auto mb-3 text-yellow-400" size={48} />
                <h3 className="text-2xl text-red-500 font-bold">
                  Binary Complete!
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
              <motion.div>
                <Play className="mx-auto mb-3 text-green-400" size={48} />
                <p className="text-white font-bold mb-2">Blast the Bits!</p>
                <motion.button
                  onClick={startGame}
                  className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white font-bold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} /> Start Game
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
