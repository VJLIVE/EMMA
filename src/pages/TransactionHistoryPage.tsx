// src/pages/TransactionHistoryPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionHistory from './TransactionHistory.tsx';

const TransactionHistoryPage: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress?: string }>(); // Make walletAddress optional

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Transaction History for {walletAddress || 'Unknown Wallet'}</h2>
      <TransactionHistory address={walletAddress || ''} /> {/* Use fallback value */}
    </div>
  );
};

export default TransactionHistoryPage;
