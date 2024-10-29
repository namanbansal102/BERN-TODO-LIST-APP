import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
const web3=new Web3(window.ethereum )

const Register = () => {
    const [account, setAccount] = useState("")
    const [balance, setBalance] = useState("")
    const [status, setStatus] = useState("")
    useEffect(() => {
        checkConnection();
      }, []);
    
      async function checkConnection() {
        if (typeof window.ethereum !== "undefined") {
          try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
              setAccount(accounts[0]);
                let balance=await web3.eth.getBalance(accounts[0])
                balance = web3.utils.fromWei(balance, 'ether'); // Convert from Wei to Ether
console.log("Balance is:", balance);
                
                setBalance(balance)
              setStatus("Disconnect");
            }
          } catch (error) {
            console.error("Error checking connection:", error);
          }
        }
      }
    
  return (
    <div className='flex flex-col justify-center items-center gap-7 text-yellow-400 text-2xl'>
        <center className='text-3xl text-yellow-400 font-bold'>
            Register
        </center>
        <div>

        <div>
            <h1 className='font-bold'>Your Account Address</h1>
            <h2 className='text-xl'>{account}</h2>
        </div>
        <br />
        <div>
            <h1 className='font-bold'>Your Account Balance</h1>
            <h2 className='text-xl'>{balance}</h2>
        </div>
        <br />
        <div className='flex flex-col'>
            <label className='text-yellow-400' htmlFor="">Enter Your Name</label>
            <input placeholder='Enter Your Name' className='h-12 px-2 bg-black border-2 border-yellow-400 w-80 text-yellow-400' type="text" />
        </div>
        </div>
    </div>
  )
}

export default Register