'use client'

import { useState, useRef } from 'react'
import { Upload, Calendar, DollarSign, Clock } from 'lucide-react'

export default function AddAuction() {
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    minBid: '',
    endDate: '',
    description: ''
  })
  const [errors, setErrors] = useState({})

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!imagePreview) newErrors.image = 'Product image is required'
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.minBid.trim()) newErrors.minBid = 'Minimum bid is required'
    if (isNaN(Number(formData.minBid))) newErrors.minBid = 'Minimum bid must be a number'
    if (!formData.endDate.trim()) newErrors.endDate = 'End date is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', { ...formData, image: imagePreview })
      // Reset form after submission
      setFormData({ name: '', minBid: '', endDate: '', description: '' })
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          Add New Auction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-lg rounded-xl p-8">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-emerald-500 transition-colors"
                 onClick={() => fileInputRef.current?.click()}>
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Product preview" className="mx-auto h-64 w-64 object-cover rounded-lg" />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                    <span>{imagePreview ? 'Change image' : 'Upload an image'}</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Minimum Bid */}
          <div>
            <label htmlFor="minBid" className="block text-sm font-medium text-gray-700">
              Minimum Bid (ETH)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="minBid"
                id="minBid"
                value={formData.minBid}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">ETH</span>
              </div>
            </div>
            {errors.minBid && <p className="mt-2 text-sm text-red-600">{errors.minBid}</p>}
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Auction End Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="datetime-local"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <Clock className="h-5 w-5 mr-2" />
              Start Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}