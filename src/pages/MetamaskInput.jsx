import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function MetamaskInput({ value, onChange, onSubmit, isLoading }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-grow">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter Metamask Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div 
          className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            alt="Metamask logo"
            className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
          />
        </div>
      </div>
      <button
        onClick={onSubmit}

        style={{
          background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
        }}
        disabled={isLoading}
        className="rounded-md  px-4 py-3 text-base font-medium text-white transition-colors  hover:[text-shadow:0_0_10px_#fff]"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'Fetch Records'
        )}
      </button>
    </div>
  )
}

