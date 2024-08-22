// src/TapButton.tsx
import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import "./tapButton.css"; // Create a CSS file for styles

const GET_USER = gql`
  query GetUser($userId: Int!) {
    getUser(id: $userId) {
      id
      coin_balance
    }
  }
`;

const INCREMENT_COINS = gql`
  mutation IncrementCoins($userId: Int!) {
    incrementCoins(userId: $userId) {
      id
      coin_balance
    }
  }
`;

const TapButton: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { userId },
  });
  const [incrementCoins] = useMutation(INCREMENT_COINS, {
    onCompleted: () => {
      refetch(); // Refetch the user data after the mutation is completed
    },
  });
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (data && data.getUser) {
      setCoins(data.getUser.coin_balance);
    }
  }, [data]);

  const handleTap = async () => {
    await incrementCoins({ variables: { userId } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="tap-container">
      <h1>Coins: {coins}</h1>
      <button className="tap-button" onClick={handleTap}>
        Tap Me!
      </button>
    </div>
  );
};

export default TapButton;
