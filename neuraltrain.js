const fs = require("fs");
const Brain = require('brain.js');
const network = new Brain.recurrent.LSTM({activation: 'leaky-relu'});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var trainingData = [];

function loadInitialData() {
    train(JSON.parse(fs.readFileSync('database.json')));
}

function loadTrainingData() {
    network.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));
	train(JSON.parse(fs.readFileSync('database.json')));
}

function saveTrainingData() {
	try {
		fs.writeFile('neuralnet.json', JSON.stringify(network.toJSON()), (err, result) => {
			if(err) console.log("Error:" + err);
		});
	} catch(err){
		console.log(err);
	}
}

function testTrainingModel() {
	network.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));
	boot();
}

const train = (dt) => {

	console.log("Training.");
	
	const d = new Date();
	
	network.train(dt, {
		iterations: 2000,
		log: true,
		errorThresh: 0.001,
		logPeriod: 1,
		momentum: 0.1,
		learningRate: 0.001
	});
	
	saveTrainingData();
	
	console.log(`Finished in ${(new Date() - d) / 1000} s`);
}

const boot = () => {
	rl.question("Enter: ", (q)=>{
		var qs = q.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase();
		console.log(reply(network.run(qs)));
		boot();
	});
}

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
        22: "H&m",
        23: "Homedepot",
        24: "Instacart",
        25: "Jdsports",
        26: "Logitech",
        27: "Louis Vuitton",
        28: "Msi",
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


const init = () => {
	//loadTrainingData();
    //loadInitialData();
	testTrainingModel();
}
init();

