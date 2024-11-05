import React, { useEffect, useState } from 'react';
import { getTransactionHistory } from '../utils/algorand.ts';
import './TransactionHistory.css';  // Import the styles

interface TransactionHistoryProps {
  address: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ address }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<'mainnet' | 'testnet'>('testnet');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const txs = await getTransactionHistory(address, network);
        setTransactions(txs);
      } catch (err) {
        setError('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, [address, network]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="transaction-container">
      <h2 className="transaction-header">Transaction History</h2>

      {/* Network Toggle */}
      <div className="network-toggle">
        <label className="network-label">
          <input
            type="radio"
            value="testnet"
            checked={network === 'testnet'}
            onChange={() => setNetwork('testnet')}
            className="network-input"
          />
          <span className="network-text">Testnet</span>
        </label>
        <label className="network-label">
          <input
            type="radio"
            value="mainnet"
            checked={network === 'mainnet'}
            onChange={() => setNetwork('mainnet')}
            className="network-input"
          />
          <span className="network-text">Mainnet</span>
        </label>
      </div>

      {/* Transaction List */}
      <ul className="transaction-list">
        {transactions.map((tx) => {
          const isPayment = tx.paymentTransaction && tx.paymentTransaction.amount !== undefined;
          const amount = isPayment
            ? (Number(tx.paymentTransaction.amount / BigInt(1000000))).toFixed(6)
            : 'N/A';
          const fee = tx.fee ? (Number(tx.fee) / 1e6).toFixed(6) : '0';

          return (
            <li key={tx.id} className="transaction-item">
              <div className="tx-id">Transaction ID: {tx.id}</div>
              <div className="tx-details">Sender: {tx.sender}</div>
              <div className="tx-details">Amount: {isPayment ? `${amount} ALGO` : 'N/A'}</div>
              <div className="tx-details">Fee: {fee} ALGO</div>
              <div className="tx-date">Date: {new Date(tx.roundTime * 1000).toLocaleString()}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionHistory;
