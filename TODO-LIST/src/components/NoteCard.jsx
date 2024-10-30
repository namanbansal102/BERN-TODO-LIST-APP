import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ABI from "./ABI.json";
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
const web3=new Web3(window.ethereum )
const contractAdd="0x35d67C245b38A28c631aB50F56f7D994dC75bC12";
const todoContract=new web3.eth.Contract(ABI,contractAdd)


const NoteCard = ({props}) => {
  const [loading, setLoading] = useState(false)
  const handleDelete=async ()=>{
    console.log("handle Change is Running");
    try{
  setLoading(true)
  
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress=accounts[0];
      console.log("My user Address is:::"+userAddress);
      const res=await todoContract.methods.deleteNote(props.noteId).send({
        from:userAddress,
        gasPrice:await web3.eth.getGasPrice()
  
      })
      console.log("My  Note is::::::",res);
      
      toast.success("Note Deleted Succesfully")
      setLoading(false)
      window.location.reload();
        
    }
    catch(e){
      console.log(e);
      setLoading(false)
  
      toast.error("Unable To Delete Note")
    }
  }
  const handleChange=async ()=>{
  console.log("handle Change is Running");
  try{
setLoading(true)
let value=prompt("Enter Changed Note")
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress=accounts[0];
    console.log("My user Address is:::"+userAddress);
    const res=await todoContract.methods.updateNote(props.noteId,value,getTodaysDate()).send({
      from:userAddress,
      gasPrice:await web3.eth.getGasPrice()

    })
    console.log("My  Note is::::::",res);
    
    toast.success("Note Changed Succesfully")
    setLoading(false)
    window.location.reload();

    
  }
  catch(e){
    console.log(e);
    setLoading(false)

    toast.error("Unable To Change Note")
  }
}
  return (
    <div className='bg-yellow-400 w-96 p-7 rounded-2xl shadow-md cursor-pointer duration-700 hover:scale-105 shadow-yellow-400 flex flex-col justify-between'>
      {loading && <>
      <h1 className='text-3xl font-bold animate-bounce'>Loading...</h1>
      </>}
      {
      !loading &&
      <>
      {props.noteId}
       {props.desc}
        <div className="button-divs flex gap-3 items-center ">

        <button onClick={handleChange} className='bg-black p-2 rounded-xl text-green-600 font-bold border-2 border-green-400'>Change</button>
        <button onClick={handleDelete} className='bg-black p-2 rounded-xl text-red-600 font-bold border-2 border-red-400'>Delete</button>
        <h2>{props.date}</h2>
      
        </div>
      </>
        }
    </div>
  )
}

export default NoteCard
function getTodaysDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
  const year = today.getFullYear();
  
  return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
}