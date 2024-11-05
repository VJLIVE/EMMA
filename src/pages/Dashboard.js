// src/pages/Dashboard.tsx

import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import WalletConnectButton from "../pages/WalletConnectButton.tsx";
import BalanceDisplay from "../pages/BalanceDisplay.tsx";
import TransactionHistory from "../pages/TransactionHistory.tsx";
import { addWalletAddressToFirestore, getWalletsFromFirestore, removeWalletAddressFromFirestore } from "../firebaseUtils";
import './Dashboard.css';

const Dashboard = () => {
  const [connectedWalletAddress, setConnectedWalletAddress] = useState("");
  const [wallets, setWallets] = useState([]);
  const [showHistory, setShowHistory] = useState({});

  useEffect(() => {
    const fetchWallets = async () => {
      const userWallets = await getWalletsFromFirestore(auth.currentUser.uid);
      setWallets(userWallets);
      if (userWallets.length > 0) {
        setConnectedWalletAddress(userWallets[0]);
      }
    };

    fetchWallets();
  }, []);

  const handleWalletConnect = async (address) => {
    if (!wallets.includes(address)) {
      setConnectedWalletAddress(address);
      await addWalletAddressToFirestore(address);
      localStorage.setItem("walletAddress", address);
      setWallets((prevWallets) => [...prevWallets, address]);
    }
  };

  const handleWalletDisconnect = async (address) => {
    if (address) {
      await removeWalletAddressFromFirestore(address);
      setWallets((prevWallets) => prevWallets.filter(wallet => wallet !== address));
      localStorage.removeItem("walletAddress");
      if (connectedWalletAddress === address) {
        setConnectedWalletAddress("");
      }
      console.log("Wallet disconnected.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Dashboard</h1>
      
      {/* Wallet Connect Button */}
      <div className="wallet-connect-section">
        <WalletConnectButton onConnect={handleWalletConnect} />
      </div>

      {/* Display Balance and Transaction History for all connected wallets */}
      {wallets.map((wallet) => (
        <div className="wallet-card" key={wallet}>
          <BalanceDisplay address={wallet} />
          <div className="button-center-container">
          <button className="disconnect-button" onClick={() => handleWalletDisconnect(wallet)}>Disconnect</button>
          </div>
          {showHistory[wallet] && <TransactionHistory address={wallet} />}
        </div>
      ))}

      {/* Display connected wallets */}
      <div className="connected-wallets">
        <h3>Connected Wallets:</h3>
        <ul className="wallet-list">
          {wallets.map((wallet) => (
            <li className="wallet-item" key={wallet}>{wallet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
