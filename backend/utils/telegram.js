import axios from "axios"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7339063037"

export const sendTelegramNotification = async (username, email, createdAt) => {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn("Telegram bot token not configured. Skipping notification.")
    return
  }

  try {
    const message =
      `🆕 New BlockHost Registration\n\n` +
      `👤 Username: ${username}\n` +
      `📧 Email: ${email}\n` +
      `🕒 Time: ${new Date(createdAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })}`

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    })

    console.log("✅ Telegram notification sent successfully")
  } catch (error) {
    console.error("❌ Telegram notification error:", error.message)
    throw error
  }
}
