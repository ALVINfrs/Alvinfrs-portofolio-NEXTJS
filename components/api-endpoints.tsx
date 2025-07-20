// components/ApiPlayground.tsx
"use client";

import { useState, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Perbaikan 2: Tambahkan CheckCircle di sini
import {
  Server,
  Send,
  Loader2,
  ChevronsRight,
  Copy,
  CheckCircle,
} from "lucide-react";

const endpoints = [
  {
    method: "GET",
    path: "/api/profile",
    description: "Fetches my professional profile data.",
  },
  {
    method: "GET",
    path: "/api/projects",
    description: "Lists my featured deployed projects.",
  },
  {
    method: "GET",
    path: "/api/skills",
    description: "Retrieves my technical skill set.",
  },
];

// Sub-komponen untuk Syntax Highlighting JSON
const JsonSyntaxHighlighter: FC<{ data: any }> = ({ data }) => {
  const highlight = (json: any, indent = 1): JSX.Element[] => {
    // Perbaikan 1: Ubah tipe 'key' menjadi string
    return Object.keys(json).map((key: string) => {
      const value = json[key];
      const isObject = typeof value === "object" && value !== null;
      const indentStyle = { paddingLeft: `${indent * 1.5}rem` };

      return (
        <div key={key} style={indentStyle}>
          <span className="text-purple-400">"{key}"</span>
          <span className="text-gray-400">: </span>
          {isObject ? (
            <>
              <span className="text-gray-400">
                {Array.isArray(value) ? "[" : "{"}
              </span>
              {highlight(value, indent + 1)}
              <span
                className="text-gray-400"
                style={{ paddingLeft: `${indent * 1.5}rem` }}
              >
                {Array.isArray(value) ? "]" : "}"}
              </span>
            </>
          ) : (
            <span
              className={
                typeof value === "string" ? "text-green-300" : "text-yellow-300"
              }
            >
              {typeof value === "string" ? `"${value}"` : String(value)}
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="text-sm">
      <span className="text-gray-400">{"{"}</span>
      {highlight(data)}
      <span className="text-gray-400">{"}"}</span>
    </div>
  );
};

export default function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    setResponse(null);
    setCopied(false);
    try {
      const res = await fetch(selectedEndpoint.path);
      const data = await res.json();
      setResponse({ status: res.status, ok: res.ok, data });
    } catch (error) {
      setResponse({
        status: 500,
        ok: false,
        data: { error: "Failed to connect to the server." },
      });
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">Live API Playground</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          >
            Why just read about my backend skills? Interact with my portfolio's
            own live API. Select an endpoint, send a request, and see the
            real-time JSON response.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Kiri: Daftar Endpoint */}
          <motion.div
            className="lg:w-1/3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
          >
            <h3 className="text-white font-semibold mb-4 text-lg flex items-center gap-2">
              <ChevronsRight size={20} className="text-green-400" /> Select an
              Endpoint
            </h3>
            <div className="space-y-3">
              {endpoints.map((ep) => (
                <motion.button
                  key={ep.path}
                  onClick={() => {
                    setSelectedEndpoint(ep);
                    setResponse(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedEndpoint.path === ep.path
                      ? "bg-green-500/10 border-green-500 shadow-lg shadow-green-500/10"
                      : "bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-gray-500"
                  }`}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded">
                      {ep.method}
                    </span>
                    <span className="text-white font-mono text-sm">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{ep.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Kanan: Playground & Response */}
          <motion.div
            className="lg:w-2/3 bg-gray-900/80 rounded-xl border border-green-500/30 flex flex-col"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
          >
            <div className="p-4 border-b border-green-500/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm bg-green-500/20 text-green-300 px-3 py-1 rounded">
                  {selectedEndpoint.method}
                </span>
                <span className="text-white font-mono">
                  {selectedEndpoint.path}
                </span>
              </div>
              <motion.button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="flex items-center gap-2 bg-green-600 text-black px-4 py-2 rounded-lg hover:bg-green-500 transition-colors disabled:bg-gray-600 disabled:text-gray-400 font-bold"
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
                {isLoading ? "Fetching..." : "Send Request"}
              </motion.button>
            </div>

            <div className="p-4 font-mono text-sm flex-grow min-h-[300px] relative overflow-auto">
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3 } }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Loader2 className="w-8 h-8 text-green-400/50 animate-spin" />
                  </motion.div>
                )}
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p>
                        Status:{" "}
                        <span
                          className={
                            response.ok ? "text-green-400" : "text-red-400"
                          }
                        >
                          {response.status}
                        </span>
                      </p>
                      <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-white transition-colors text-xs flex items-center gap-1"
                      >
                        {copied ? (
                          <CheckCircle size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                        {copied ? "Copied!" : "Copy JSON"}
                      </button>
                    </div>
                    <div className="bg-gray-950/50 p-4 rounded-lg">
                      <JsonSyntaxHighlighter data={response.data} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
