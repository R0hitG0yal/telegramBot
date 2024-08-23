import TelegramBot from "node-telegram-bot-api";
import { createClient } from "@supabase/supabase-js";

// Initialize the Telegram bot with your bot token
const bot = new TelegramBot("7306798431:AAFMnaoH1L_e6rGUC6bLcflcmEq1Qsc2mRQ", {
  polling: true,
});

// Initialize Supabase client with your Supabase URL and anon key
const supabase = createClient(
  "https://hvvnierfjwymrcwuxyyk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dm5pZXJmand5bXJjd3V4eXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyOTU0NjcsImV4cCI6MjAzOTg3MTQ2N30.omdvdPlNIjUCujbCCXvG0gWEE-7qhopaHSXHmNMmTVc"
);

// Handle the /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = parseInt(msg.from?.id.toString() || "", 10); // Safely get the user ID

  if (!userId) {
    return bot.sendMessage(chatId, "Unable to identify the user.");
  }
  console.log(`id: ${userId}`);

  // Insert or update user in Supabase
  const { data, error } = await supabase
    .from("userschema")
    .upsert({ id: userId, coin_balance: 0 });

  if (error) {
    console.error("Error creating user:", error.message); // Log the error for debugging
    return bot.sendMessage(chatId, "Error creating user. Please try again.");
  }

  const webAppUrl =
    "https://telegram-7dp7ab3zb-rohit-s-projects-49622701.vercel.app/";
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "Open Web App",
          url: webAppUrl,
        },
      ],
    ],
  };
  // Send welcome message to the user
  bot.sendMessage(
    chatId,
    "Welcome to TapMe! Tap the button below to open the web app.",
    {
      reply_markup: { inline_keyboard: keyboard.inline_keyboard },
    }
  );
});

// Handle other commands or messages as needed
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "This is the help message. Use /start to begin.");
});

// Handle errors globally
bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});

// ----------------------------------------------------------------
