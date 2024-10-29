import React from 'react'
import Web3 from 'web3';

const Navbar = () => {
  async function connectWallet() {
    if (typeof window.ethereum !=  "undefined") {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected account:", accounts[0]);
            const web3=new Web3(window.ethereum);
            const balance=await web3.eth.getBalance(accounts[0]);
            console.log("Balance is:::",web3.utils.fromWei(balance,"ether"),"ETH");
            // Initialize a web3 instance with the provider
            
        } catch (error) {
            console.error("User denied account access or an error occurred:", error);
        }
    } else {
        console.error("MetaMask is not installed. Please install MetaMask to use this feature.");
    }
}
  return (
    <>
    <div className='border-2 border-black'>
    Navbar
    <button onClick={connectWallet}  className='bg-black text-white p-2 m-3'>Connect</button>
    </div>
    </>
  )
}

export default Navbar