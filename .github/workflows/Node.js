const mineflayer = require('mineflayer');
const AutoAuth = require('mineflayer-auto-auth');

let botCount = 0;

function createBot() {
  const botName = `Bot_${botCount}`;

  const bot = mineflayer.createBot({
    host: 'crash-smp.aternos.me',
    port: 22898,
    version: false,
    username: botName,
    plugins: [AutoAuth],
    AutoAuth: 'bot112022'
  });

  bot.on('login', () => {
    console.log(`✅ ${bot.username} ist dem Server beigetreten!`);
    botCount++; // erst hier erhöhen – nach erfolgreichem Login
  });

  bot.on('kicked', (reason) => {
    console.log(`⛔ ${bot.username} wurde gekickt:`, reason);
  });

  bot.on('error', (err) => {
    console.log(`⚠️ Fehler bei ${bot.username}:`, err);
  });

  bot.on('end', () => {
    console.log(`🔄 ${bot.username} getrennt, versuche Neustart...`);
    setTimeout(() => createBot(), 5000); // Warten vor dem Reconnect
  });
}

// Alle 30 Sekunden ein neuer Bot
setInterval(() => {
  createBot();
}, 5000);
