import { db, auth } from "./firebase";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"; // Add arrayRemove to the imports

// Create a new user document in Firestore on signup
export const createUserDocument = async (user) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);

  try {
    const userSnapshot = await getDoc(userDocRef);

    // Check if user document already exists, if not, create one
    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        wallets: [],  // Initialize with an empty wallets array
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

// Add wallet address to the user's document in Firestore
export const addWalletAddressToFirestore = async (walletAddress) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is logged in.");
    return;
  }

  const userDocRef = doc(db, "users", user.uid);

  try {
    await updateDoc(userDocRef, {
      wallets: arrayUnion(walletAddress), // Add wallet address to the array
    });
    console.log("Wallet address added to Firestore!");
  } catch (error) {
    console.error("Error adding wallet address:", error);
  }
};

// Fetch wallet addresses from Firestore for the logged-in user
export const getWalletsFromFirestore = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return userDocSnapshot.data().wallets || []; // Return the wallets array or an empty array if it doesn't exist
  } else {
    console.error("User document not found.");
    return []; // Return an empty array if the document doesn't exist
  }
};

// Remove wallet address from the user's document in Firestore
export const removeWalletAddressFromFirestore = async (walletAddress) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is logged in.");
    return;
  }

  const userDocRef = doc(db, "users", user.uid);

  try {
    await updateDoc(userDocRef, {
      wallets: arrayRemove(walletAddress), // Remove wallet address from the array
    });
    console.log("Wallet address removed from Firestore!");
  } catch (error) {
    console.error("Error removing wallet address:", error);
  }
};
