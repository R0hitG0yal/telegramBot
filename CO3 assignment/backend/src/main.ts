import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { supabase } from "./supabase";

// Define your type definitions
const typeDefs = /* GraphQL */ `
  type User {
    id: Int!
    coin_balance: Int!
  }

  type Query {
    getUser(id: Int!): User
  }

  type Mutation {
    updateCoinBalance(id: Int!, coin_balance: Int!): User
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    getUser: async (parent: any, args: { id: number }) => {
      console.log("getUser called with id:", args.id);
      const { data, error } = await supabase
        .from("userschema")
        .select("*")
        .eq("id", args.id)
        .single();

      if (error) {
        console.error("Error fetching user:", error.message);
        throw new Error(error.message);
      }
      return data;
    },
  },
  Mutation: {
    updateCoinBalance: async (
      parent: any,
      args: { id: number; coin_balance: number }
    ) => {
      console.log(
        "updateCoinBalance called with id:",
        args.id,
        "coin_balance:",
        args.coin_balance
      );

      const { data, error } = await supabase
        .from("userschema")
        .update({ coin_balance: args.coin_balance })
        .eq("id", args.id)
        .select()
        .single(); // Fetch a single updated record

      if (error) {
        console.error("Error updating coin balance:", error.message);
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("User not found or update failed");
      }

      return data;
    },
  },
};

// Create the schema using makeExecutableSchema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create the Yoga server
const yoga = createYoga({
  schema,
  context: {
    supabase,
  },
});

// Create an HTTP server
const server = createServer(yoga);

// Start the server
server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
