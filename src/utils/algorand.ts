// src/utils/algorand.ts
import { Algodv2, Indexer } from 'algosdk'; // Import Indexer
import { PeraWalletConnect } from '@perawallet/connect';

export const peraWallet = new PeraWalletConnect();

// Set up Algod and Indexer clients
export const algodClients = {
  testnet: new Algodv2('', 'https://testnet-api.algonode.cloud', ''),
  mainnet: new Algodv2('', 'https://mainnet-api.algonode.cloud', ''),
};

export const indexerClients = {
  testnet: new Indexer('', 'https://testnet-idx.algonode.cloud', ''),
  mainnet: new Indexer('', 'https://mainnet-idx.algonode.cloud', ''),
};

// Function to fetch balance
export const fetchBalance = async (address: string, network: 'testnet' | 'mainnet') => {
  const client = algodClients[network];
  try {
    const accountInfo = await client.accountInformation(address).do();
    const balanceInMicroAlgos = BigInt(accountInfo.amount);
    const balanceInAlgos = Number(balanceInMicroAlgos / BigInt(1e6)); // Convert to Algos
    return balanceInAlgos;
  } catch (error) {
    console.error(`Failed to fetch balance for ${network}:`, error);
    throw error;
  }
};

// Function to fetch transaction history
export const getTransactionHistory = async (address: string, network: 'testnet' | 'mainnet') => {
  const indexer = indexerClients[network];
  try {
    const response = await indexer.lookupAccountTransactions(address).do(); // Use the Indexer to fetch transactions
    return response.transactions; // Return the transactions
  } catch (error) {
    console.error('Failed to fetch transaction history:', error);
    throw error; // Re-throw the error for further handling
  }
};

