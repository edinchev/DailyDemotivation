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
        this.emit(':tell', getQuote() );
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Make your day better by listening to a demotivational quote.', 'try again');
    },

    'AMAZON.CancelIntent': function () {

    },

    'AMAZON.StopIntent': function () {

    }
};

//@todo Get quotes from DynamoDB.
function getQuote() {

    var myQuotes = [
        'Dream small. It\'s your only hope for success, really.',
        'Never give up. Never stop trying to exceed your limits. We need the entertainment.',
        'Stubbornness. Because somebody has to be right and it might aswell be me.',
        'Teams. Together we can do the work of one.'
    ]

    return randomQuote(myQuotes);
}

function randomQuote(array) {
    var i = Math.floor(Math.random() * array.length);
    return(array[i]);
}