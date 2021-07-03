/* 

    AKTUALNIE sprawdzSasiadow2() oraz drawBomby() nic nie robia ale zostaly narazie w kodzie jakby co

    trzeba zrobic cos takiego ze bierze sie dlugosc rzedu i podaje id bloku do funkcji ktora bedzie zwracala
    w ktorym rzedzie lezy aby moc przerobic te ulomne ify z liczbami

*/
let blocks = document.querySelectorAll('#square');
let columns = Math.sqrt(blocks.length);
let rows = blocks.length / columns
let bombsLength = blocks.length;
let bombs = new Array();//bombs ma indeksy kafelek z bombami
let amount = 0;
let bombsLeft = 15;
let toDraw = [[], []];
let timer; // Musze to zadeklarowac aby nadac zmienna intervalowi by potem to wyczyscic
let lock = false; //Oczywiscie kurwa musza sie nasluchiwacze nalozyc
function Counter() {
    const timeDisplay = document.querySelector('#czas');
    let time = Number(0);
    if (lock === false) {
        timer = setInterval(() => {
            time++
            timeDisplay.innerHTML = `<img src="grafika/clock.svg" alt="">${time}`
            lock = true;
        }, 1000);
    }
}
function WonGame() {
    //Sraken pierdaken jak zrobisz funkcje po wygraniu gry to dodaj to co jest pod tym
    clearInterval(timer);
}
function AddListeners() {
    for (var i = 0; i < blocks.length; i++) {
        document.getElementById('ilebomb').innerHTML = '<img src="grafika/bomba.png"> left: ' + String(bombsLeft);
        blocks[i].addEventListener("click", LeftClick);
        blocks[i].addEventListener("contextmenu", Flag);
        blocks[i].blockID = i;
    }
}
function LeftClick() {
    var clicked = event.target.blockID
    blocks[clicked].removeEventListener('contextmenu', Flag)
    CreateBombs(event.target.blockID);
    Counter(); // Tutaj zaczyna sie odliczanie czasu
    CheckInside();
    ShowContent(event.target.blockID);
    //sprawdzSasiadow2(event.target.blockID);
    // CheckEmpty(event.target.blockID);
}
function CreateBombs(clicked) {
    let blockToCheck = Number(clicked);
    let whichRow = RowNumber(clicked);
    // petla losujaca pozycje bomb
    while (bombs.length < 15) {
        let randomBlock = Math.floor(Math.random() * bombsLength)
        //lewa czesc
        if (blockToCheck == 0 || blockToCheck % columns == 0) {
            if (randomBlock != blockToCheck && randomBlock != blockToCheck + 1 && randomBlock != blockToCheck - columns
                && randomBlock != blockToCheck - (columns - 1) && randomBlock != blockToCheck + columns && randomBlock != blockToCheck + (columns + 1)) {
                let repeating = false;
                if (amount == 0) {
                    bombs[amount] = randomBlock;
                    amount += 1;
                }
                else {
                    for (var j = 0; j < bombs.length; j++) {
                        if (Number(bombs[j]) == Number(randomBlock)) {
                            repeating = true;
                        }
                    }
                    if (repeating == true) {
                        continue
                    }
                    else {
                        bombs[amount] = randomBlock;
                        amount += 1;
                    }
                }
            }
            else {
                continue;
            }
        }
        //prawa czesc
        else {
            if (blockToCheck == 9 + (10 * whichRow)) {
                if (randomBlock != blockToCheck && randomBlock != blockToCheck - 1 && randomBlock != blockToCheck - columns
                    && randomBlock != blockToCheck - (columns + 1) && randomBlock != blockToCheck + columns && randomBlock != blockToCheck + (columns - 1)) {
                    let repeating = false;
                    if (amount == 0) {
                        bombs[amount] = randomBlock;
                        amount += 1;
                    }
                    else {
                        for (var j = 0; j < bombs.length; j++) {
                            if (Number(bombs[j]) == Number(randomBlock)) {
                                repeating = true;
                            }
                        }
                        if (repeating == true) {
                            continue
                        }
                        else {
                            bombs[amount] = randomBlock;
                            amount += 1;
                        }
                    }
                }
                else {
                    continue;
                }
            }
            // reszta przypadkow
            else {
                if (randomBlock != blockToCheck && randomBlock != blockToCheck - 1 && randomBlock != blockToCheck + 1 && randomBlock != blockToCheck - columns
                    && randomBlock != blockToCheck - (columns - 1) && randomBlock != blockToCheck - (columns + 1) && randomBlock != blockToCheck + columns
                    && randomBlock != blockToCheck + (columns - 1) && randomBlock != blockToCheck + (columns + 1)) {
                    let repeating = false;
                    if (amount == 0) {
                        bombs[amount] = randomBlock;
                        amount += 1;
                    }
                    else {
                        for (var j = 0; j < bombs.length; j++) {
                            if (Number(bombs[j]) == Number(randomBlock)) {
                                repeating = true;
                            }
                        }
                        if (repeating == true) {
                            continue
                        }
                        else {
                            bombs[amount] = randomBlock;
                            amount += 1;
                        }
                    }
                }
                else {
                    continue;
                }
            }
        }
    }
    // petla nanoszaca grafiki
    //drawBomby();
}
function CheckInside() {
    // tutaj zamiast i trzeba bedzie przyjmowac parametr ktorym bedzie indeks kliknietego kafelka
    for (let i = 0; i < bombsLength; i++) {
        let inBombsArray = false;
        for (let j = 0; j < bombs.length; j++) {
            if (i == bombs[j]) {
                inBombsArray = true;
                blocks[i].blockValue = 'bomba';
            }
            else {
                continue;
            }
        }
        if (inBombsArray == false) {
            let bombsAmount = 0
            for (let j = 0; j < bombs.length; j++) {
                //lewa ściana
                if (i == 0 || i % 10 == 0) {
                    if (i - 10 == bombs[j] || i - 9 == bombs[j] || i + 1 == bombs[j] || i + 10 == bombs[j] || i + 11 == bombs[j]) {
                        bombsAmount += 1;
                    }
                }
                else {
                    // prawa ściana
                    if (i == 9 || i == 19 || i == 29 || i == 39 || i == 49 || i == 59 || i == 69 || i == 79 || i == 89 || i == 99) {
                        if (i - 11 == bombs[j] || i - 10 == bombs[j] || i - 1 == bombs[j] || i + 9 == bombs[j] || i + 10 == bombs[j]) {
                            bombsAmount += 1;
                        }
                    }
                    //reszta
                    else {
                        if (i - 11 == bombs[j] || i - 10 == bombs[j] || i - 9 == bombs[j] || i - 1 == bombs[j] ||
                            i + 1 == bombs[j] || i + 9 == bombs[j] || i + 10 == bombs[j] || i + 11 == bombs[j]) {
                            bombsAmount += 1;
                        }
                    }
                }
                if (bombsAmount > 0) {
                    blocks[i].blockValue = String(bombsAmount);
                }
                else {
                    blocks[i].blockValue = 'empty';
                }
            }
        }
        else {
            blocks[i].blockValue = 'bomba';
        }
    }
    //console.log(blocks.blockValue)
}
function ShowContent(block) {
    // tutaj zamiast i trzeba bedzie przyjmowac parametr ktorym bedzie indeks kliknietego kafelka
    var checked = Number(block); // id kafelka wywolujacego cos tam
    let inBombArray = false
    blocks[checked].style.backgroundColor = "grey";
    for (let j = 0; j < bombs.length; j++) {
        if (checked == bombs[j]) {
            inBombArray = true;
        }
        else {
            continue;
        }
    }
    if (inBombArray == false) {
        let bombsAmount = Number(blocks[checked].blockValue);
        if (bombsAmount > 0) {
            blocks[checked].innerHTML = bombsAmount;
            switch (bombsAmount) {
                case 1:
                    blocks[checked].style.color = "blue";
                    break;
                case 2:
                    blocks[checked].style.color = "green";
                    break;
                case 3:
                    blocks[checked].style.color = "red";
                    break;
                case 4:
                    blocks[checked].style.color = "purple";
                    break;
                case 5:
                    blocks[checked].style.color = "orange";
                    break;
                case 6:
                    blocks[checked].style.color = "pink";
                    break;
                case 7:
                    blocks[checked].style.color = "yellow";
                    break;
                case 8:
                    blocks[checked].style.color = "brown";
                    break;
            }
        }
        else {
            blocks[checked].style.backgroundColor = "grey";
        }
    }
    else {
        blocks[checked].innerHTML = "<img src=\"grafika/bomba.png\">";
        GameOver();
    }
}
function GameOver() {
    alert("Game over!");
    location.reload();
}
function RowNumber(blockNumber) {
    return parseInt(blockNumber / rows);
}
function CheckEmpty(checkBlock) {
    //Lewo prawo z tablicy sprawdza gora dol
    // petla dodaje do tablicy
    // potem petla sprawda -10 kazdy element a jak nie to +10
    // jesli nie to wyswietla
    // trzeba bedzie zrobic funkcje co po dlugosci arraya bedzie go wyswietlac przez odslonKafelek() 
    // [+-1 zeby tez te z cyframi kolo pustych sie pokazaly]
    //------------------------------------------UPDATE 04/06/2021
    // WSZYSTKO PONIZEJ DZIALA

    // let cos = RowNumber(whichOne);
    // console.log(cos);
    // if (whichOne <= 9) {
    //     whichRow = 0;
    // }
    // else if (whichRow <= 19) {
    //     whichRow = 1;
    // }
    // else if (whichRow <= 29) {
    //     whichRow = 2;
    // }
    // else if (whichRow <= 39) {
    //     whichRow = 3;
    // }
    // else if (whichRow <= 49) {
    //     whichRow = 4;
    // }
    // else if (whichRow <= 59) {
    //     whichRow = 5;
    // }
    // else if (whichRow <= 69) {
    //     whichRow = 6;
    // }
    // else if (whichRow <= 79) {
    //     whichRow = 7;
    // }
    // else if (whichRow <= 89) {
    //     whichRow = 8;
    // }
    // else if (whichRow <= 99) {
    //     whichRow = 9;
    // }
    let whichOne = checkBlock;
    let whichRow = RowNumber(whichOne);
    if (toDraw[whichRow].length == 0) {
        toDraw[whichRow].push(whichOne);
    }
    for (let i = 0; i < 10; i++) {
        whichOne -= 1;
        // if (whichOne < 0 || whichOne == 9 || whichOne == 19 || whichOne == 29 || whichOne == 39 || whichOne == 49 || whichOne == 59 ||
        //     whichOne == 69 || whichOne == 79 || whichOne == 89) {
        if (whichOne < 0 || whichOne == (9 + 10 * whichRow)) {//zeby w lewo nie wyszlo
            break;
        }
        else {
            if (blocks[whichOne].blockValue == "empty") {
                let isInTheRow = false
                for (let j = 0; j < toDraw[whichRow].length; j++) {
                    if (whichOne == toDraw[whichRow][j]) {
                        isInTheRow = true;
                    }
                }
                if (isInTheRow == false) {
                    toDraw[whichRow].push(whichOne);
                }
                else {
                    continue;
                }
            }
            else {
                break;
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        whichOne += 1;
        if (whichOne > 99 || whichOne == (whichRow * 10 + 10)) { //zeby w prawo nie wyszlo
            break;
        }
        else {
            if (blocks[whichOne].blockValue == "empty") {
                let wystepujewRzedzie = false
                for (let j = 0; j < toDraw[whichRow].length; j++) {
                    if (whichOne == toDraw[whichRow][j]) {
                        wystepujewRzedzie = true;
                    }
                }
                if (wystepujewRzedzie == false) {
                    toDraw[whichRow].push(whichOne);
                }
                else {
                    continue;
                }
            }
            else {
                break;
            }
        }
    }
    let callUp = true //czy ma sie wykonac gorna petla
    let callDown = true
    if (whichRow == 0) {
        callUp = false
    }
    if (whichRow == 9) {
        callDown = false
    }
    if (callUp == true) {
        for (let i = 0; i < toDraw[whichRow]; i++) {
            let choosed = Number(toDraw[whichRow][i]);
            if (blocks[Number(choosed - 10)].blockValue == "empty") {
                //console.log('HUJ');
                //console.log(blocks[Number(choosed - 10)].blockValue);
                CheckEmpty(Number(choosed - 10));
            }
            else {
                //console.log(blocks[Number(choosed - 10)].blockValue);
            }
        }
    }
    /*
    to gowno do gory nie dziala ale mozna byloby to inaczej zrobic, stworzyc tablice z wszystkimi pustymi polami a nastepnie przekazywac do funkcji
    ja oraz nacisniety kafelek po czym z tej pustej tablicy sprawdzac -1 +1 -10 +10
    */
}
function Flag() {
    var clicked = event.target.blockID;
    blocks[clicked].innerHTML = "<img src=\"grafika/flaga.png\">";
}
// ! nieuzywane funkcje
function sprawdzSasiadow2(parametr) {
    // tutaj zamiast i trzeba bedzie przyjmowac parametr ktorym bedzie indeks kliknietego kafelka
    var sprawdzany = Number(parametr); // id kafelka wywolujacego cos tam
    let nalezyDoBomb = false
    for (let j = 0; j < bombs.length; j++) {
        if (sprawdzany == bombs[j]) {
            nalezyDoBomb = true;
        }
        else {
            continue;
        }
    }
    if (nalezyDoBomb == false) {
        let ileBomb = 0
        for (let j = 0; j < bombs.length; j++) {
            //lewa ścsprawdzanyana
            if (sprawdzany == 0 || sprawdzany == 10 || sprawdzany == 20 || sprawdzany == 30 || sprawdzany == 40 || sprawdzany == 50 || sprawdzany == 60 || sprawdzany == 70 || sprawdzany == 80 || sprawdzany == 90) {
                if (sprawdzany - 10 == bombs[j] || sprawdzany - 9 == bombs[j] || sprawdzany + 1 == bombs[j] || sprawdzany + 10 == bombs[j] || sprawdzany + 11 == bombs[j]) {
                    ileBomb += 1;
                }
            }
            else {
                // prawa ścsprawdzanyana
                if (sprawdzany == 9 || sprawdzany == 19 || sprawdzany == 29 || sprawdzany == 39 || sprawdzany == 49 || sprawdzany == 59 || sprawdzany == 69 || sprawdzany == 79 || sprawdzany == 89 || sprawdzany == 99) {
                    if (sprawdzany - 11 == bombs[j] || sprawdzany - 10 == bombs[j] || sprawdzany - 1 == bombs[j] || sprawdzany + 9 == bombs[j] || sprawdzany + 10 == bombs[j]) {
                        ileBomb += 1;
                    }
                }
                //reszta
                else {
                    if (sprawdzany - 11 == bombs[j] || sprawdzany - 10 == bombs[j] || sprawdzany - 9 == bombs[j] || sprawdzany - 1 == bombs[j] ||
                        sprawdzany + 1 == bombs[j] || sprawdzany + 9 == bombs[j] || sprawdzany + 10 == bombs[j] || sprawdzany + 11 == bombs[j]) {
                        ileBomb += 1;
                    }
                }
            }
            if (ileBomb > 0) {
                blocks[sprawdzany].innerHTML = ileBomb;
                switch (ileBomb) {
                    case 1:
                        blocks[sprawdzany].style.color = "blue";
                        break;
                    case 2:
                        blocks[sprawdzany].style.color = "green";
                        break;
                    case 3:
                        blocks[sprawdzany].style.color = "red";
                        break;
                    case 4:
                        blocks[sprawdzany].style.color = "purple";
                        break;
                    case 5:
                        blocks[sprawdzany].style.color = "orange";
                        break;
                }
            }
            else {
                continue
            }
        }
    }
    else {
        blocks[sprawdzany].innerHTML = "<img src=\"grafika/bomba.png\">";
        GameOver();
    }
}
function drawBomby() {
    for (let i = 0; i < bombs.length; i++) {
        let wartosc = bombs[i];
        blocks[wartosc].innerHTML = "<img src=\"grafika/bomba.png\">";
    }
}