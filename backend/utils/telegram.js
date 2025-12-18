import axios from "axios"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const FALLBACK_CHAT_ID = "-1002973278073"

export const sendTelegramNotification = async (username, email, userId) => {
  console.log(`New user registered | email: ${email}`)

  if (!TELEGRAM_BOT_TOKEN) {
    console.warn("Telegram bot token not configured. Skipping notification.")
    return
  }

  const message =
    `<b>🚀 New BlockHost Registration</b>\n\n` +
    `👤 <b>Name:</b> ${username}\n` +
    `📧 <b>Email:</b> ${email}\n` +
    `🆔 <b>User ID:</b> ${userId}\n\n` +
    `<b>📈 We are growing, master.</b>`

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  try {
    // Try sending to primary chat (owner)
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    })
    console.log("✅ Telegram notification sent to owner")
  } catch (primaryError) {
    console.warn("⚠️ Failed to send to owner, trying fallback group...")

    // Fallback to group chat
    try {
      await axios.post(url, {
        chat_id: FALLBACK_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      })
      console.log("✅ Telegram notification sent to fallback group")
    } catch (fallbackError) {
      console.error("❌ Telegram notification failed on both channels:", fallbackError.message)
    }
  }
}
