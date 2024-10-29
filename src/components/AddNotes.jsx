import React from 'react'
import toast from 'react-hot-toast';

const AddNotes = () => {
  const handleClose=async ()=>{
    console.log("handle Close is Running");
    try{

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress=accounts[0];
      console.log("My user Address is:::"+userAddress);
      toast.success("note added")
    }
    catch(e){
      toast.error("Unable To Add Note")
    }
  }
  return (
    <>
    <div className='flex flex-col items-center justify-center gap-3' >
      <center className='text-4xl font-bold text-yellow-400'>
        Add Notes
      </center>
       
        <div className='flex flex-col gap-1'>
            <label className='text-yellow-400 font-bold' htmlFor="">Enter Note Description</label>
            <textarea placeholder='Enter Note Description' className='h-64 w-[50vw] p-3 bg-black border-2 border-yellow-400 outline-none  text-yellow-400' type="text" />
        </div>
        <button onClick={handleClose} className='p-3 rounded-lg bg-yellow-400 float-right relative duration-700 hover:scale-105 shadow-md shadow-yellow-400 font-bold'>Add Note</button>
    </div>
    </>
  )
}

export default AddNotes