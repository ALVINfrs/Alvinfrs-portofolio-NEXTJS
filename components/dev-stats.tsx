"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Coffee, GitBranch, Clock, Zap, Database } from "lucide-react"

export default function DevStats() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [counters, setCounters] = useState({
    linesOfCode: 0,
    coffeeConsumed: 0,
    commits: 0,
    hoursOfCoding: 0,
  })

  const stats = [
    {
      icon: Code,
      label: "Lines of Code",
      value: 50000,
      suffix: "+",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Coffee,
      label: "Coffee Consumed",
      value: 1337,
      suffix: " cups",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
    },
    {
      icon: GitBranch,
      label: "Git Commits",
      value: 2500,
      suffix: "+",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: Clock,
      label: "Hours of Coding",
      value: 8760,
      suffix: "h",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
  ]

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepDuration = duration / steps

      stats.forEach((stat, index) => {
        let currentStep = 0
        const increment = stat.value / steps

        const timer = setInterval(() => {
          currentStep++
          const currentValue = Math.min(Math.floor(increment * currentStep), stat.value)

          setCounters((prev) => ({
            ...prev,
            [Object.keys(prev)[index]]: currentValue,
          }))

          if (currentStep >= steps) {
            clearInterval(timer)
          }
        }, stepDuration)
      })
    }
  }, [isInView])

  return (
    <section className="py-16 relative">
      <motion.div
        ref={containerRef}
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4 inline-block"
            initial={{ y: 30 }}
            animate={isInView ? { y: 0 } : { y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-green-400">&lt;</span>
            <span className="text-white">Developer Stats</span>
            <span className="text-green-400">/&gt;</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            const counterKeys = Object.keys(counters)
            const currentValue = counters[counterKeys[index] as keyof typeof counters]

            return (
              <motion.div
                key={stat.label}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 text-center group hover:border-green-400 transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div
                  className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`${stat.color}`} size={24} />
                </div>

                <div className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono">
                  {currentValue.toLocaleString()}
                  <span className="text-sm">{stat.suffix}</span>
                </div>

                <div className="text-gray-400 text-sm">{stat.label}</div>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className={`h-1 rounded-full ${stat.bgColor.replace("/20", "")}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 text-center">
            <Zap className="text-yellow-400 mx-auto mb-3" size={32} />
            <div className="text-xl font-bold text-white mb-2">React Expert</div>
            <div className="text-gray-400 text-sm">Building modern UIs</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 text-center">
            <Database className="text-blue-400 mx-auto mb-3" size={32} />
            <div className="text-xl font-bold text-white mb-2">Database Pro</div>
            <div className="text-gray-400 text-sm">MongoDB, PostgreSQL, MySQL</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 text-center">
            <GitBranch className="text-green-400 mx-auto mb-3" size={32} />
            <div className="text-xl font-bold text-white mb-2">Git Master</div>
            <div className="text-gray-400 text-sm">Version control expert</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
