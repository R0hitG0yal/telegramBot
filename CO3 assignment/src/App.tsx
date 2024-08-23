// import "./App.css";

// function App() {
//   return (
//     <>
//       <CoinTapperGame />
//     </>
//   );
// }

// export default App;

// src/App.tsx
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TapButton from "./components/TapButton";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Your GraphQL server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const userId = 1; // Replace with actual user ID from Telegram

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
