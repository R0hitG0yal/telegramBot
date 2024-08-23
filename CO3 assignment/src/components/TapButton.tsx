import React, { useState, useEffect, useCallback } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import "./tapButton.css"; // Create a CSS file for styles
import { debounce } from "lodash"; // Import debounce from lodash
import mainCharacter from "../images/main-character.png";

const GET_USER = gql`
  query GetUser($userId: Int!) {
    getUser(id: $userId) {
      id
      coin_balance
    }
  }
`;

const UPDATE_COIN_BALANCE = gql`
  mutation UpdateCoinBalance($id: Int!, $coin_balance: Int!) {
    updateCoinBalance(id: $id, coin_balance: $coin_balance) {
      id
      coin_balance
    }
  }
`;

const TapButton: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
  });
  const [updateCoinBalance] = useMutation(UPDATE_COIN_BALANCE);

  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState("");

  useEffect(() => {
    if (data && data.getUser) {
      setCoins(data.getUser.coin_balance);
    }
  }, [data]);

  useEffect(() => {
    const levelNames = [
      "Bronze", // From 0 to 4999 coins
      "Silver", // From 5000 coins to 24,999 coins
      "Gold", // From 25,000 coins to 99,999 coins
      "Platinum", // From 100,000 coins to 999,999 coins
      "Diamond", // From 1,000,000 coins to 2,000,000 coins
      "Epic", // From 2,000,000 coins to 10,000,000 coins
      "Legendary", // From 10,000,000 coins to 50,000,000 coins
      "Master", // From 50,000,000 coins to 100,000,000 coins
      "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
      "Lord", // From 1,000,000,000 coins to ∞
    ];
    const levelMinPoints = [
      0, // Bronze
      5000, // Silver
      25000, // Gold
      100000, // Platinum
      1000000, // Diamond
      2000000, // Epic
      10000000, // Legendary
      50000000, // Master
      100000000, // GrandMaster
      1000000000, // Lord
    ];
    for (let i = 0; i < levelMinPoints.length - 1; i++) {
      if (coins >= levelMinPoints[i] && coins < levelMinPoints[i + 1]) {
        setLevel(levelNames[i]);
        break; // Exit loop once the correct level is found
      } else if (coins >= 1000000000) {
        setLevel("Lord");
        break; // Exit loop once the correct level is found
      }
    }
  }, [coins]);

  // Debounced function to update coin balance
  const debouncedUpdate = useCallback(
    debounce(async (newBalance: number) => {
      await updateCoinBalance({
        variables: { id: userId, coin_balance: newBalance },
      });
    }, 500), // 500 ms debounce
    [userId, updateCoinBalance]
  );

  const handleTap = () => {
    const newBalance = coins + 1; // Increment the coin balance
    setCoins(newBalance); // Update the local state immediately
    debouncedUpdate(newBalance); // Call the debounced function
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="tap-container mx-auto rounded-lg">
      <div className="text-4xl font-serif underline underline-offset-4 decoration-indigo-500">
        {level}
      </div>
      <h1 className="mt-2 font-serif tracking-wider text-4xl mb-8">
        Coins: {coins}
      </h1>
      <div className="px-4 mt-4 flex justify-center">
        <div
          className="w-80 h-80 p-4 rounded-full circle-outer"
          onClick={handleTap}
        >
          <div className="w-full h-full rounded-full circle-inner">
            <img
              src={mainCharacter}
              alt="Main Character"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapButton;
