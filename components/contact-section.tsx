"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Terminal, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> Contact terminal initialized...",
    "> Ready to receive message...",
  ])

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate terminal output
    const newOutput = [
      ...terminalOutput,
      `> Processing message from ${formData.name}...`,
      `> Email: ${formData.email}`,
      `> Message length: ${formData.message.length} characters`,
      "> Validating data...",
      "> ✓ All fields validated",
      "> Sending message...",
      "> ✓ Message sent successfully!",
      "> Thank you for your message. I will get back to you soon.",
      "> Connection established. Access granted.",
    ]

    setTerminalOutput(newOutput)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitted(false)
      setTerminalOutput(["> Contact terminal initialized...", "> Ready to receive message..."])
    }, 5000)
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/80 to-black/0 z-0"></div>

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
            Contact
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
            Let's connect and build something amazing together
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Terminal Output */}
          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-green-500/30 p-4"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4 border-b border-green-500/20 pb-2">
              <Terminal className="text-green-400 mr-2" size={18} />
              <span className="text-gray-400 text-sm">contact.terminal</span>
            </div>

            <div className="font-mono text-sm h-64 overflow-y-auto">
              {terminalOutput.map((line, index) => (
                <motion.div
                  key={index}
                  className="mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span
                    className={`
                    ${line.includes("✓") ? "text-green-400" : ""}
                    ${line.includes(">") ? "text-green-300" : "text-gray-400"}
                    ${line.includes("Error") ? "text-red-400" : ""}
                  `}
                  >
                    {line}
                  </span>
                  {index === terminalOutput.length - 1 && <span className="animate-pulse">_</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-green-500/30 p-6"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="text-green-400">$</span> name --required
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors font-mono"
                  placeholder="Enter your name"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="text-green-400">$</span> email --required
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors font-mono"
                  placeholder="your.email@domain.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="text-green-400">$</span> message --required
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors font-mono resize-none"
                  placeholder="Type your message here..."
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitted}
                className={`w-full px-6 py-3 rounded-md font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitted
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-400 text-black hover:shadow-lg hover:shadow-green-500/20"
                }`}
                whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                whileTap={!isSubmitted ? { scale: 0.98 } : {}}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
