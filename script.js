let bots = document.querySelector('.bot'),
    player =  document.querySelector('.player'),
    ofsetBot= 0,
    difficult,
    togle = true,
    scope = 0,
    record = 0,
    copyP = player.style.bottom = 50 + "px",
    ofsetPlayer = 0; // Змінна для кординат гравця

function changeColorBot(bot){
    let rand =Math.floor( 1 - 0.5 + Math.random() * (3 - 1 + 1));
    switch(rand){
        case 0: bot.style.background = 'orange'; break;
        case 1: bot.style.background = 'yellow'; break;
        case 2: bot.style.background = 'brown'; break;
        case 3: bot.style.background = 'violet'; break;
    }
}

setTimeout(()=>{animateBots(bots, togle, difficult);}, 1000);     // first start animation Bot

document.onkeypress = (event)=>{
    if(event.code == "Enter"){  //Press to "Enter" - for RESTART game
        togle = true;
        difficult = document.querySelector('.difficult').value;
        document.querySelector('.info_difficult').innerHTML = ` ${difficult} `;
        difficult = 10 - difficult;
        nextStep(bots, togle);
    } 
    if(event.code == "Space"){  //Press to "SPACE" - for JUMP square
        animatePlayer(togle);
    } 
}
async function nextStep(bot, chec){
    if(!chec){return false;}
    else{
        bot.style.transition = 'all 0s ease';
        bot.style.left = 90 + '%';
        setTimeout(() => animateBots(bot, togle, difficult), 500);
        return false;
    }    
}
async function animatePlayer(chec){
    if(!chec) {return false;}
    else{
        let qwe = true;
        if(ofsetPlayer >179){
            ofsetPlayer -= 1;
            qwe = false
        }else{
            ofsetPlayer += 1;
        }
        player.style.bottom = ofsetPlayer + 'px';
        setTimeout(() =>player.style.bottom = 50 + 'px', 500);
        if(!qwe){ return false}
        else animatePlayer(togle);
    }
}

async function animateBots(bot, chec, speed){
    if(!chec){ return false;}
    else{
        bot.style.transition = `all .${speed}s ease`;
        if(ofsetBot > -40){
        bot.style.left = ofsetBot + '%';
        ofsetBot -= 1;
        animateBots(bot, togle, difficult);    
        }else{
            changeColorBot(bot);
            copyP = player.style.bottom;
            check(ofsetBot, copyP)
            ofsetBot = 0;
            setTimeout(() => {
                nextStep(bot, togle);}, 500);
            return ofsetBot;
        } 
    }   
}

async function check (ofB, ofP){   
    if(togle == true){
        if(ofB == "-40" && ofP == "50px"){
            document.querySelector('h1').innerHTML = `<span class=lose> YOU LOSE</span>`;
            togle = false;     
            scope = 0;
        }else
        {
            document.querySelector('h1').innerHTML = ` `;
            scope += 10;
            if(record < scope){record = scope};
            document.querySelector('.scope').innerHTML =`Record: ${record}  ||  Scope: ${scope}` ;
        }
    }
}
