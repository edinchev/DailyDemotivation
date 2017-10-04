var Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetDemotivationalQuoteIntent');
    },

    'GetDemotivationalQuoteIntent': function () {
        this.emit(':tell', getQuote());
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Make your day better by listening to a demotivational quote.', 'try again');
    },

    'AMAZON.CancelIntent': function () {

    },

    'AMAZON.StopIntent': function () {

    }
};

function getQuote() {
    var myQuotes = [
        'Affirmation. Instilling the self-confidence kids will need to carry them through all the failure they\'ll experience because they weren\'t taught competence instead.',
        'Discouragement-Fish. Because there\'s nothing standing between you and your goal but a total lack of talent and complete failure of will.',
        'Dream Small. It\'s your only hope for success, really.',
        'Expectations. Refuse to accept anything but the very best and you are never going to last around here.',
        'Never Give Up. Never stop trying to exceed your limits. We need the entertainment.',
        'Politics. A nation divided against itself cannot stand to hear what those other lunatics are trying to say.',
        'Pulling Together. Only works when you\'re not jerking in opposite directions like idiots.',
        'Stubbornness. Because somebody has to be right and it might as well be me.',
        'Survival-Shark. One life\'s journey is another\'s destination.',
        'Virtue. You must tweet the change you want to see in the world. It won\'t affect anything, but at least people will know exactly where you stood during the fight. Doing nothing. Like the poser you are.',
        'You Are Special. If you require additional affirmation, get a puppy. The rest of us are trying to work.',
        'Accountability. A word leaders start to use right before the scapegoating begins.',
        'Be the Bridge. That way we can walk all over you on our way to better places.',
        'Caution-Iceberg. Disaster awaits those who ignore hidden threats. We trust you\'ll find this sufficiently motivating.',
        'Dare to Be Different. Because there\'s always room for another annoying non-conformist like you in the unemployment line.',
        'Dare to Soar. With enough hot air, even losers like you can fly.',
        'Downsizing. Because we\'re all in this together but there\'s always room for one less.',
        'Interns. The experience we\'re giving you is invaluable. That\'s why we\'re not paying you anything.',
        'Mediocrity-Penguins. Just because we accept you as you are doesn\'t mean we\'ve abandoned hope you\'ll improve.',
        'Micromanagement. A job worth doing is worth doing right over your shoulder by your boss.',
        'Progress. Just made you irrelevant.',
        'Ruthlessness. It pays a lot better than integrity.',
        'Teams. Together, we can do the work of one.',
        'Motivation. If a pretty poster and a cute saying are all it takes to motivate you, you probably have a very easy job. The kind robots will be doing soon.',
        'Tradition. Just because you\'ve always done it that way doesn\'t mean it\'s not incredibly stupid.',
        'Wishes. When you wish upon a falling star, your dreams can come true. Unless it\'s really a meteorite hurtling to the Earth which will destroy all life. Then you\'re pretty much hosed no matter what you wish for. Unless it\'s death by meteor.',
        'Multitasking. The art of doing twice as much as you should half as well as you could.',
        'Get To Work. You aren\'t being paid to believe in the power of your dreams.',
        'Shoot for the Moon. Even if you miss, you\'ll land among the stars. Of course, then your eyeballs will boil and your lungs explode from decompression. But that\'s what you get for being a damn showoff.',
        'Procrastination. Hard work often pays off after time, but laziness always pays off now.',
        'Knowledge. I believe that children are our future. And that terrifies me.',
        'Mistakes. It could be that the purpose of your life is only to serve as a warning to others.',
        'Distinction. Looking sharp is easy when you haven\'t done any work.',
        'Ambition. The journey of a thousand miles sometimes ends very, very badly.',
        'Potential. Not everyone gets to be an astronaut when they grow up.',
        'Achievement. You can do anything you set your mind to when you have vision, determination, and an endless supply of expendable labor.',
        'Believe in Yourself. Because the rest of us think you\'re an idiot.',
        'Meetings. None of us is as dumb as all of us.',
        'Perseverance. The courage to ignore the obvious wisdom of turning back.',
        'Consulting. If you\'re not a part of the solution, there\'s good money to be made in prolonging the problem.',
        'Government. If you think the problems we create are bad, just wait until you see our solutions.',
        'Idiocy. Never underestimate the power of stupid people in large groups.',
        'Priorities. Hundreds of years from now, it will not matter what my bank account was, the sort of house I lived in, or the kind of car I drove... But the world may be different because I did something so bafflingly crazy that my ruins become a tourist attraction.',
        'Limitations. Until you spread your wings, you\'ll have no idea how far you can walk.',
        'Foresight. Those who say it cannot be done should not interrupt those busy proving them right.',
        'Consistency. It\'s only a virtue if you\'re not a screwup.',
        'Demotivation. Sometimes the best solution to morale problems is just to fire all of the unhappy people.',
        'Winners. Because nothing says \"you\'re a loser\" more than owning a motivational poster about being a winner.',
        'Hope. May not be warranted at this point.',
        'Economics. The science of explaining tomorrow why the predictions you made yesterday didn\'t come true today.',
        'Underachievement. Because soaring with the eagles requires so much more effort.',
        'Worth. Just because you\'re necessary doesn\'t mean you\'re important.',
        'Survival. Keep your friends close, but your enemies closer. Especially to your friends.',
        'Marketing. Because making it look good now is more important than providing adequate support later.',
        'Insignificance. If you think it\'s lonely at the top, just wait \'til you try the bottom.',
        'Love. Money can\'t buy you love. But it can buy exotic cars and luxury yachts. Once you\'ve got those covered, you\'ll be fighting love off with a stick.',
        'Legacy. It took millions of years to create something this extraordinary. You have about seventy-four.',
        'Execution. It\'s not just the ability to put a plan into action, it\'s our solution for those who lack that ability.',
        'Retirement. Because you\'ve given so much of yourself to the company that you don\'t have anything left we can use.',
        'Sacrifice. All we ask here is that you give us your heart.',
        'Sanity. Minds are like parachutes. Just because you\'ve lost yours doesn\'t mean you can borrow mine.',
        'Revelation. The downside of being ahead of your time is that your ruins might end up a playground for cavorting druids.',
        'Adventure. Keep living life like there\'s no tomorrow and you\'ll be right sooner than you think.',
        'Aspiration. I hear the call to do nothing and am doing my best to answer it.',
        'Keep Calm. We\'ll get to the carrion part in a minute.',
        'Challenges. I expected times like this - but I never thought they\'d be so bad, so long, and so frequent.',
        'Teamwork. A few harmless flakes working together can unleash an avalanche of destruction.',
        'Give Up. At some point, hanging in there just makes you look like an even bigger loser.'
    ];

    return randomQuote(myQuotes);
}

/**
 *
 * @param array
 * @returns {*}
 */
function randomQuote(array) {
    var i = Math.floor(Math.random() * array.length);
    return (array[i]);
}