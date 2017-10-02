var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetDemotivationalQuoteIntent');
    },

    'GetDemotivationalQuoteIntent': function () {
        this.emit(':tell', getFact() );
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Make your day better by listening to a demotivational quote.', 'try again');
    },

    'AMAZON.CancelIntent': function () {

    },

    'AMAZON.StopIntent': function () {

    }
};


function getFact() {
    var myFacts = [
        'Dream small. It\'s your only hope for success, really.',
        'Never give up. Never stop trying to exceed your limits. We need the entertainment.',
        'Stubbornness. Because somebody has to be right and it might aswell be me.',
        'Teams. Together we can do the work of one.'
    ]

    var newFact = randomPhrase(myFacts);

    return newFact;
}

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}