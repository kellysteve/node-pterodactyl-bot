const TelegramBot = require('node-telegram-bot-api');
const Nodeactyl = require('nodeactyl');

/* STARTS, ENTER YOUR TOKEN */
const bot = new TelegramBot('8538146639:AAEmbVr9Gnrz9vWQajHlj2ipPmG_NPjtx5k', {
	polling: true
});

/* INSERT COMMANDS, FOR HINTS */
bot.setMyCommands([
	{
		command: '/login',
		description: 'login, insert token'
	}
 ]);

/* COMMAND WHICH DISPLAYS A GREETING */
bot.onText(/\/start/, (msg, match) => {
	// 'msg' is the received Message from Telegram 
	// 'match' is the result of executing the regexp above on the text content 
	// of the message 
	
	const chatId = msg.chat.id;
	
	/* greeting itself */
	bot.sendMessage(chatId, "♥️ Greetings. I am a bot to manage the hosting client panel MyHost.\n\n✨️ Specially created by Author.");  // greeting 
});

/* LOGIN IN THE PANEL OF YOUR HOSTING WITH THE HELP OF THE TOKEN. INSERT TOKEN THROUGH A SPACE */
bot.onText(/^(?:login)\s(.*)$/i, (msg, match) => {
	const chatId = msg.chat.id;
	let token = match[1]; // get the token from the first argument after login 
	let first = msg.from.first_name; // to answer  
	if (msg.chat.type === 'supergroup') {
		bot.sendMessage(chatId, `‼️This command is only available in LAN!`);
	} else if (msg.chat.type === 'chat') {
		bot.sendMessage(chatId, `‼️This command is only available in LAN!`);
	} else {
		let client = new Nodeactyl.NodeactylClient("https://panel.hosting.site", token); /* https://... your host url */ 
		var sv = client.getAccountDetails();
		/*console.log(sv); for show more details */
		sv.then(function (value) {
			bot.sendMessage(chatId, `ℹ️ Information:\n\n👤 Username: ${value.username}\n🆔 Your ID: ${value.id}\n📧 Your email: ${value.email}`); // Success! 
		}, function (reason) {
			bot.sendMessage(chatId, reason); // Error! 
		})
		if (token != null) {
			bot.sendMessage(chatId, `✅️ You have successfully logged in, ${first}.\n🔰 Token: ${token}.`);
			/* console.log(msg); for more details */
		} else {
			bot.sendMessage(chatId, `⛔️ You have entered an invalid token, ${first}.\n🔰 Token: ${token}.`);
		}
	}
});

