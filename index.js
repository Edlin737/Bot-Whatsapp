js
const { default: makeWASocket } = require("@whiskeysockets/baileys");
const { useSingleFileAuthState } = require("@whiskeysockets/baileys");

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "open") {
      console.log("✅ Bot la konekte!");
    }
  });

  sock.ev.on("messages.upsert", async (msg) => {
    console.log("Nou resevwa yon mesaj:", msg);
  });

  sock.ev.on("creds.update", saveState);
}

startBot();
