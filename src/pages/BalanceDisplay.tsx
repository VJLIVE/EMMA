import React, { useEffect, useState } from 'react';
import { fetchBalance } from '../utils/algorand.ts';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './BalanceDisplay.css';

interface BalanceDisplayProps {
  address: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ address }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const loadBalance = async () => {
      const balanceValue = await fetchBalance(address, network);
      setBalance(balanceValue);
    };
    loadBalance();
  }, [address, network]);

  // Function to handle navigation to the transaction history page
  const handleViewTransactions = () => {
    navigate(`/transactions/${address}`); // Adjust the route based on your routing setup
  };

  return (
    <div className="balance-container">
      <div className="header">
        <h1>Pera Algo Wallet</h1>

        {/* Network Switch */}
        <div className="network-toggle">
          <label>
            <input
              type="radio"
              value="testnet"
              checked={network === 'testnet'}
              onChange={() => setNetwork('testnet')}
            />
            Testnet
          </label>
          <label>
            <input
              type="radio"
              value="mainnet"
              checked={network === 'mainnet'}
              onChange={() => setNetwork('mainnet')}
            />
            Mainnet
          </label>
        </div>
      </div>

      <div className="balance-info">
        <p className="address">
          <strong>Address:</strong> {address}
        </p>
        <div className="balance-value">
          <span className="label">Balance:</span>
          <span className={`balance ${balance !== null ? 'loaded' : 'loading'}`}>
            {balance !== null ? `${balance} ALGO` : 'Loading...'}
          </span>
        </div>
      </div>

      {balance !== null && (
        <div className="footer">
          <p>Last Updated: {new Date().toLocaleTimeString()}</p>
          {/* Button to view transaction history */}
          <button className="view-transactions-button" onClick={handleViewTransactions}>View Transactions</button>
        </div>
      )}
    </div>
  );
};

export default BalanceDisplay;
