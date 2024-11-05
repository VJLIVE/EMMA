# EMMA - Basic Wallet Balance Checker DApp 🚀

## Overview 🌍

The **EMMA** is a decentralized application (DApp) designed to provide users with an intuitive interface for managing their Algorand wallets. This application simplifies wallet interaction by integrating user authentication with two-factor authentication (2FA), allowing users to connect multiple wallets, view balances, and manage their transaction histories with privacy features. 🔐💼

## Features 🌟

### 1. User Authentication 🔑
- **Account Creation:** Users can easily create an account using their email and password. ✍️
- **Two-Factor Authentication (2FA):** After account creation, users set up a PIN to enhance security. This PIN must be entered after each login, adding an extra layer of protection. 🔒

### 2. Wallet Management 💳
- **Connect Multiple Wallets:** Users can connect multiple Algorand wallets to their account. 🌐
- **Store Wallet Addresses:** Wallet addresses are securely stored in Firestore and temporarily in local storage for session management. 🗄️
- **Display Wallet Balances:** Users can view the balance of each connected wallet directly from the application. 💰

### 3. Transaction History 📜
- **View Transactions:** Each wallet has a "View Transactions" button that displays its transaction history. 🔍
- **Hide Transactions:** Users can hide specific transactions for enhanced privacy. Hidden transactions can be easily unhid later. 👻

### 4. Protected Routes 🛡️
- **Secure Navigation:** The application restricts access to certain pages, ensuring users who are not logged in cannot access protected routes. 🚫
- **Login Prevention:** Logged-in users are prevented from accessing the login and signup pages, ensuring a smooth user experience. ✔️

## Advantages 🎯

- **Enhanced Security:** The implementation of 2FA through PIN ensures that user accounts are well-protected against unauthorized access. 🔐
- **Convenient Wallet Management:** Users can manage multiple wallets from a single interface, making it easier to track balances and transactions. 📱
- **Privacy Features:** The ability to hide transactions allows users to maintain privacy over their financial activities. 🕵️‍♂️
- **User-Friendly Interface:** The application provides a simple and intuitive UI, making it accessible for users of all technical levels. 👨‍💻
- **Seamless Experience:** Once a wallet is connected, users can log in using their email and password without needing to reconnect their wallets every time. 🔄

## Technology Stack 🛠️

- **Frontend:** React.js, React Router for navigation, Algorand SDK for wallet interactions. ⚛️
- **Backend:** Firebase for authentication and Firestore database. 🔥

## Getting Started 🚀

### Prerequisites ⚙️

- **Node.js** and **npm** should be installed on your machine. 🌐
- A **Firebase** project should be set up with Firestore and Authentication enabled. 🔑
- The **Algorand SDK** should be installed. 📚

### Installation Steps 📝

1. **Clone the repository:**
   ```bash
    git clone https://github.com/vjlive/emma

2. **Navigate to the project directory:**

   ```bash
   cd emma

3. **Install the dependencies:**

   ```bash
   npm install

4. **Create a .env file in the root directory and add your Firebase configuration:**

   ```bash
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

5. **Start the application:**

   ```bash
   npm start

6. Open your browser and navigate to http://localhost:3000 🌍

## Usage 🧑‍💻

- **Signup:** Create an account using your email and password. Set up your PIN for 2FA during the signup process. ✨
- **Login:** Log in using your email and password. Enter your PIN when prompted. 🔐
- **Connect Wallet:** After logging in, connect your Algorand wallet(s) using the provided interface. 💼
- **View Wallet Balance:** Check the balance of your connected wallets. 💵
- **View Transactions:** Click the "View Transactions" button for each wallet to see its transaction history. 📜
- **Hide Transactions:** Use the hide button to hide transactions you want to keep private, and unhide them later as needed. 🔒

## Contributing 🤝

- Contributions to the project are welcome! If you have suggestions for improvements or want to report issues, please feel free to open an issue or submit a pull request. 🌟


### Instructions for the `README.md`

- Update the Firebase configuration placeholders in the `.env` section with your actual Firebase details.
- Adjust any sections to fit the specific details and additional features of your DApp.

### License 📜
- *This project is licensed under the MIT License.* 🔓

This README provides a detailed overview of your DApp's features, advantages, and installation instructions, making it easy for users and developers to understand and get started with your project.
