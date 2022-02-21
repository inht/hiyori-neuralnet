const Brain = require('brain.js');
const network = new Brain.recurrent.LSTM({activation: 'leaky-relu'});
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

let config;

config = {
    token: "",
    prefix: ".",
    developers: []
}

function checkUser(user_id) {
    try {
        const isDeveloper = config.developers.includes(user_id);
        return isDeveloper;
    } catch (err) {
        console.log(err);
    }
}

client.on('ready', async () => {
    console.log("Hiyori Neural Network Bot is active.");
    network.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));
    await client.user.setActivity("data.", {type: "WATCHING"});
    await client.user.setStatus("dnd")
})

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let user_response = message.content;
    let strip_response = user_response.replace(/[^a-zA-Z0-9 ]+/g, "").toLowerCase();
    console.log(`${message.author.username}: ${strip_response}`)
    message.channel.send(reply(network.run(strip_response)))
    message.channel.send(network.run(strip_response))
})

client.login(config.token);

const reply = (intent) => {
	if(intent === "") return "I don't recognize that store.";
    let store = {
        1: "Asos",
        2: "Asus",
        3: "Adidas",
        4: "Altmanlighting",
        5: "Amazon",
        6: "American Eagle",
        7: "Apple",
        8: "Beach Camera",
        9: "Best Buy",
        10: "Bloomingdales",
        11: "Carparts",
        12: "Corsair",
        13: "Costco",
        14: "Currys",
        15: "Dickssportinggoods",
        16: "Dior",
        17: "Farfetch",
        18: "Footlocker",
        19: "Gamestop",
        20: "Goat",
        21: "Google",
        22: "H&M",
        23: "Homedepot",
        24: "Instacart",
        25: "Jdsports",
        26: "Logitech",
        27: "Louis Vuitton",
        28: "MSI",
        29: "Macys",
        30: "Michael Kors",
        31: "Microsoft",
        32: "Newegg",
        33: "Next",
        34: "Nike",
        35: "Nordstrom",
        36: "Oculus",
        37: "Paypal",
        38: "Prada",
        39: "Qvc",
        40: "Ralph Lauren",
        41: "Rayban",
        42: "Razer",
        43: "Rockauto",
        44: "Rue 21",
        45: "Samsclub",
        46: "Samsung",
        47: "Shein",
        48: "Steelseries",
        49: "Stockx",
        50: "Stone Island",
        51: "Target",
        52: "Ulitmate Ears",
        53: "Urban Outfitters",
        54: "Valentino",
        55: "Victoria Secret",
        56: "Walmart",
        57: "Wayfair",
        58: "Zalando",
        59: "Zappos",
        60: "Zara",
        61: "Zumiez"
    }
    const StoreReply = {"refund": `${store[parseInt(intent)]} has been selected for refunding.`}
	let retstr = StoreReply["refund"];

	
	return retstr;
}