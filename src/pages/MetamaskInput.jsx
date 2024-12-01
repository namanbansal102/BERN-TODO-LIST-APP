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
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
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

