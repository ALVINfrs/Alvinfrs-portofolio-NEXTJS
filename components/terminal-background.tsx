"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define terminalCommands outside the component for better performance
const terminalCommandsList = [
  "$ npm start",
  "$ git push origin main",
  "$ docker build -t my-app .",
  "$ yarn dev",
  "$ npm run build",
  "$ git commit -m 'fix: resolve bug'",
  "$ mongod --dbpath /data/db",
  "$ node server.js",
  "$ npm test",
  "$ git pull origin develop",
  "$ docker-compose up -d",
  "$ npm run deploy",
  "Analyzing code structure...",
  "Compiling modules...",
  "Running security scan...",
  "Deploying to production server...",
  "Fetching latest updates...",
  "Initializing virtual environment...",
  "Starting local development server...",
  "Cleaning up old build files...",
];

interface TerminalBackgroundProps {
  positionClasses: string; // e.g., "top-4 right-4"
}

// Renamed the original component and made it accept positionClasses
function SingleTerminal({ positionClasses }: TerminalBackgroundProps) {
  const [commands, setCommands] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with a few commands right away
    const initialCommandCount = Math.floor(Math.random() * 3) + 1;
    const initialCommands = [];
    for (let i = 0; i < initialCommandCount; i++) {
      initialCommands.push(
        terminalCommandsList[
          Math.floor(Math.random() * terminalCommandsList.length)
        ]
      );
    }
    setCommands(initialCommands.slice(-8));

    const interval = setInterval(() => {
      const newCommand =
        terminalCommandsList[
          Math.floor(Math.random() * terminalCommandsList.length)
        ];
      setCommands((prev) => {
        const updated = [...prev, newCommand];
        // Keep the last 8 commands, or fewer if not enough have been added yet
        return updated.length > 8 ? updated.slice(-8) : updated;
      });
    }, 3000); // Interval for adding new commands

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div
      className={`fixed ${positionClasses} z-[5] w-80 h-60 bg-gray-900/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 font-mono text-sm shadow-xl shadow-green-500/10 overflow-hidden flex flex-col`}
    >
      {/* Terminal Header */}
      <div className="flex items-center mb-2 border-b border-green-500/20 pb-2 flex-shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="ml-4 text-gray-400 text-xs">bash</span>
      </div>

      {/* Terminal Body - takes remaining space and scrolls if content overflows */}
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-gray-800">
        <AnimatePresence initial={false}>
          {commands.map((command, index) => (
            <motion.div
              key={`${command}-${index}-${positionClasses}`} // Ensure unique key for AnimatePresence
              initial={{ opacity: 0, y: 10 }} // Start from slightly below
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }} // Exit to the left
              transition={{ duration: 0.3 }}
              className="text-green-400 mb-1 whitespace-nowrap"
            >
              <span className="text-green-300 mr-1">$</span>
              {command}
              {index === commands.length - 1 && ( // Show cursor only on the last command
                <span className="animate-pulse inline-block ml-1 bg-green-400 w-2 h-4"></span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// New default export component that renders four terminals
export default function QuadTerminalDisplay() {
  return (
    <>
      <SingleTerminal positionClasses="top-4 right-4" />
      <SingleTerminal positionClasses="bottom-4 right-4" />
      <SingleTerminal positionClasses="top-4 left-4" />
      <SingleTerminal positionClasses="bottom-4 left-4" />
    </>
  );
}
