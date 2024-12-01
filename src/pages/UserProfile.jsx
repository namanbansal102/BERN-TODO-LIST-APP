'use client'

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { MetamaskInput } from './MetamaskInput'
import { ProfileItem } from './ProfileItem'
import { MedicalRecordCard } from './MedicalRecordCard'
import { RecordModal } from './RecordModal'
import ABI from "./ABI.json"

const contractAdd = "0xdfa986440dfa2357bA1a63eb8F088f2C1b72a766"

export default function UserProfile() {
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [metamaskAddress, setMetamaskAddress] = useState('')
  const [patientData, setPatientData] = useState(null)
  const [medicalRecords, setMedicalRecords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPatientData = async () => {
    setIsLoading(true)
    setError(null)
  
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask to use this feature')
      }
  
      const web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const userAddress = accounts[0]
      const contract = new web3.eth.Contract(ABI, contractAdd)
  
      // Call the contract function
      const result = await contract.methods.fetchUserProfile(metamaskAddress).call({ from: userAddress })
      console.log('Contract result:', result)
  
      // Assuming `result` is an array of records
      const records = result.map((record) => ({
        id: record.id,
        checkupDate: new Date(parseInt(record.checkupTimestamp) * 1000).toLocaleDateString(),
        name: record.name,
        phone: record.phone,
        imageUrl: record.imageUrl || '/placeholder.svg?height=128&width=128',
      }))
  
      // Assuming the first record is patient data
      if (records.length > 0) {
        const patient = records[0]
        setPatientData({
          name: patient.name,
          checkupDate: patient.checkupDate,
          phone: patient.phone,
          imageUrl: patient.imageUrl,
        })
      }
  
      setMedicalRecords(records.slice(1)) // Other records as medical records
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="container mx-auto py-10 px-4">
      <MetamaskInput
        value={metamaskAddress}
        onChange={setMetamaskAddress}
        onSubmit={fetchPatientData}
        isLoading={isLoading}
      />

      {error && (
        <div className="mt-4 text-red-600 text-center">
          {error}
        </div>
      )}

      {patientData && (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Patient Profile Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img
                    src={patientData.imageUrl}
                    alt={patientData.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{patientData.name}</h2>
              </div>
              <div className="space-y-3">
                <ProfileItem label="Checkup Date" value={patientData.checkupDate} />
                <ProfileItem label="Phone" value={patientData.phone} />
              </div>
            </div>
          </div>

          {/* Medical Records Section */}
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Medical Records</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalRecords.map((record) => (
                <MedicalRecordCard
                  key={record.id}
                  record={record}
                  onClick={() => setSelectedRecord(record)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying selected record */}
      {selectedRecord && (
        <RecordModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  )
}

