// src/bot.ts
import TelegramBot from "node-telegram-bot-api";
import { createClient } from "@supabase/supabase-js";

const bot = new TelegramBot("YOUR_TELEGRAM_BOT_TOKEN", { polling: true });
const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString();

  // Insert user into Supabase if not exists
  const { data, error } = await supabase
    .from("users")
    .upsert({ id: userId, coins: 0 });

  if (error) {
    bot.sendMessage(chatId, "Error creating user.");
  } else {
    bot.sendMessage(
      chatId,
      "Welcome to TapMe! Tap the button in the web app to earn coins!"
    );
  }
});
