import React from 'react'
import Web3 from 'web3';
const contractAdd="0x35d67C245b38A28c631aB50F56f7D994dC75bC12";
import ABI from "./ABI.json";
const web3=new Web3(window.ethereum )

const todoContract=new web3.eth.Contract(ABI,contractAdd)
console.log(todoContract);

const loadNotes=async()=>{
    try {
        
    
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress=accounts[0];
    console.log("My user Address is:::"+userAddress);
    
    const notes=await todoContract.methods.viewNotes().call({from:userAddress})
    console.log("My Notes arwe::::::::::",notes);
} catch (error) {
        console.log(error);
        
}
}

const ViewNotes = () => {
  return (
    <>
    <div>ViewNotes</div>
    <button onClick={loadNotes}>Click</button>
    </>
  )
}

export default ViewNotes