'use client'

import { useState } from 'react'
import Web3 from 'web3';
import { PinataSDK } from "pinata";
const contractAdd = "0xdfa986440dfa2357bA1a63eb8F088f2C1b72a766";
import ABI from "./ABI.json";
import axios from 'axios';
const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGIyM2U0MS1kZTg3LTRhYWYtOTVmNC1mNDBmZWQ2NjJlNzQiLCJlbWFpbCI6Im5hbWFuYmFuc2FsMTAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1OGQ1ODM1NWMwYTE2ZTc4MmEwOSIsInNjb3BlZEtleVNlY3JldCI6ImIxMjVkNGNkZGYyZmUzMTc4MWY0OTcyOGRiOTBlMzFmMjNkNTNmM2YzYTI3M2NiZTViZjY0Mjc1YjljYjFiYjIiLCJleHAiOjE3NjQ3NDEzNTR9.6dTuYSdS2GBexhtowWUM8r5h7UM4VoqoHdWEBPAe27o",
  pinataGateway: "example-gateway.mypinata.cloud",
});
export default function PatientRegistration() {
  const [patientImageUrl, setPatientImageUrl] = useState(null)
  const [documentUrl, setDocumentUrl] = useState(null)
  const [patientName, setPatientName] = useState('')
  const [metamaskAddress, setMetamaskAddress] = useState('')
  const [address, setAddress] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [checkupDate, setCheckupDate] = useState('')
  const [documentValidity, setDocumentValidity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imageArrayBuffer, setImageArrayBuffer] = useState(null);
  const [fileArrayBuffer, setFileArrayBuffer] = useState(null);
  const [fileCID, setFileCID] = useState("");
  const [imageCID, setImageCID] = useState("")
  const handleImageUpload = async (event, setter) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setter(url)
      
      // Convert image to byte string
      const arrayBuffer = await file.arrayBuffer();
      setImageArrayBuffer(file);
      const byteArray = new Uint8Array(arrayBuffer);
      const byteString = Array.from(byteArray, (byte) => String.fromCharCode(byte)).join('');
      // You can store this byteString in state if needed
      console.log("Image byte string:", byteString);
    }
  }
  
  const handleDocumentUpload = async (event) => {
    const file = event.target.files?.[0];
    const fileName=event.target.files?.[0].name;
    if (file) {
      const url = URL.createObjectURL(file)
      // Convert document to byte string
      const arrayBuffer = await file.arrayBuffer();
      setFileArrayBuffer(file)
      const byteArray = new Uint8Array(arrayBuffer);
      const byteString = Array.from(byteArray, (byte) => String.fromCharCode(byte)).join('');
      
      // You can store this byteString in state if needed
      console.log("Document byte string:", byteString);
    }
  }
  const handleIPFSUpload=async()=>{
    try {
      
      const uploadFile = await pinata.upload.file(fileArrayBuffer);
      const uploadImage = await pinata.upload.file(imageArrayBuffer);
      setFileCID(uploadFile.cid);
      setImageCID(uploadImage.cid);
      console.log("Hoorahy I am getting Upload as::::::",uploadFile);
      return true;
    } 
    catch (error) {
      console.log("Getting Error::::",error);
      return false;
    }

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const isUploaded=await handleIPFSUpload();
    if(!isUploaded)return;
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask to use this feature');
      }
  
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      const contract = new web3.eth.Contract(ABI, contractAdd);
      const accounts = await web3.eth.getAccounts();
  
      if (!web3.utils.isAddress(metamaskAddress)) {
        throw new Error("Invalid Ethereum address.");
      }
  
      // Convert dates to Unix timestamps and then to strings
      const checkupTimestamp = Math.floor(new Date(checkupDate).getTime() / 1000).toString();
      const validityTimestamp = Math.floor(new Date(documentValidity).getTime() / 1000).toString();
  
      const result = await contract.methods.addUserData(
        metamaskAddress,
        `${checkupTimestamp}_${patientName}_${contactPhone}`,
        validityTimestamp,
        fileCID,
        imageCID
      ).send({
        from: accounts[0],
        gasPrice: await web3.eth.getGasPrice(),
      });
  
      console.log("Transaction successful:", result);
  
      // Reset form after successful submission
      setPatientName('');
      setMetamaskAddress('');
      setAddress('');
      setContactPhone('');
      setContactEmail('');
      setCheckupDate('');
      setDocumentValidity('');
      setPatientImageUrl(null);
      setDocumentUrl(null);
  
      alert('Patient registered successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto py-10 px-4">
      <button onClick={handleIPFSUpload}>Click Me</button>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Add New Patient
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
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
                    value={metamaskAddress}
                    onChange={(e) => setMetamaskAddress(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                  onChange={handleDocumentUpload}
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
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
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
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
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
                  value={checkupDate}
                  onChange={(e) => setCheckupDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="documentValidity" className="block text-lg font-semibold text-gray-700">Document Validity</label>
                <input
                  id="documentValidity"
                  type="date"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                  value={documentValidity}
                  onChange={(e) => setDocumentValidity(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Patient'}
            </button>

            {error && (
              <div className="mt-4 text-red-600 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
