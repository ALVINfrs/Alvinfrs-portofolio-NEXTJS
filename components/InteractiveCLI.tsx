// components/InteractiveCLI.tsx
"use client";

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github } from "lucide-react";

type Line = {
  type: "input" | "output" | "error" | "system" | "header";
  text: string | JSX.Element;
};

const commands: {
  [key: string]: {
    description: string;
    usage?: string;
    action: (args: string[]) => Promise<string | JSX.Element>;
  };
} = {
  help: {
    description: "Displays a list of all available commands.",
    action: async () => (
      <div className="space-y-1">
        <p className="text-green-400">Available Commands:</p>
        {Object.entries(commands).map(([name, { description, usage }]) => (
          <div key={name} className="flex items-start">
            <span className="w-24 shrink-0 text-purple-400">{name}</span>
            <span className="text-gray-400">
              - {description}{" "}
              {usage && <span className="text-yellow-400">{usage}</span>}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  whoami: {
    description: "Provides a brief introduction about me.",
    action: async () => `
    <span class="text-white">Muhammad Alvin Faris</span>
    A passionate Full Stack Developer from Jakarta, Indonesia. I specialize in building dynamic and responsive web applications with a focus on user experience and clean code. My journey is fueled by a relentless curiosity and a drive to solve real-world problems through technology.
    `,
  },
  projects: {
    description: "Lists my featured projects with links.",
    action: async () => (
      <div className="w-full overflow-x-auto">
        <p>Fetching project data...</p>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr>
              <th className="p-1 text-purple-400">Project Name</th>
              <th className="p-1 text-purple-400">Description</th>
              <th className="p-1 text-purple-400">Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1">Ngestream</td>
              <td className="p-1">A Netflix clone with Supabase auth.</td>
              <td className="p-1">
                <a
                  href="https://ngestream.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline"
                >
                  Live Demo
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-1">Caffeine</td>
              <td className="p-1">Fullstack coffee shop e-commerce.</td>
              <td className="p-1">
                <a
                  href="https://caffeine-fullstack-fix.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline"
                >
                  Live Demo
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-1">Kardiologiku</td>
              <td className="p-1">Educational website for arrhythmia.</td>
              <td className="p-1">
                <a
                  href="https://kardiologiku-landing-page.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline"
                >
                  Live Demo
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  skills: {
    description: "Shows my main technical skills.",
    action: async () => `
    <span class="text-green-400">Frontend:</span>  <span class="text-white">React, Next.js, TypeScript, TailwindCSS</span>
    <span class="text-green-400">Backend:</span>   <span class="text-white">Node.js, Express, Hapi.js, Java</span>
    <span class="text-green-400">Databases:</span> <span class="text-white">PostgreSQL, MySQL, MongoDB</span>
    `,
  },
  socials: {
    description: "Displays my social media links.",
    usage: "[--open linkedin|github]",
    action: async (args) => {
      const openLink = (url: string) => {
        setTimeout(() => window.open(url, "_blank"), 500);
        return `Initializing secure connection to ${url}...`;
      };

      if (args[0] === "--open") {
        if (args[1] === "linkedin")
          return openLink("https://www.linkedin.com/in/alvin-faris-89060a31b/");
        if (args[1] === "github")
          return openLink("https://github.com/ALVINfrs");
        return `<span class="text-red-400">Error: Invalid argument. Use 'linkedin' or 'github'.</span>`;
      }

      return (
        <div className="space-y-1">
          <p>Connect with me:</p>
          <div className="flex items-center gap-2">
            <Github size={16} className="text-gray-400" />{" "}
            <a
              href="https://github.com/ALVINfrs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              github.com/ALVINfrs
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin size={16} className="text-blue-400" />{" "}
            <a
              href="https://www.linkedin.com/in/alvin-faris-89060a31b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              linkedin.com/in/alvin-faris
            </a>
          </div>
        </div>
      );
    },
  },
  contact: {
    description: "Shows my email for contact.",
    action: async () =>
      `You can reach me at: <a href="mailto:alvinfaris59@gmail.com" class="text-green-400 underline">alvinfaris59@gmail.com</a>`,
  },
  clear: {
    description: "Clears the terminal screen.",
    action: async () => "clear",
  },
  neofetch: {
    description: "Displays system information (a classic CLI easter egg).",
    action: async () => `
<pre class="text-green-400 flex gap-4">
<span>    ./-                      </span><span class="text-white">alvin@portfolio</span>
<span>    -MMM-                    </span><span class="text-white">---------------</span>
<span>   -MMMMM-                   </span><span class="text-white">OS: Web Browser</span>
<span>  -MMMMMMM-                  </span><span class="text-white">Host: Your Device</span>
<span> -MMMMMMMMMM-                </span><span class="text-white">Kernel: Next.js 14</span>
<span> -MMMMMMMMMMMM-              </span><span class="text-white">Uptime: session</span>
<span>-MMMMMMMMMMMMMM-             </span><span class="text-white">Packages: 1 (this portfolio)</span>
<span>-MMMMMMMMMMMMMM-             </span><span class="text-white">Shell: portfolio-cli v1.0</span>
<span>-MMMMMMMMMMMMMM-             </span><span class="text-white">Resolution: your screen</span>
<span>-MMMMMMMMMMMMMM-             </span><span class="text-white">Terminal: InteractiveCLI</span>
<span> -MMMMMMMMMMMM-              </span><span class="text-white">CPU: Your Awesome Brain</span>
<span>  -MMMMMMMMMM-               </span><span class="text-white">GPU: Your Imagination</span>
<span>   -MMMMMMM-                 </span><span class="text-white">Memory: Unlimited Potential</span>
<span>    -MMMM-                   </span>
</pre>
      `,
  },
};

const Output: React.FC<{ line: Line }> = ({ line }) => {
  if (typeof line.text === "string") {
    return <div dangerouslySetInnerHTML={{ __html: line.text }} />;
  }
  return <>{line.text}</>;
};

export default function InteractiveCLI() {
  const [lines, setLines] = useState<Line[]>([
    { type: "header", text: "Welcome to Alvnfrss Interactive CLI v1.0" },
    {
      type: "system",
      text: 'Type "help" to see the list of available commands. Use Tab for autocomplete.',
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const endOfLinesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!hasInteracted) setHasInteracted(true);
  };

  const processCommand = useCallback(
    async (commandInput: string) => {
      setIsProcessing(true);
      const newLines: Line[] = [
        ...lines,
        { type: "input", text: commandInput },
      ];
      setLines(newLines);
      if (commandInput) setHistory((prev) => [commandInput, ...prev]);
      setHistoryIndex(-1);
      setInput("");

      const [commandName, ...args] = commandInput.split(/\s+/);
      const command = commands[commandName.toLowerCase()];

      let outputLine: Line;

      if (command) {
        const output = await command.action(args);
        if (output === "clear") {
          setLines([]);
        } else {
          outputLine = { type: "output", text: output };
          setLines([...newLines, outputLine]);
        }
      } else {
        outputLine = {
          type: "error",
          text: `Command not found: "${commandName}". Type "help" for a list of commands.`,
        };
        setLines([...newLines, outputLine]);
      }
      setIsProcessing(false);
    },
    [lines]
  );

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (isProcessing) return;

    if (e.key === "Enter") {
      await processCommand(input.trim());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matchingCommands = Object.keys(commands).filter((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  // ⬇️ scroll hanya kalau user sudah mulai interaksi
  useEffect(() => {
    if (hasInteracted) {
      endOfLinesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, hasInteracted]);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="w-full max-w-4xl mx-auto h-[70vh] bg-black/80 backdrop-blur-sm rounded-xl border border-green-500/30 shadow-2xl shadow-green-500/10 flex flex-col relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Efek Scanline */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{
              background:
                "linear-gradient(rgba(16, 185, 129, 0.1) 50%, transparent 50%)",
              backgroundSize: "100% 3px",
            }}
          />

          <div className="flex-shrink-0 p-3 bg-gray-800/50 border-b border-green-500/20 flex items-center gap-2 rounded-t-xl">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm font-mono ml-auto">
              alvin@portfolio ~ zsh
            </span>
          </div>

          <div
            className="flex-grow p-4 overflow-y-auto font-mono text-sm"
            id="terminal-body"
          >
            <AnimatePresence>
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2"
                >
                  {line.type === "input" && (
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2 shrink-0">&gt;</span>
                      <span>{line.text}</span>
                    </div>
                  )}
                  {line.type === "output" && <Output line={line} />}
                  {line.type === "error" && (
                    <div className="text-red-400">{line.text}</div>
                  )}
                  {line.type === "system" && (
                    <div className="text-gray-500 italic">{line.text}</div>
                  )}
                  {line.type === "header" && (
                    <div className="text-purple-400 font-bold">{line.text}</div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={endOfLinesRef} />
          </div>

          <div className="flex-shrink-0 p-4 border-t border-green-500/20 flex items-center gap-2 font-mono text-sm bg-black/30">
            <span className="text-green-400">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
              className="bg-transparent text-white w-full outline-none"
              placeholder={isProcessing ? "Processing..." : "Type a command..."}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />
            {!isProcessing && (
              <div className="w-2 h-4 bg-green-400 animate-pulse" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
