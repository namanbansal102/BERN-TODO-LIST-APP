import React from 'react'
import Web3 from 'web3';

const Navbar = () => {
  async function connectWallet() {
    if (typeof window.ethereum !=  "undefined") {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected account:", accounts[0]);

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
    <div className='border-2 border-black'>Navbar</div>
    <button onClick={connectWallet}  className='bg-black text-white p-2 m-3'>Load</button>
    </>
  )
}

export default Navbar