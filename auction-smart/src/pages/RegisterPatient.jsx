'use client'

import { useState } from 'react'


export default function PatientRegistration() {
  const [patientImageUrl, setPatientImageUrl] = useState(null)
  const [documentUrl, setDocumentUrl] = useState(null)

  const handleImageUpload = (event, setter) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setter(url)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Add New Patient
          </h1>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="patientImage" className="block text-lg font-semibold text-gray-700">Patient Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-full aspect-square w-48 h-48 mx-auto overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
                  {patientImageUrl ? (
                    <img
                      src={patientImageUrl}
                      alt="Patient preview"
                      width={192}
                      height={192}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="text-sm font-semibold">Upload image</div>
                    </div>
                  )}
                </div>
                <input
                  id="patientImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setPatientImageUrl)}
                />
                <button
                  type="button"
                  className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById('patientImage')?.click()}
                >
                  Select Image
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="patientName" className="block text-lg font-semibold text-gray-700">Patient Name</label>
                  <input
                    id="patientName"
                    type="text"
                    placeholder="Enter patient's full name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="metamaskAddress" className="block text-lg font-semibold text-gray-700">
                    <span className="flex items-center">
                      Metamask Address
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQScGwTnuNWyCwNSowMaN4YAkMv228VxgXE9Q&s"
                        alt="Metamask logo"
                        width={24}
                        height={24}
                        className="ml-2"
                      />
                    </span>
                  </label>
                  <input
                    id="metamaskAddress"
                    type="text"
                    placeholder="Enter Metamask address"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-lg font-semibold text-gray-700">Address</label>
              <textarea
                id="address"
                placeholder="Enter patient's complete address"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="medicalDocuments" className="block text-lg font-semibold text-gray-700">Medical Documents</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all duration-300 hover:bg-gray-50 hover:border-blue-500 hover:scale-105 hover:shadow-lg">
                {documentUrl ? (
                  <div className="flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-500 font-semibold">Document uploaded successfully</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-sm font-semibold">Upload medical documents</div>
                    <div className="text-xs">PDF, DOC up to 10MB</div>
                  </div>
                )}
                <input
                  id="medicalDocuments"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setDocumentUrl)}
                />
                <button
                  type="button"
                  className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById('medicalDocuments')?.click()}
                >
                  Select Documents
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contactPhone" className="block text-lg font-semibold text-gray-700">Contact Phone</label>
                <input
                  id="contactPhone"
                  type="tel"
                  placeholder="Enter contact number"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="block text-lg font-semibold text-gray-700">Contact Email</label>
                <input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="checkupDate" className="block text-lg font-semibold text-gray-700">Checkup Date</label>
                <input
                  id="checkupDate"
                  type="date"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="documentValidity" className="block text-lg font-semibold text-gray-700">Document Validity</label>
                <input
                  id="documentValidity"
                  type="date"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
            >
              Register Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}