// src/App.tsx
import React, { useLayoutEffect, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TapButton from "./components/TapButton";
import axios from "axios";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Your GraphQL server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null); // Initialize userId as null

  useLayoutEffect(() => {
    const fetchUserId = async () => {
      try {
        // Fetch the user ID from your API
        const response = await axios.get("http://localhost:3000/api/user"); // Ensure this URL matches your Express server
        console.log(response.data.userId); // Assuming the response has a userId property
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Show loading state until userId is fetched
  if (userId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 to-black text-white p-4">
      <ApolloProvider client={client}>
        <TapButton userId={userId} />
      </ApolloProvider>
    </div>
  );
};

export default App;
