import React, { useEffect, useState } from 'react';
import { auth } from "../firebase";
import { getTransactionHistory } from '../utils/algorand.ts';
import { hideTransaction, unhideTransaction, getHiddenTransactions } from '../firebaseUtils';
import './TransactionHistory.css';
import { FaSort, FaEllipsisV } from 'react-icons/fa';

interface TransactionHistoryProps {
  address: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ address }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [hiddenTransactions, setHiddenTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<'mainnet' | 'testnet'>('testnet');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showHidden, setShowHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});

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

  useEffect(() => {
    const loadHiddenTransactions = async () => {
      const user = auth.currentUser;
      if (user) {
        const hidden = await getHiddenTransactions(user.uid);
        setHiddenTransactions(hidden);
      }
    };
    loadHiddenTransactions();
  }, []);

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'newest' ? 'oldest' : 'newest'));
  };

  const handleHideTransaction = async (transactionId: string) => {
    await hideTransaction(transactionId);
    setHiddenTransactions([...hiddenTransactions, transactionId]);
  };

  const handleUnhideTransaction = async (transactionId: string) => {
    await unhideTransaction(transactionId);
    setHiddenTransactions(hiddenTransactions.filter((id) => id !== transactionId));
  };

  const toggleMenu = (transactionId: string) => {
    setMenuOpen((prev) => ({ ...prev, [transactionId]: !prev[transactionId] }));
  };

  const displayedTransactions = showHidden
    ? transactions.filter((tx) => hiddenTransactions.includes(tx.id))
    : transactions.filter((tx) => !hiddenTransactions.includes(tx.id));

  const sortedTransactions = displayedTransactions.sort((a, b) =>
    sortOrder === 'newest' ? b.roundTime - a.roundTime : a.roundTime - b.roundTime
  );

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

      {/* Sort and Show Hidden Toggle */}
      <div className="sort-icon" onClick={handleSortToggle}>
        <FaSort size={24} />
        <span className="sort-text">{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
      </div>
      <button onClick={() => setShowHidden(!showHidden)}>
        {showHidden ? 'Show All Transactions' : 'Show Hidden Transactions'}
      </button>

      {/* Transaction List */}
      <ul className="transaction-list">
        {sortedTransactions.map((tx) => {
          const isPayment = tx.paymentTransaction && tx.paymentTransaction.amount !== undefined;
          const amount = isPayment
            ? (Number(tx.paymentTransaction.amount) / 1e6).toFixed(6)
            : 'N/A';
          const fee = tx.fee ? (Number(tx.fee) / 1e6).toFixed(6) : '0';

          return (
            <li key={tx.id} className="transaction-item">
              <div className="tx-id">Transaction ID: {tx.id}</div>
              <div className="tx-details">Sender: {tx.sender}</div>
              <div className="tx-details">Amount: {isPayment ? `${amount} ALGO` : 'N/A'}</div>
              <div className="tx-details">Fee: {fee} ALGO</div>
              <div className="tx-date">Date: {new Date(tx.roundTime * 1000).toLocaleString()}</div>

              {/* Three-dots menu button */}
              <div className="menu-container">
                <FaEllipsisV size={20} onClick={() => toggleMenu(tx.id)} />
                {menuOpen[tx.id] && (
                  <div className="menu-options">
                    {showHidden ? (
                      <button onClick={() => handleUnhideTransaction(tx.id)}>Unhide</button>
                    ) : (
                      !hiddenTransactions.includes(tx.id) && (
                        <button onClick={() => handleHideTransaction(tx.id)}>Hide</button>
                      )
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionHistory;
