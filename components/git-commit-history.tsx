"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  GitCommit,
  GitMerge,
  Calendar,
  Loader2,
  AlertTriangle,
  Package,
  Github,
  ArrowRight,
} from "lucide-react";

// Definisikan tipe data untuk commit, tambahkan 'repo'
type Commit = {
  id: number;
  hash: string;
  message: string;
  author: string;
  date: string;
  time: string;
  repo: string; // Tambahkan properti repo
  branch: string;
  type: string;
  files: string[];
};

export default function GitCommitHistory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const [selectedCommit, setSelectedCommit] = useState<number | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/git-history");
        if (!response.ok) {
          throw new Error("Failed to load commit history.");
        }
        const data = await response.json();
        setCommits(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCommits();
  }, []);

  const getCommitTypeColor = (type: string) => {
    switch (type) {
      case "feat":
        return "text-green-400 bg-green-500/20";
      case "fix":
        return "text-red-400 bg-red-500/20";
      case "style":
        return "text-purple-400 bg-purple-500/20";
      case "docs":
        return "text-blue-400 bg-blue-500/20";
      case "refactor":
        return "text-yellow-400 bg-yellow-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getCommitIcon = (type: string) => {
    switch (type) {
      case "feat":
        return <GitBranch size={16} />;
      case "fix":
        return <GitCommit size={16} />;
      case "refactor":
        return <GitMerge size={16} />;
      default:
        return <GitCommit size={16} />;
    }
  };

  return (
    <section className="py-20 relative">
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
            <span className="text-white">Git History</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>

          <motion.div
            className="h-1 w-20 bg-green-500 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* === PERUBAHAN DESKRIPSI DI SINI === */}
          <motion.p
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A live feed of my 5 most recent commits, showcasing my ongoing
            dedication and development activity across all projects.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gray-800/80 backdrop-blur-sm rounded-t-lg border border-green-500/30 p-4 flex items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 font-mono text-sm">
              git log --all-repos
            </span>
          </motion.div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-b-lg border-x border-b border-green-500/30 p-6 min-h-[400px] flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
            ) : error ? (
              <div className="text-red-400 flex items-center gap-2">
                <AlertTriangle /> {error}
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-green-500/30"></div>
                {commits.map((commit, index) => (
                  <motion.div
                    key={commit.hash + commit.repo}
                    className="relative flex items-start gap-4 mb-6 last:mb-0 cursor-pointer group"
                    initial={{ x: -50, opacity: 0 }}
                    animate={
                      isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    onClick={() =>
                      setSelectedCommit(
                        selectedCommit === commit.id ? null : commit.id
                      )
                    }
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative z-10 w-4 h-4 mt-1 bg-green-500 rounded-full border-2 border-gray-900 group-hover:scale-125 transition-transform duration-200">
                      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div className="flex-1 bg-gray-800/50 rounded-lg border border-green-500/20 p-4 group-hover:border-green-400/50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getCommitTypeColor(
                              commit.type
                            )}`}
                          >
                            {getCommitIcon(commit.type)}
                            <span className="ml-1">{commit.type}</span>
                          </span>
                          <span className="text-gray-400 font-mono text-sm">
                            {commit.hash}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0 ml-4">
                          <Calendar size={12} />
                          <span>
                            {commit.date} {commit.time}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-white font-medium mb-2">
                        {commit.message}
                      </h3>
                      <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                        <span className="text-gray-400">
                          by {commit.author}
                        </span>
                        <div className="flex items-center gap-2 text-green-400 font-mono text-xs bg-gray-700/50 px-2 py-1 rounded">
                          <Package size={14} /> <span>{commit.repo}</span>
                          <span className="text-gray-500">/</span>
                          <GitBranch size={14} /> <span>{commit.branch}</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedCommit === commit.id && (
                          <motion.div
                            className="mt-4 pt-4 border-t border-green-500/20 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="text-sm">
                              <div className="text-gray-400 mb-2">
                                Files changed:
                              </div>
                              {commit.files.length > 0 ? (
                                <div className="space-y-1">
                                  {commit.files.map((file, fileIndex) => (
                                    <div
                                      key={fileIndex}
                                      className="flex items-center gap-2 text-green-400 font-mono text-xs"
                                    >
                                      <span className="text-green-500">+</span>
                                      {file}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-xs italic">
                                  No file changes available for this commit.
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                2,500+
              </div>
              <div className="text-gray-400 text-sm">Total Commits</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">15</div>
              <div className="text-gray-400 text-sm">Active Branches</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
              <div className="text-gray-400 text-sm">Code Coverage</div>
            </div>
          </motion.div>

          {/* === BAGIAN BARU DI SINI === */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <a
              href="https://github.com/ALVINfrs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-green-400 border border-green-500/50 rounded-lg px-6 py-3 hover:bg-green-500/10 transition-all duration-300 group"
            >
              <Github size={20} />
              <span className="font-semibold">
                Curious for more? Explore all my contributions on GitHub
              </span>
              <ArrowRight
                size={20}
                className="transform transition-transform group-hover:translate-x-2"
              />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
