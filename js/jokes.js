const uciJokes = ["What's the name of an Anteater donating blood? Peter the bleeder!", 
                  "Who's the Anteater that went to jail for Domestic Violence? Peter the Wife Beater!", 
                  "Eat the (ald)rich", 
                  "Why don’t anteaters get sick? Because they’re full of antibodies.", 
                  "Who's the Anteater with 3 wives? Peter the Cheater!", 
                  "An Anteater walks into a bar.... Bartender says \"can I get you a drink\" \"Nooooooo\" Frazzled, the bartender says \"What's with the long no's\"? Anteater replies \"I was born with it\".", 
                  "Why do you need to hear a uci joke when uci is the joke", 
                  "What do you call a vegetarian at UCI? A planteater", 
                  "Zoot your zot"]

const peterImages = ["images/peter1.png", 
                     "images/peter2.png", 
                     "images/peter3.png", 
                     "images/peter4.png", 
                     "images/peter5.png", 
                     "images/peter6.png", 
                     "images/peter7.png",
                     "images/peter8.png",
                     "images/peter9.png",
                     "images/peter10.png",
                     "images/peter11.png",
                     "images/peter12.png",
                     "images/peter13.png",
                     "images/peter14.png",
                     "images/peter15.png",
                     "images/peter16.png",
                     "images/peter17.png",
                     "images/peter18.png",
                     "images/peter19.png",
                     "images/peter20.png"];

function returnRandomImg () {
    let currentImgPath = document.querySelector('img.petercartoon').getAttribute("src");
    const newImgIndex = (Math.floor(Math.random() * peterImages.length) % (peterImages.length - 1));
    
    let newPeterImages = [...peterImages];

    newPeterImages.splice(peterImages.indexOf(currentImgPath), 1);
    
    return newPeterImages[newImgIndex];
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button1').addEventListener('click', 
    onclick1, false);
    document.getElementById('button2').addEventListener('click', 
    onclick2, false);
    document.getElementById('button3').addEventListener('click', 
    onclick3, false);
    let availableUciJokes = [...uciJokes];
    
    let bg = document.getElementsByTagName('BODY')[0];
    chrome.storage.sync.get({
        selected_color: 'yellow',
    }, function (items) {  
        if (items.selected_color === 'yellow') {
            bg.style.backgroundColor = '#EBEFBF';
        } else if (items.selected_color === 'green') {
            bg.style.backgroundColor = '#B3EFB2';
        } else { // blue
            bg.style.backgroundColor = '#C0E8F9';
        }
         
    }); 

    function onclick1 () {
        let jokeNode = document.getElementById('joketext');
        
        const newUciJokeIndex = Math.floor(Math.random() * availableUciJokes.length) % availableUciJokes.length;
        jokeNode.textContent = availableUciJokes[newUciJokeIndex];
        availableUciJokes.splice(newUciJokeIndex, 1);

        if (availableUciJokes.length <= 0) {
            availableUciJokes = [...uciJokes];
        }

        let img = document.querySelector('img.petercartoon');
        img.setAttribute('src', returnRandomImg());
    }

    async function onclick2 () {
        let newDadJoke = document.getElementById('joketext');

        let response = await fetch('https://icanhazdadjoke.com/', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'UCI Hackathon Project'
               }
        
        });
        response = await response.json();

        newDadJoke.textContent = response['joke'];

        let img = document.querySelector('img.petercartoon');
        img.setAttribute('src', returnRandomImg());
    }

    async function onclick3 () {
        let newInspirationalQuote = document.getElementById('joketext');

        let response = await fetch('https://api.kanye.rest', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'UCI Hackathon Project'
               }
        
        });
        response = await response.json();
        newInspirationalQuote.textContent = response['quote'];
        
        let img = document.querySelector('img.petercartoon');
        img.setAttribute('src', returnRandomImg());
    }

}, false)