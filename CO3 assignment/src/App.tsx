// import "./App.css";
import CoinTapperGame from "./components/coinGame.tsx";

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
    <>
      <ApolloProvider client={client}>
        <TapButton userId={userId} />
      </ApolloProvider>
      <CoinTapperGame></CoinTapperGame>
    </>
  );
};

export default App;
