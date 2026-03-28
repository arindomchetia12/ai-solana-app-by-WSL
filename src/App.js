//Create a file src/solana.js (or put in App.js for simplicity):

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useState, useEffect } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
// Connect to devnet
export const connection = new Connection("https://api.devnet.solana.com");

// Example wallet public key (replace with your own)
//export const walletPublicKey = new PublicKey("YOUR_WALLET_PUBLIC_KEY");

// // Function to get balance
// export const getBalance = async () => {
//   const balance = await connection.getBalance(walletPublicKey);
//   return balance / LAMPORTS_PER_SOL;
// };



// Connect to Solana devnet
const connection = new Connection("https://api.devnet.solana.com");
// Replace with your wallet public key
const walletPublicKey = new PublicKey("HA811X7jqqc4ksbzkwj8rPYB58MYf1XJFhHBKW7kvNzs");

// Function to get balance
const getBalance = async () => {
  const balance = await connection.getBalance(walletPublicKey);
  return balance / LAMPORTS_PER_SOL;
};

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  // Load wallet balance on page load
  useEffect(() => {
    const fetchBalance = async () => {
      const bal = await getBalance();
      setBalance(bal);
    };
    fetchBalance();
  }, []);

  const askAI = async () => {
    if (!question) return;
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: question }],
        }),
      });

      const data = await res.json();
      setAnswer(data.choices[0].message.content);
    } catch (err) {
      setAnswer("Error fetching AI response");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Arial" }}>
      <h1>AI + Solana Demo</h1>
      <p><strong>Wallet Balance:</strong> {balance} SOL</p>

      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />
      <button
        onClick={askAI}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        {loading ? "Loading..." : "Ask AI"}
      </button>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <strong>Answer:</strong>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default App;