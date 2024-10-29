import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ABI from "./ABI.json";
import Web3 from 'web3';
const web3=new Web3(window.ethereum )
const contractAdd="0x35d67C245b38A28c631aB50F56f7D994dC75bC12";
const todoContract=new web3.eth.Contract(ABI,contractAdd)


const AddNotes = () => {

  const [loading, setLoading] = useState(true)
  const [value, setvalue] = useState("")
  
  const handleClose=async ()=>{
    console.log("handle Close is Running");
    try{
setLoading(false)
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress=accounts[0];
      console.log("My user Address is:::"+userAddress);
      const res=await todoContract.methods.addNote(value,getTodaysDate()).send({
        from:userAddress,
        gasPrice:await web3.eth.getGasPrice()

      })
      console.log("My Note is::::::",res);
      
      toast.success("Note Added Succesfully")
      setLoading(true)
    }
    catch(e){
      console.log(e);
      setLoading(true)
      toast.error("Unable To Add Note")
    }
  }
  return (
    <>
    <div className='flex flex-col items-center justify-center gap-3' >
      <center className='text-4xl font-bold text-yellow-400'>
        Add Notes
      </center>
      {!loading &&
        <h2 className='font-bold text-4xl text-yellow-400 mt-7 animate-ping'>Loading.....</h2>
      }
      {loading &&
       <div>

        <div className='flex flex-col gap-1'>
            <label className='text-yellow-400 font-bold' htmlFor="">Enter Note Description</label>
            <textarea value={value} onChange={(e)=>{
              setvalue(e.target.value)
            }} placeholder='Enter Note Description' className='h-64 w-[50vw] p-3 bg-black border-2 border-yellow-400 outline-none  text-yellow-400' type="text" />
        </div>
        <br />
        <button onClick={handleClose} className='p-3 rounded-lg bg-yellow-400 float-right relative duration-700 hover:scale-105 shadow-md shadow-yellow-400 font-bold'>Add Note</button>
    </div>
      }
       </div>
    </>
  )
}

export default AddNotes
function getTodaysDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
  const year = today.getFullYear();
  
  return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
}