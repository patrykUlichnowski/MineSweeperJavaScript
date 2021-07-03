/* 

    AKTUALNIE sprawdzSasiadow2() oraz drawBomby() nic nie robia ale zostaly narazie w kodzie jakby co

    trzeba zrobic cos takiego ze bierze sie dlugosc rzedu i podaje id bloku do funkcji ktora bedzie zwracala
    w ktorym rzedzie lezy aby moc przerobic te ulomne ify z liczbami

*/
window.addEventListener("contextmenu", e => e.preventDefault()); //usuwa content menu
let blocks = document.querySelectorAll('#square');
let columns = Math.sqrt(blocks.length); //! jezeli to bedzie podawane przez gracza to musi byc to zmienione jesli plansza moze byc protokatna
let rows = blocks.length / columns; //! to tez
let blocksLength = blocks.length;
let bombs = new Array();//bombs ma indeksy kafelek z bombami
let amount = 0;
let bombsLeft = 15;
let toDraw = [[], []];
let timer; // Musze to zadeklarowac aby nadac zmienna intervalowi by potem to wyczyscic
let lock = false; //Oczywiscie kurwa musza sie nasluchiwacze nalozyc
let whichToShow = [];
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
    SeeEmpty(event.target.blockID);
    //sprawdzSasiadow2(event.target.blockID);
    // CheckEmpty(event.target.blockID);
}
function CreateBombs(clicked) {
    let blockToCheck = Number(clicked);
    let whichRow = RowNumber(clicked);
    // petla losujaca pozycje bomb
    while (bombs.length < 15) {
        let randomBlock = Math.floor(Math.random() * blocksLength)
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
            if (blockToCheck == (columns - 1) + (columns * whichRow)) {
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
    // ! sprawdza zawartosc bloku i dodaje mu wartosc
    for (let i = 0; i < blocksLength; i++) {
        let inBombsArray = false;
        for (let j = 0; j < bombs.length; j++) {
            if (i == bombs[j]) {
                inBombsArray = true;
                blocks[i].blockValue = 'bomb';
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
                    if (i - columns == bombs[j] || i - (columns - 1) == bombs[j] || i + 1 == bombs[j] || i + columns == bombs[j] || i + (columns + 1) == bombs[j]) {
                        bombsAmount += 1;
                    }
                }
                else {
                    let whichRow = RowNumber(i);
                    // prawa ściana
                    if (i == (columns - 1) + (columns * whichRow)) {
                        if (i - (columns + 1) == bombs[j] || i - columns == bombs[j] || i - 1 == bombs[j] || i + (columns - 1) == bombs[j] || i + columns == bombs[j]) {
                            bombsAmount += 1;
                        }
                    }
                    //reszta
                    else {
                        if (i - (columns + 1) == bombs[j] || i - columns == bombs[j] || i - (columns - 1) == bombs[j] || i - 1 == bombs[j] ||
                            i + 1 == bombs[j] || i + (columns - 1) == bombs[j] || i + columns == bombs[j] || i + (columns + 1) == bombs[j]) {
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
            blocks[i].blockValue = 'bomb';
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
function Flag() {
    var clicked = event.target.blockID;
    blocks[clicked].innerHTML = "<img src=\"grafika/flaga.png\">";
}
function EmptyArray() {
    let eptBlocks = [];
    for (let i = 0; i < blocksLength; i++) {
        if (blocks[i].blockValue == 'empty') {
            eptBlocks.push(i);
        }
    }
    return eptBlocks;
}
function SeeEmpty(toCheck) {
    let whichRow = RowNumber(toCheck);
    let toSend = toCheck
    // tutaj przyjmuje ktory blok zostal wybrany; tworzy array pustych kafelkow
    // ! poniżej ostra jazda bez trzymanki
    if (blocks[toCheck].blockValue == 'empty') {
        CheckRow(toCheck);
        for (let i = whichRow - 1; whichRow > 0; i--) {
            //wywolac funkcje ktora sprawdzi rzad wyzej
            toSend = toSend - columns * i;
            for (let j = 0; j < whichToShow.length; j++) {
                let index = whichToShow[j] - columns;
                if (blocks[index] == 'empty') {
                    CheckRow(toSend);
                }
            }
        }
        for (let i = whichRow + 1; whichRow < rows; i++) {
            //wywolac funkcje ktora sprawdzi rzad nizej
            toSend = toSend + columns * i;
            for (let j = 0; j < whichToShow.length; j++) {
                let index = whichToShow[j] + columns;
                if (blocks[index] == 'empty') {
                    CheckRow(toSend);
                }
            }
        }
    }
}
function CheckRow(clickedBlock) {
    let whichRow = RowNumber(clickedBlock);
    let index = clickedBlock - (whichRow * columns); //aktualnie od 0 do 9
    let repeats = false
    for (let i = 0; i < whichToShow.length; i++) {
        if (clickedBlock == whichToShow[i]) {
            repeats = true;
        }
    }
    if (repeats === false) {
        whichToShow.push(clickedBlock);
        if (index !== 0) {
            for (let i = 1; i < index; i++) {
                if (blocks[clickedBlock - i].blockValue == 'empty') {
                    whichToShow.push(clickedBlock - i);
                }
                else {
                    break;
                }
            }
        }
        if (index !== columns) {
            for (let i = 1; i < columns - index; i++) {
                if (blocks[clickedBlock + i].blockValue == 'empty') {
                    whichToShow.push(clickedBlock + i);
                }
                else {
                    break;
                }
            }
        }
    }
    console.log(index);
    console.log(clickedBlock);
    console.table(whichToShow);
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