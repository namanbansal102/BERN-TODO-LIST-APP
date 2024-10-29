import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

const CustomButton = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`bg-black border-yellow-400 border-2 rounded-xl text-white p-2 m-3 ${className}`}
  >
    {children}
  </button>
);

const Navbar = () => {
  const [status, setStatus] = useState("Connect");
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setStatus("Disconnect");
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected account:", accounts[0]);
        setAccount(accounts[0]);
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(accounts[0]);
        console.log("Balance is:::", web3.utils.fromWei(balance, "ether"), "ETH");
        setStatus("Disconnect");
        navigate("/register");
      } catch (error) {
        console.error("User denied account access or an error occurred:", error);
      }
    } else {
      console.error("MetaMask is not installed. Please install MetaMask to use this feature.");
    }
  }

  function disconnectWallet() {
    setAccount(null);
    setStatus("Connect");
  }

  function handleWalletAction() {
    if (status === "Connect") {
      connectWallet();
    } else {
      disconnectWallet();
    }
  }

  return (
    <div style={{
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'black',
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <ul style={{
        display: 'flex',
        color: '#fbbf24',
        gap: '56px',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        listStyleType: 'none',
        padding: 0
      }}>
        <li style={{ cursor: 'pointer' }}>Home</li>
        <li style={{ cursor: 'pointer' }}>View Notes</li>
        <li style={{ cursor: 'pointer' }}>Add Notes</li>
        <li style={{ cursor: 'pointer' }}>About</li>
        <li style={{ cursor: 'pointer' }}>Contact</li>
      </ul>
      <CustomButton onClick={handleWalletAction}>
        {status}
      </CustomButton>
    </div>
  );
};

export default Navbar;  