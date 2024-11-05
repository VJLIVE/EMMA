// src/components/WalletConnectButton.tsx

import React from 'react';
import { auth, db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { peraWallet } from '../utils/algorand.ts';
import './WalletConnectButton.css';

interface WalletConnectButtonProps {
  onConnect: (address: string) => void;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ onConnect }) => {
  const handleConnect = async () => {
    try {
      const accounts = await peraWallet.connect();
      const address = accounts[0];
      onConnect(address);

      // Save wallet address in Firestore
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          wallets: arrayUnion(address),
        });
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return (
    <div className="button-container">
      <button className="wallet-connect-button" onClick={handleConnect}>
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletConnectButton;
