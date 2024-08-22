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
    incrementCoins(userId: Int!): User
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
    // addUser: async (
    //   parent: any,
    //   args: { id: number; coin_balance: number }
    // ) => {
    //   const { data, error } = await supabase
    //     .from("users")
    //     .insert([
    //       { id: args.id, coin_balance: args.coin_balance },
    //     ])
    //     .select()
    //     .single();

    //   if (error) {
    //     throw new Error(error.message);
    //   }
    //   return data;
    // },
    incrementCoins: async (_: any, { userId }: { userId: number }) => {
      // Get the current coin balance
      const { data: user, error: fetchError } = await supabase
        .from("userschema")
        .select("coin_balance")
        .eq("id", userId)
        .single();

      if (fetchError || !user) {
        throw new Error("User not found");
      }

      // Increment the coins
      const newCoins = user.coin_balance + 1;

      // Update the user with the new coin balance
      const { data, error } = await supabase
        .from("userschema")
        .update({ coin_balance: newCoins })
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error("Error updating coins");
      }

      return data;
    },

    // updateCoinBalance: async (
    //   parent: any,
    //   args: { id: number; amount: number }
    // ) => {
    //   console.log(
    //     "updateCoinBalance called with id:",
    //     args.id,
    //     "amount:",
    //     args.amount
    //   );
    //   const { data, error } = await supabase
    //     .from("users")
    //     .update({ coin_balance: args.amount })
    //     .eq("id", args.id)
    //     .select()
    //     .single();

    //   if (error) {
    //     console.error("Error updating coin balance:", error.message);
    //     throw new Error(error.message);
    //   }
    //   return data;
    // },
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
