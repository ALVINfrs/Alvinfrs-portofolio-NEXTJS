"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Server, Database, Shield, Zap, CheckCircle, AlertCircle } from "lucide-react"

export default function ApiEndpoints() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [selectedEndpoint, setSelectedEndpoint] = useState<number | null>(null)

  const endpoints = [
    {
      id: 1,
      method: "GET",
      path: "/api/users",
      description: "Retrieve all users with pagination",
      status: "active",
      responseTime: "45ms",
      lastTested: "2 mins ago",
      auth: true,
      example: {
        request: "GET /api/users?page=1&limit=10",
        response: {
          users: [{ id: 1, name: "John Doe", email: "john@example.com" }],
          pagination: { page: 1, limit: 10, total: 100 },
        },
      },
    },
    {
      id: 2,
      method: "POST",
      path: "/api/auth/login",
      description: "User authentication endpoint",
      status: "active",
      responseTime: "120ms",
      lastTested: "5 mins ago",
      auth: false,
      example: {
        request: "POST /api/auth/login",
        response: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          user: { id: 1, name: "John Doe" },
        },
      },
    },
    {
      id: 3,
      method: "PUT",
      path: "/api/projects/:id",
      description: "Update project information",
      status: "active",
      responseTime: "89ms",
      lastTested: "1 min ago",
      auth: true,
      example: {
        request: "PUT /api/projects/123",
        response: {
          id: 123,
          title: "Updated Project",
          status: "completed",
        },
      },
    },
    {
      id: 4,
      method: "DELETE",
      path: "/api/users/:id",
      description: "Delete user account",
      status: "maintenance",
      responseTime: "N/A",
      lastTested: "1 hour ago",
      auth: true,
      example: {
        request: "DELETE /api/users/123",
        response: {
          message: "User deleted successfully",
        },
      },
    },
  ]

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-green-400 bg-green-500/20"
      case "POST":
        return "text-blue-400 bg-blue-500/20"
      case "PUT":
        return "text-yellow-400 bg-yellow-500/20"
      case "DELETE":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="text-green-400" size={16} />
      case "maintenance":
        return <AlertCircle className="text-yellow-400" size={16} />
      default:
        return <AlertCircle className="text-red-400" size={16} />
    }
  }

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
            <span className="text-white">API Endpoints</span>
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
            RESTful API endpoints and backend services
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* API Dashboard Header */}
          <motion.div
            className="bg-gray-800/80 backdrop-blur-sm rounded-t-lg border border-green-500/30 p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="text-green-400" size={24} />
                <span className="text-white font-bold">API Dashboard</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Live</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>4 Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>1 Maintenance</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Endpoints List */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-b-lg border-x border-b border-green-500/30">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                className="border-b border-green-500/20 last:border-b-0"
                initial={{ x: -50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-800/50 transition-all duration-200"
                  onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint.id ? null : endpoint.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded font-mono text-sm font-bold ${getMethodColor(endpoint.method)}`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="text-white font-mono">{endpoint.path}</span>
                      <span className="text-gray-400 text-sm">{endpoint.description}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(endpoint.status)}
                        <span className="text-sm text-gray-400">{endpoint.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {endpoint.auth && <Shield className="text-yellow-400" size={16} />}
                        <Zap className="text-green-400" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">Last tested: {endpoint.lastTested}</div>

                  {/* Expanded Details */}
                  {selectedEndpoint === endpoint.id && (
                    <motion.div
                      className="mt-6 pt-6 border-t border-green-500/20"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Request Example */}
                        <div>
                          <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                            <Database size={16} />
                            Request Example
                          </h4>
                          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                            <div className="text-gray-400 mb-2">// Request</div>
                            <div className="text-green-300">{endpoint.example.request}</div>
                          </div>
                        </div>

                        {/* Response Example */}
                        <div>
                          <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                            <CheckCircle size={16} />
                            Response Example
                          </h4>
                          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                            <div className="text-gray-400 mb-2">// Response</div>
                            <pre className="text-green-300 whitespace-pre-wrap">
                              {JSON.stringify(endpoint.example.response, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-gray-400 text-xs mb-1">Authentication</div>
                          <div className="text-white text-sm">
                            {endpoint.auth ? "Required (Bearer Token)" : "Not Required"}
                          </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-gray-400 text-xs mb-1">Rate Limit</div>
                          <div className="text-white text-sm">100 req/min</div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-gray-400 text-xs mb-1">Status</div>
                          <div className="text-white text-sm capitalize">{endpoint.status}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* API Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">45ms</div>
              <div className="text-gray-400 text-sm">Avg Response</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">1.2M</div>
              <div className="text-gray-400 text-sm">Requests/Day</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-500/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">15</div>
              <div className="text-gray-400 text-sm">Endpoints</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
