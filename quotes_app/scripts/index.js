var quotePlace = document.getElementById('quote_there');
var authorPlace = document.getElementById('author_there');
var tweet = document.getElementById('tweetText');
var tweetUrl = document.getElementById('tweetText').href;
var bodyTag = document.getElementsByTagName('body')[0];
var nextQuoteButton = document.getElementById('next_quote');
var wrapper = document.getElementById('wrapper');

execAjax();

nextQuoteButton.onclick = function(){
    execAjax();
}

function execAjax(){
    wrapper.classList.remove("effect");
    
    var responce = new XMLHttpRequest();
    responce.open('GET', 'http://quotes.stormconsultancy.co.uk/random.json');
    responce.send();

    responce.onreadystatechange = function(){
        if(responce.status === 200 && responce.readyState === 4){
            var color = generateColor();

            var textQuote = JSON.parse(responce.responseText);
            quotePlace.innerHTML = textQuote.quote;
            authorPlace.innerHTML = textQuote.author;
            var newTweetUrl = tweetUrl + '?text=' + encodeURIComponent(textQuote.quote) + '';
            tweet.href = newTweetUrl;
            bodyTag.setAttribute('style', 'background:' + color + ';');
            nextQuoteButton.setAttribute('style', 'background:' + color + ';');

            wrapper.classList.add("effect");
        }else if(responce.status != 200){
            console.log('Something went wrong');
        }   
    }
}

function generateColor(){
	var colors = ['#DFAE74', '#475771', '#FFADDB', '#F4CFA3', '#D2EBF2', '#3A8ABD', '#49B2AB', '#695454', '#A8B26A', '#F7896B', '#706344'];
    var randomColor = Math.floor(Math.random() * 10); 
    return colors[randomColor];
}