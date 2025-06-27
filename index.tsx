import React, { useState, useEffect } from "react";

export default function Home() {
  const [mining, setMining] = useState(false);
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem("moon_coins");
    return savedCoins ? parseInt(savedCoins) : 0;
  });

  useEffect(() => {
    localStorage.setItem("moon_coins", coins.toString());
  }, [coins]);

  useEffect(() => {
    let interval;
    if (mining) {
      interval = setInterval(() => {
        setCoins((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [mining]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center mb-4">🌕 MoonMiner</h1>
      <p className="text-lg text-center max-w-xl mb-8">
        Start mining $MOON coins with just your browser. No special hardware, no complex setup. Just sign in, start mining, and earn rewards.
      </p>

      <div className="bg-white bg-opacity-10 rounded-2xl p-6 w-full max-w-md shadow-xl backdrop-blur-md text-center">
        <h2 className="text-2xl font-semibold mb-4">🚀 Mining Simulator</h2>
        <p className="text-lg mb-2">Your Balance: <span className="text-yellow-400 font-bold">{coins} $MOON</span></p>

        <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-yellow-400 h-4 transition-all duration-1000"
            style={{ width: `${(coins % 100)}%` }}
          ></div>
        </div>

        <button
          onClick={() => setMining(!mining)}
          className={\`mt-4 py-2 px-6 rounded-xl font-bold transition-all duration-300 \${mining ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}\`}
        >
          {mining ? "⛔ Stop Mining" : "💎 Start Mining"}
        </button>
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        Powered by Solana | © {new Date().getFullYear()} MoonMiner
      </div>
    </div>
  );
}
