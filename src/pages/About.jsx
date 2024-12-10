'use client'

import { motion } from "framer-motion"
import { Github, Mail, Phone } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Gradient Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rotate-12 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full -rotate-12 bg-gradient-to-t from-transparent via-blue-500/20 to-transparent blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6">About NeoXLifeChain</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a team of passionate developers and healthcare professionals working to revolutionize medical record management through blockchain technology. Our platform emerged from a successful hackathon project and has evolved into a comprehensive healthcare solution.
          </p>
        </motion.div>

        {/* Hackathon Story */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Our Hackathon Journey
            </h2>
            <p className="text-gray-300 leading-relaxed">
              NeoXLifeChain was born at the 2023 Global Healthcare Hackathon, where our team took on the challenge of making medical records more accessible and secure. What started as a 48-hour project has now grown into a full-scale platform that's revolutionizing how healthcare data is managed and shared.
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Team Member 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Team Member 1"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Vidhi</h3>
              <p className="text-emerald-400 text-center mb-4">Frontend Developer</p>
              <div className="flex justify-center gap-4 mb-4">
                <a href="tel:+1234567890" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="mailto:sarah@neoxlife.com" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/sarahchen" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://jade-added-egret-280.mypinata.cloud/files/bafkreia5enzsh6zc22i2t5leewlulli3jnmioxk7p4iccwkxpzkuiyydo4?X-Algorithm=PINATA1&X-Date=1733843540&X-Expires=30&X-Method=GET&X-Signature=812db8fd8a020b452802b754e227af26e6462a0a04ebfe60a41fffeffeccf2e4"
                  alt="Team Member 2"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Naman bansal</h3>
              <p className="text-blue-400 text-center mb-4">Lead Blockchain Developer</p>
              <div className="flex justify-center gap-4 mb-4">
                <a href="tel:+1234567891" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="mailto:alex@neoxlife.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/alexkumar" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a
            href="/register"
            className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 text-black font-semibold hover:opacity-90 transition-opacity"
          >
            Join Our Network
          </a>
        </motion.div>
      </div>
    </div>
  )
}

