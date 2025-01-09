import React, { useEffect, useState } from 'react'
import HospitalCard from '../components/HospitalCard'
import Web3 from 'web3';
const contractAdd="0xdfa986440dfa2357bA1a63eb8F088f2C1b72a766";
import ABI from "./ABI.json";
const web3=new Web3(window.ethereum )

const contract=new web3.eth.Contract(ABI,contractAdd)
console.log(contract);

const ViewHospital = () => {
  console.log("View");
  
  
  const [hospitals, sethospitals] = useState([])
  const loadHospitals=async()=>{
    try {
        
    
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress=accounts[0];
    console.log("My user Address is:::"+userAddress);
    const notes=await contract.methods.viewhospitals().call()
    console.log("my Notes are:::",notes);
    notes.splice(0,1);
    sethospitals(notes);
    console.log("My Hospitals are::::::::::",hospitals);
} catch (error) {
        console.log(error); 
}
}


  useEffect(() => {
    console.log("use effect Running");
    
  loadHospitals();
  }, [])


  return (
    <div>
      <center className='text-[50px] mt-5 font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
      Registered hospitals
      </center>
      <div className="grid-cards grid grid-cols-3 gap-x-2">
        {hospitals.map(({id,image,name})=>{
          return  <HospitalCard key={id} props={{id,image,name}}></HospitalCard>
        })}
 
      </div>
      </div>
  )
}

export default ViewHospital