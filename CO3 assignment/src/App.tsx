// src/App.tsx
import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TapButton from "./components/TapButton";
import axios from "axios";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Your GraphQL server URL
  cache: new InMemoryCache(),
});



const App: React.FC = () => {
  const [userId, setUserId] = useState(0); // Replace with actual user ID from Telegram

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 to-black text-white p-4">
      <div>
        <ApolloProvider client={client}>
          <TapButton userId={userId} />
        </ApolloProvider>
      </div>
    </div>
  );
};

export default App;
