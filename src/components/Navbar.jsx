"use client"

import { useState, useEffect } from 'react'
import Web3 from 'web3'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [account, setAccount] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!')
      return
    }

    try {
      setIsConnecting(true)
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      
      const web3 = new Web3(window.ethereum)
      const balance = await web3.eth.getBalance(accounts[0])
      console.log("Balance is:::", web3.utils.fromWei(balance, "ether"), "ETH")
      setAccount(accounts[0])
    } catch (error) {
      console.error('Error connecting wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <nav className="bg-[#0a0a0a] border-b border-neutral-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  NeoXLifeChain
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <NavLink href="/viewHospital" text="Hospitals" />
                <NavLink href="/add-hospital" text="Register" />
                
                {/* Dropdowns */}
                <NavDropdown 
                  name="Details" 
                  items={[
                    { name: "Apollo Hospital", href: "/userProfile" },
                    { name: "Max Hospital", href: "/userProfile" },
                    { name: "Neo Hospital", href: "/userProfile" },
                  ]}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />

                <NavDropdown 
                  name="Record" 
                  items={[
                    { name: "Add Record", href: "/register-patient" },
                    { name: "Blog", href: "#" },
                    { name: "Team", href: "#" },
                    { name: "Release Notes", href: "#" },
                  ]}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <SocialLink href="#" icon="discord" />
              <ConnectWalletButton 
                connectWallet={connectWallet}
                isConnecting={isConnecting}
                account={account}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#0a0a0a]`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink href="/viewHospital" text="Hospitals" mobile />
          <NavLink href="/add-hospital" text="Register" mobile />
          
          <MobileNavDropdown 
            name="Details" 
            items={[
              { name: "Apollo Hospital", href: "/userProfile" },
              { name: "Max Hospital", href: "/userProfile" },
              { name: "Neo Hospital", href: "/userProfile" },
            ]}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
          />

          <MobileNavDropdown 
            name="Record" 
            items={[
              { name: "Add Record", href: "/register-patient" },
              { name: "Blog", href: "#" },
              { name: "Team", href: "#" },
              { name: "Release Notes", href: "#" },
            ]}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
          />

          <div className="pt-4 border-t border-neutral-800">
            <ConnectWalletButton 
              connectWallet={connectWallet}
              isConnecting={isConnecting}
              account={account}
              mobile
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, text, mobile = false }) {
  const baseClasses = "text-neutral-300 hover:text-emerald-400 transition-colors duration-200"
  const mobileClasses = "block px-3 py-2 rounded-md text-base"
  return (
    <a
      href={href}
      className={mobile ? `${baseClasses} ${mobileClasses}` : baseClasses}
    >
      {text}
    </a>
  )
}

function NavDropdown({ name, items, activeDropdown, setActiveDropdown }) {
  return (
    <div 
      className="relative"
      onMouseEnter={() => setActiveDropdown(name)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        className="flex items-center text-neutral-300 hover:text-emerald-400 transition-colors duration-200"
      >
        {name}
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            activeDropdown === name ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {activeDropdown === name && (
        <div className="absolute left-0 mt-2 w-48 rounded-md bg-[#0a0a0a] shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-emerald-400"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNavDropdown({ name, items, activeDropdown, toggleDropdown }) {
  return (
    <div>
      <button
        onClick={() => toggleDropdown(name)}
        className="flex items-center w-full px-3 py-2 text-base text-neutral-300 hover:text-emerald-400"
      >
        {name}
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            activeDropdown === name ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {activeDropdown === name && (
        <div className="pl-4">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-base text-neutral-300 hover:text-emerald-400"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function SocialLink({ href, icon }) {
  const icons = {
    discord: (
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    ),
  }

  return (
    <a href={href} className="text-neutral-400 hover:text-emerald-400 transition-colors duration-200">
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
      <span className="sr-only">Discord</span>
    </a>
  )
}

function ConnectWalletButton({ connectWallet, isConnecting, account, mobile = false }) {
  const baseClasses = "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200"
  const mobileClasses = "w-full justify-center"
  
  return (
    <button
      onClick={connectWallet}
      className={mobile ? `${baseClasses} ${mobileClasses}` : baseClasses}
      disabled={isConnecting}
    >
      {isConnecting
        ? 'Connecting...'
        : account
        ? `${account.slice(0, 6)}...${account.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  )
}

