window.onload = init;

function init() {

    if('serviceWorker' in navigator) { 
        navigator.serviceWorker.register('sw.js')
            .then(function(registration) {
                 console.log("Service Worker Registered");
            }
        ); 
    }
      

    let startingCapital = 200;
    let totalChips = startingCapital;
    let totalBet = 0;
    let secondHandTotalBet = 0;
    let canBet = true;
    let deck = [];
    let secondHandDeck = [];
    let dealerDeck = [];
    let points = 0;
    let secondHandPoints = 0;
    let dealerPoints = 0;
    let secondHandTurn = false;
    let secondHandFirstTurn = true;
    let blackjack = false;
    let dealerBlackjack = false;
    let timeToReset = false;
    let dealerTurn = false;

    const spades = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const clubs = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const diamonds = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const hearts = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];

    const pBegin = document.querySelector('#pBegin');
    const pCards = document.querySelector('#pCards');
    const pPoints = document.querySelector('#pPoints');
    const pSecondHandCards = document.querySelector('#pSecondHandCards');
    const pSecondHandPoints = document.querySelector('#pSecondHandPoints');
    const pChips = document.querySelector('#pChips');
    const pBet = document.querySelector('#bet');
    const pSecondHandBet = document.querySelector('#secondHandBet');
    pChips.innerHTML += `\$${totalChips}`;
    const pDealerCards = document.querySelector('#pDealerCards');
    const pDealerPoints = document.querySelector('#pDealerPoints');

    const begin = document.querySelector('#begin');
    let canBegin = false;
    const stand = document.querySelector('#stand');
    let canStand = false;
    const hit = document.querySelector('#hit');
    let canHit = false;
    const doubleUp = document.querySelector('#doubleUp');
    let canDoubleUp = false;
    const split = document.querySelector('#split');
    let canSplit = false;
    let hasSplit = false;

    const allOptionsArray = [stand, hit, doubleUp, split];

    const plus10 = document.querySelector('#plus10');
    const plus100 = document.querySelector('#plus100');
    const minus10 = document.querySelector('#minus10');
    const minus100 = document.querySelector('#minus100');    

    begin.addEventListener('click', function() {
        reset();        
    })

    stand.addEventListener('click', function() {
        fStand();
    })

    hit.addEventListener('click', function() {
        if (!secondHandTurn) {
            fHit(deck);
        }
        else {
            fHit(secondHandDeck);
        }
    })

    doubleUp.addEventListener('click', function() {
        if (!secondHandTurn) {
            fDoubleUp(deck);
        }
        else {
            fDoubleUp(secondHandDeck);
        }
    })

    split.addEventListener('click', function() {
        if (!secondHandTurn) {
            fSplit(deck);
        }
        else {
            fSplit(secondHandDeck);
        }
    })

    plus10.addEventListener('click', function() {
        bet(10);        
    })
    
    plus100.addEventListener('click', function() {
        bet(100);
    })

    minus10.addEventListener('click', function() {
        bet(-10);
    })

    minus100.addEventListener('click', function() {
        bet(-100);
    })

    const betArray = [plus10, plus100, minus10, minus100];

    function resetBet() {
        canBet = true;        
        for (let index = 0; index < betArray.length; index++) {
            const element = betArray[index];
            element.classList.remove("btn-outline-danger");
            element.classList.add("btn-outline-success");
        }
        totalBet = 0;
        secondHandTotalBet = 0;
        pBet.innerHTML = `Bet: $0`
        pSecondHandBet.innerHTML = ``
        pChips.innerHTML = `Chips: \$${totalChips}`;
        setTimeout(function() {
            if (totalChips < 20) {
                pBegin.innerHTML = `Looks like you're out of chips. Better luck next time!`;
            } 
        }, 2500);
    }

    function fSplit(deck) {
        if (!canSplit) {
            return;
        }
        hasSplit = true;
        canSplit = false;
        secondHandTotalBet = totalBet;
        secondHandDeck = [deck[1]];
        deck.pop(deck[1]);        
        points = sumPoints(deck);
        secondHandPoints = sumPoints(secondHandDeck);
        pCards.innerHTML = `Cards: ${(deck[deck.length - 1])[1]}${((deck[deck.length - 1])[0])[0]}`;
        pSecondHandCards.innerHTML = `Hand 2 cards: ${(secondHandDeck[secondHandDeck.length - 1])[1]}${((secondHandDeck[secondHandDeck.length - 1])[0])[0]}`;
        pPoints.innerHTML = `Points: ${points}`;
        pSecondHandPoints.innerHTML = `Hand 2 points: ${secondHandPoints}`;
        pBet.innerHTML = `Bet: \$${totalBet}`;
        pSecondHandBet.innerHTML = `Second hand bet: \$${secondHandTotalBet}`;

        pBegin.innerHTML = `Choose your option for hand 1.`;
        determineOptions(deck);
    }

    function fDoubleUp(deck) {
        if (!canDoubleUp) {
            return;
        }
        canStand = false;
        canHit = false;
        canDoubleUp = false;
        canSplit = false;
        for (let index = 0; index < allOptionsArray.length; index++) {
            const element = allOptionsArray[index];
            element.classList.remove("btn-outline-success");
            element.classList.add("btn-outline-danger");
        }

        if (!secondHandTurn) {
            deck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
            points = sumPoints(deck);
            pCards.innerHTML += `; ${(deck[deck.length - 1])[1]}${((deck[deck.length - 1])[0])[0]}`;
            pPoints.innerHTML = `Points: ${points}`;
            totalBet += totalBet;
            pBet.innerHTML = `Bet: \$${totalBet}`;
        }
        else {
            secondHandDeck.push(addCardToDeck(secondHandDeck, dealerDeck, spades, clubs, diamonds, hearts));
            secondHandPoints = sumPoints(secondHandDeck);
            pSecondHandCards.innerHTML += `; ${(secondHandDeck[secondHandDeck.length - 1])[1]}${((secondHandDeck[secondHandDeck.length - 1])[0])[0]}`;
            pSecondHandPoints.innerHTML = `Second hand points: ${secondHandPoints}`;
            secondHandTotalBet += secondHandTotalBet;
            pSecondHandBet.innerHTML = `Second hand bet: \$${secondHandTotalBet}`;
        }

        if (!hasSplit) {
            prepareToDeal();
        }
        else {
            if (secondHandTurn) {
                prepareToDeal();
            }
            else {
                pBegin.innerHTML = `Choose your option for hand 2`;
                secondHandTurn = true;
                determineAction(secondHandPoints);
            }
        }                
    }

    function fHit(deck) {
        if (!canHit) {
            return;
        }
        canDoubleUp = false;
        doubleUp.classList.remove("btn-outline-success");
        doubleUp.classList.add("btn-outline-danger");
        canSplit = false;        
        split.classList.remove("btn-outline-success");
        split.classList.add("btn-outline-danger");

        if (!secondHandTurn) {
            deck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
            points = sumPoints(deck);
            pCards.innerHTML += `; ${(deck[deck.length - 1])[1]}${((deck[deck.length - 1])[0])[0]}`;
            pPoints.innerHTML = `Points: ${points}`;
            determineAction(points);
        }
        else {
            secondHandDeck.push(addCardToDeck(secondHandDeck, dealerDeck, spades, clubs, diamonds, hearts));
            secondHandPoints = sumPoints(secondHandDeck);
            pSecondHandCards.innerHTML += `; ${(secondHandDeck[secondHandDeck.length - 1])[1]}${((secondHandDeck[secondHandDeck.length - 1])[0])[0]}`;
            pSecondHandPoints.innerHTML = `Second hand points: ${secondHandPoints}`;        
            determineAction(secondHandPoints);
        }
    }

    function fStand() {
        if (!canStand) {
            return;
        }
        canStand = false;
        canHit = false;
        canDoubleUp = false;
        canSplit = false;        
        for (let index = 0; index < allOptionsArray.length; index++) {
            const element = allOptionsArray[index];            
            element.classList.remove("btn-outline-success");
            element.classList.add("btn-outline-danger");
        }        
        if (!secondHandTurn && hasSplit) {
            pBegin.innerHTML = `Choose your option for hand 2.`;
            secondHandTurn = true;
            determineAction(points);
        }
        else {
            prepareToDeal();
        }
    }

    function determineAction(points) {
        if (!hasSplit && points > 21) { 
            disableAllArrayOptions();
            determineWinner(points, false, totalBet);            
            return;
        }
        if (!hasSplit && points === 21) {
            pBegin.innerHTML = `You got 21.`;
            prepareToDeal();
            return;
        }
        if (!hasSplit && points < 21) {
            determineOptions(deck);
            return;
        }
        if (!secondHandTurn) {
            if (points === 21 || points > 21) {
                if (points > 21) {
                    pBegin.innerHTML = `Hand 1 went bust.`;                
                }
                else if (points === 21) {
                    pBegin.innerHTML = `Hand 1 got 21.`;
                }
                secondHandTurn = true;                
                setTimeout(function() {
                    pBegin.innerHTML =`Choose your option for hand 2.`;
                }, 2000);
                return;
            }
            else {
                determineOptions(deck);
            }
        }
        else {
            if (secondHandPoints === 21 || secondHandPoints > 21) {
                if (secondHandPoints > 21) {
                    pBegin.innerHTML = `Hand 2 went bust.`;                
                }
                else if (secondHandPoints === 21) {
                    pBegin.innerHTML = `Hand 2 got 21.`;
                }
                prepareToDeal();
                return;
            }
            else {
                determineOptions(secondHandDeck);
                secondHandFirstTurn = false;
            }
        }    
    }

    function disableAllArrayOptions() {        
        for (let index = 0; index < allOptionsArray.length; index++) {
            const element = allOptionsArray[index];
            element.classList.remove("btn-outline-success");
            element.classList.add("btn-outline-danger");
        }
        canStand = false;
        canHit = false;
        canSplit = false;
    }

    function bet(betAmount) {
        if ((totalBet + betAmount) < 0 || (totalBet + betAmount > totalChips) || !canBet) {
            return;
        }
        if (totalBet === 0) {
            pBegin.innerHTML = `Click "Begin" to play. Min bet: \$20`;
        }
        totalBet += betAmount;
        pBet.innerHTML = `Bet: \$${totalBet}`;

        if (totalBet >= 20) {            
            begin.classList.remove("btn-outline-danger");
            begin.classList.add("btn-outline-success");
            canBegin = true;
        }
        else {
            begin.classList.remove("btn-outline-success");
            begin.classList.add("btn-outline-danger");
            canBegin = false;
        }
    }

    function reset() {
        if (!canBegin) {
            return;
        }
        dealerTurn = false;
        timeToReset = false;
        blackjack = false;
        dealerBlackjack = false;
        secondHandFirstTurn = true
        secondHandTurn = false;
        hasSplit = false;
        canBet = false;
        pDealerCards.innerHTML = `Dealer's cards: `;
        pDealerPoints.innerHTML = `Dealer's points: `;
        pSecondHandCards.innerHTML = ``;
        pSecondHandPoints.innerHTML = ``;
        pSecondHandBet.innerHTML = ``;
        for (let index = 0; index < betArray.length; index++) {
            const element = betArray[index];
            element.classList.remove("btn-outline-success");
            element.classList.add("btn-outline-danger");
        }
        canBegin = false;
        begin.classList.remove("btn-outline-success");
        begin.classList.add("btn-outline-danger");

        deck = [randomCard(spades, clubs, diamonds, hearts)];
        deck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));        
        pCards.innerHTML = `Cards: ${(deck[0])[1]}${((deck[0])[0][0])}; ${(deck[1])[1]}${((deck[1])[0])[0]}`;
        points = sumPoints(deck);
        pPoints.innerHTML = `Points: ${points}`;

        if (points === 21) {
            pBegin.innerHTML = `Blackjack!`;
            blackjack = true;
            prepareToDeal();
            return;
        }
        else {
            pBegin.innerHTML = `Choose your option.`
            canDoubleUp = true;
            doubleUp.classList.remove("btn-outline-danger");
            doubleUp.classList.add("btn-outline-success");         
        }
        determineOptions(deck);
    }

    function determineOptions(deck) {
        let optionsArray = [stand, hit, split];
        for (let index = 0; index < optionsArray.length; index++) {
            const element = optionsArray[index];
            element.classList.remove("btn-outline-success");
            element.classList.add("btn-outline-danger");
        }        
        canStand = false;
        canHit = false;
        canSplit = false;
        
        if (!hasSplit && totalBet + totalBet <= totalChips && deck.length < 3) {            
            canDoubleUp = true;            
            doubleUp.classList.remove("btn-outline-danger");
            doubleUp.classList.add("btn-outline-success");
        }
        else if (!secondHandTurn && hasSplit) {
            if ((totalBet + totalBet + secondHandTotalBet) <= totalChips && deck.length < 2) {
                canDoubleUp = true;
                doubleUp.classList.remove("btn-outline-danger");
                doubleUp.classList.add("btn-outline-success");
            }
            else {
                canDoubleUp = false;
                doubleUp.classList.remove("btn-outline-success");
                doubleUp.classList.add("btn-outline-danger");
            }
        }
        else if (secondHandTurn) {            
            if ((secondHandTotalBet + secondHandTotalBet + totalBet) <= totalChips && secondHandDeck.length < 2) {
                canDoubleUp = true;
                doubleUp.classList.remove("btn-outline-danger");
                doubleUp.classList.add("btn-outline-success");
            }
            else {
                canDoubleUp = false;
                doubleUp.classList.remove("btn-outline-success");
                doubleUp.classList.add("btn-outline-danger");
            }
        }
        else {
            canDoubleUp = false;
            doubleUp.classList.remove("btn-outline-success");
            doubleUp.classList.add("btn-outline-danger");
        }

        if (!hasSplit) {
            if ((deck[0])[1] === (deck[1])[1]) {
                if ((totalBet + totalBet) <= totalChips) {
                    canSplit = true;                  
                    split.classList.remove("btn-outline-danger");
                    split.classList.add("btn-outline-success");
                }
            }
        }        
        canHit = true;        
        hit.classList.remove("btn-outline-danger");
        hit.classList.add("btn-outline-success");
        canStand = true;        
        stand.classList.remove("btn-outline-danger");
        stand.classList.add("btn-outline-success");
    }

    function sumPoints (deck) {
        let aces = 0;
        let sum = 0;
        for (let index = 0; index < deck.length; index++) {
            const card = (deck[index]);
            if (card[1] === 'J' || card[1] === 'Q' || card[1] === 'K') {
                sum += 10;
            }
            else if (card[1] === 'A') {
                aces++;
                sum += 11;
            }
            else {
                sum += card[1];
            }

            if (sum > 21 && aces >= 1) {
                aces--;
                sum -= 10;
            }
        }
        return sum;
    }

    function addCardToDeck(deck, dealerDeck, set1, set2, set3, set4) {
        let newCard = randomCard(set1, set2, set3, set4);
        let goodCard = false;
        let dealerFirstCard = true;
        
        while (!goodCard) {            
            goodCard = true;
            for (let index = 0; index < deck.length; index++) {
                let element = deck[index];
                if (dealerTurn) {
                    if (!dealerFirstCard) {
                        element = dealerDeck[index];
                        dealerFirstCard = false;
                    }
                }
                if (newCard[0] === element[0] && newCard[1] === element[1]) {
                    goodCard = false;
                    newCard = randomCard(set1, set2, set3, set4);
                }
            }
            
            if (dealerTurn) {
                for (let index = 0; index < dealerDeck.length; index++) {
                    let element = dealerDeck[index];
                    if (dealerTurn) {
                        if (!dealerFirstCard) {
                            element = dealerDeck[index];
                            dealerFirstCard = false;
                        }
                    }
        
                    if (newCard[0] === element[0] && newCard[1] === element[1]) {
                        goodCard = false;
                        newCard = randomCard(set1, set2, set3, set4);                  
                    }
                }
            }
        }
        return newCard;
    }

    function randomCard(set1, set2, set3, set4) {
        let randomNumber = Math.floor(((Math.random()) * 4) + 1)

        if (randomNumber === 1) {
            return ['spades', set1[Math.floor(((Math.random()) * set1.length))]];
        }
        else if (randomNumber === 2) {
            return ['clubs', set2[Math.floor(((Math.random()) * set2.length))]];
        }
        else if (randomNumber === 3) {
            return ['diamonds', set3[Math.floor(((Math.random()) * set3.length))]];
        }
        else if (randomNumber === 4) {
            return ['hearts', set4[Math.floor(((Math.random()) * set4.length))]];
        }
        else {
            return NaN;
        }
    }

    function dealer() {  
        dealerDeck = [];
        dealerDeck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
        dealerDeck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
        dealerPoints = sumPoints(dealerDeck);

        pDealerCards.innerHTML = `Dealer's cards: ${((dealerDeck[0])[1])}${((dealerDeck[0])[0])[0]}; ${((dealerDeck[1])[1])}${((dealerDeck[1])[0])[0]}`;
        pDealerPoints.innerHTML = `Dealer's points: ${dealerPoints}`;

        if (dealerPoints === 21) {
            dealerBlackjack = true;
        }
        else {
            while (dealerPoints < 17) {
                dealerDeck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
                dealerPoints = sumPoints(dealerDeck);
                pDealerCards.innerHTML += `; ${((dealerDeck[dealerDeck.length - 1])[1])}${((dealerDeck[dealerDeck.length - 1])[0])[0]}`;
                pDealerPoints.innerHTML = `Dealer's points: ${dealerPoints}`;
            }
        }
        setTimeout(function() {
            if (!hasSplit) {
                determineWinner(points, blackjack, totalBet);
            }
            else {
                pBegin.innerHTML = `Results for hand 1 are as follow:`;
                determineWinner(points, blackjack, totalBet);
                setTimeout(function() {
                    pBegin.innerHTML = `Results for hand 2 are as follow:`;
                    if (secondHandDeck.length === 2 && secondHandPoints === 21) {
                        determineWinner(secondHandPoints, true, secondHandTotalBet);
                    }
                    else {
                        determineWinner(secondHandPoints, false, secondHandTotalBet);
                    }
                }, 2000);
            }
        }, 2000);
    }

    function determineWinner(points, blackjack, totalBet) {        
        if (points > 21) {
            giveOrTake(false, false, true, false, totalBet, false);
        }
        else if (blackjack && !dealerBlackjack) {
            giveOrTake(true, true, false, false, totalBet, false);
        }
        else if (!blackjack && dealerBlackjack) {
            giveOrTake(false, false, false, false, totalBet, true);
        }
        else if (blackjack && dealerBlackjack) {
            giveOrTake(false, false, false, true, totalBet, true);
        }        
        else if (points === dealerPoints) {
            giveOrTake(false, false, false, true, totalBet, false);
        }
        else if (points <= 21 && dealerPoints > 21) {
            giveOrTake(true, false, false, false, totalBet, false);
        }
        else if (points > dealerPoints) { //Code does not reach if player has gone bust.
            giveOrTake(true, false, false, false, totalBet, false);
        }
        else {
            giveOrTake(false, false, false, false, totalBet, false);
        }
    }

    function giveOrTake(playerWon, wonWithBlackjack, bust, push, totalBet, dealerHasBlackjack) {        
        if (playerWon && wonWithBlackjack) {
            pBegin.innerHTML = `You bet \$${totalBet} and win with Blackjack, so you win \$${totalBet * 2.5}!`;
            totalChips += totalBet * 2.5;
        }
        else if (dealerHasBlackjack) {
            pBegin.innerHTML = `You bet \$${totalBet} but the dealer got Blackjack, so you lose \$${totalBet}.`;
            totalChips -= totalBet;
        }        
        else if (playerWon) {
            pBegin.innerHTML = `You bet \$${totalBet} and win without Blackjack, so you win \$${totalBet * 2}.`;
            totalChips += totalBet;
        }
        else if (bust) {
            pBegin.innerHTML = `You bet \$${totalBet} and went bust, so you lose \$${totalBet}.`;
            totalChips -= totalBet;
        }
        else if (push) {
            pBegin.innerHTML = `You bet \$${totalBet} and the dealer got the same score, so you win back \$${totalBet}.`
        }
        else {
            pBegin.innerHTML = `You bet \$${totalBet} but the dealer wins, so you lose \$${totalBet}.`;
            totalChips -= totalBet;
        }
        if (hasSplit) {
            if (timeToReset) {
                resetBet();
            }
            else {
                timeToReset = true;
            }
        }
        else {
            resetBet();
        }
    }
    
    function prepareToDeal() {
        disableAllArrayOptions();
        pBegin.innerHTML = `Now, it's the dealer's turn.`;
        dealerTurn = true;
        setTimeout(function() {
            dealer();
        }, 2000);
    }


    registerServiceWorker();
}