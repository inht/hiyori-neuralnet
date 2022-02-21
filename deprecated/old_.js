/** const brain = require('brain.js');
const network = new brain.recurrent.LSTM();

//const prefix = ".";

const trainingWheels = require('./data.json');

const trainingData = trainingWheels.map(data => ({
    input: data.text,
    output: data.type
}));

network.train(trainingData, {
    iterations: 2000,
    log: (error) => console.log(error)
}); 

let test = 'Can you refund Amazon.com products?';

const output = network.run(test);
console.log(output);

if(output) {
    let data_check = [];
    for(let i = 0; i < trainingWheels.length; i++) {
        if(trainingWheels[i]['text'] === test){
            data_check.push(test)
        }
    }

    if(data_check.length === 0) {
        console.log('The test statement is not in the text database.')
    } else {
        console.log('The test statement is in the text database.')
    }
}*/