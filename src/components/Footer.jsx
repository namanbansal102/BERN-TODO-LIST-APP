import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import React, { useEffect }  from "react";
import Aos from "aos";
import 'aos/dist/aos.css'

// Custom Input Component
function CustomInput({ type = "text", placeholder, className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all ${className}`}
      {...props}
    />
  )
}

// Custom Textarea Component
function CustomTextarea({ placeholder, className = "", ...props }) {
  return (
    <textarea
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none ${className}`}
      {...props}
    />
  )
}

// Custom Button Component
function CustomButton({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-lg text-white font-medium transition-all hover:opacity-90 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function Footer() {
  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
    },
  ]

  const footerLinks = {
    "Products & Services": [
      {
        name: "MainNet",
        href: "#",
      },
      {
        name: "TestNet",
        href: "#",
      },
      {
        name: "Governance",
        href: "#",
      },
    ],
    "Developers": [
      {
        name: "Documentation",
        href: "#",
      },
      {
        name: "Github",
        href: "#",
      },
      {
        name: "SDK",
        href: "#",
      },
    ],
    "Company": [
      {
        name: "About Us",
        href: "/about",
      },
      {
        name: "Careers",
        href: "#",
      },
    ],
  }

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <footer 

      data-aos="fade-up" 
      className="w-full bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Social Section */}
          <div className="space-y-6">
            <div
              className="h-12 px-14 text-2xl pt-2 font-bold rounded-lg text-white"
              style={{
                background: "linear-gradient(135deg, #00ffcc 0%, #4d7fff 100%)",
              }}
            >
              NeoxLifeChain
            </div>
            <p className="text-gray-300 max-w-xs">
              Building the future of blockchain technology with Neo X ecosystem.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 transition-colors hover:border-blue-400"
                >
                  <social.icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-gray-800 pt-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-300">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>contact@neox.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>123 Blockchain Street, Crypto City, CC 12345</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-lg font-semibold text-gray-300">Send us a message</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CustomInput placeholder="Name" required />
              <CustomInput type="email" placeholder="Email" required />
            </div>
            <CustomInput placeholder="Subject" required />
            <CustomTextarea placeholder="Your message" className="min-h-[120px]" required />
            <CustomButton
              style={{
                background: "linear-gradient(135deg, #00ffcc 0%, #4d7fff 100%)",
              }}
            >
              Send Message
            </CustomButton>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Neo X. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-blue-400">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-blue-400">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-blue-400">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

