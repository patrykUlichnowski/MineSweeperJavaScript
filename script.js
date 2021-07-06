window.addEventListener("contextmenu", e => e.preventDefault()); //usuwa content menu
let blocks = document.querySelectorAll('#square');
let columns = Math.sqrt(blocks.length); //! jezeli to bedzie podawane przez gracza to musi byc to zmienione jesli plansza moze byc protokatna
let rows = blocks.length / columns; //! to tez
let blocksLength = blocks.length;
let bombs = new Array();//bombs ma indeksy kafelek z bombami
let amount = 0; //ile bomb wygenerowalo
let bombsLeft = 15;
let timer; // Musze to zadeklarowac aby nadac zmienna intervalowi by potem to wyczyscic
let lock = false; //Oczywiscie kurwa musza sie nasluchiwacze nalozyc
let whichToShow = [[], []];
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
    document.getElementById('ilebomb').innerHTML = '<img src="grafika/bomba.png"> left: ' + String(bombsLeft);
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].blockID = i;
        blocks[i].addEventListener("click", LeftClick);
        blocks[i].addEventListener("contextmenu", RightClick);
        blocks[i].isOpen = false;
        blocks[i].flagged = false;
    }
}
function LeftClick() {
    var clicked = event.target.blockID
    blocks[clicked].removeEventListener('contextmenu', RightClick)
    CreateBombs(event.target.blockID);
    Counter(); // Tutaj zaczyna sie odliczanie czasu
    CheckInside();
    if (event.target.blockValue != 'empty' && event.target.isOpen == false) {
        ShowContent(event.target.blockID);
    }
    else if (event.target.blockValue == 'empty' && event.target.isOpen == false) { ShowEmptyArround(event.target.blockID) }
}
function RightClick() {
    var clicked = event.target.blockID
    if (blocks[clicked].flagged === false) {
        blocks[clicked].removeEventListener('click', LeftClick)
        Flag()
    }
    else {
        blocks[clicked].addEventListener('click', LeftClick)
        RemoveFlag()
    }
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
function ShowEmptyArround(clickedBlock) {
    CheckNeighbourhood(clickedBlock);
    ShowContent(clickedBlock);
    CheckForCorners();
    console.log('wykonano');
}
function CheckNeighbourhood(toCheck) {
    // ! POD ZADNYM KURWA POZOREM TEGO NIE RUSZAC
    let clicked = toCheck;
    let row = RowNumber(clicked);
    if (clicked == columns * row) { //lewa strona; jezeli rowna sie 10,20,30...
        if (clicked == 0) { // lewy gorny rog
            if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false) {//pod blokiem
                ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
            }
            else {
                ShowContent(clicked + columns);
            }
            if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //prawo od bloku
                ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
            }
            else {
                ShowContent(clicked + 1);
            }
        }
        else {
            if (clicked == (rows * columns) - columns) { //lewy dolny rog
                if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //prawo od bloku
                    ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
                }
                else {
                    ShowContent(clicked + 1);
                }
                if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) { //nad blokiem
                    ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
                }
                else {
                    ShowContent(clicked - columns);
                }
            }
            else { //reszta po lewej
                if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //prawo od bloku
                    ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
                }
                else {
                    ShowContent(clicked + 1);
                }
                if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) { //nad blokiem
                    ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
                }
                else {
                    ShowContent(clicked - columns);
                }
                if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false) {//pod blokiem
                    ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
                }
                else {
                    ShowContent(clicked + columns);
                }
            }
        }
    }
    else if (clicked == (columns * (row + 1)) - 1) {//prawa strona
        if (clicked == columns - 1) { //prawy gorny rog
            if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false) {//pod blokiem
                ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
            }
            else {
                ShowContent(clicked + columns);
            }
            if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
                ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
            }
            else {
                ShowContent(clicked - 1);
            }
        }
        else {
            if (clicked == columns * rows - 1) { //prawy dolny rog
                if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
                    ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
                }
                else {
                    ShowContent(clicked - 1);
                }
                if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) { //nad blokiem
                    ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
                }
                else {
                    ShowContent(clicked - columns);
                }
            }
            else {
                if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
                    ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
                }
                else {
                    ShowContent(clicked - 1);
                }
                if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) { //nad blokiem
                    ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
                }
                else {
                    ShowContent(clicked - columns);
                }
                if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false) {//pod blokiem
                    ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
                }
                else {
                    ShowContent(clicked + columns);
                }
            }
        }
    }
    else if (clicked < columns) { //gorny rzad
        if (clicked == 0) { // lewy gorny rog
            if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false && clicked != (rows * columns) - columns) {//pod blokiem
                ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
            }
            else { ShowContent(clicked + columns); }
            if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //prawo od bloku
                ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
            }
            else { ShowContent(clicked + 1); }
        }
        else {
            if (clicked == columns - 1) { //prawy gorny rog
                if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
                    ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
                }
                else { ShowContent(clicked - 1); }
                if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false) {//pod blokiem
                    ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
                }
                else { ShowContent(clicked + columns); }
            }
            else {//srodek
                if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
                    ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
                }
                else { ShowContent(clicked - 1); }
                if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //po prawej
                    ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
                }
                else { ShowContent(clicked + 1); }
                if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false) {//pod blokiem
                    ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
                }
                else { ShowContent(clicked + columns); }
            }
        }
    }
    else if (clicked <= (columns * rows) - 1 && clicked >= (columns * rows) - columns) { //dolny rzad
        if (clicked == (rows * columns) - columns) { //lewy dolny rog
            if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //prawo od bloku
                ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
            }
            else { ShowContent(clicked + 1); }
            if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) { //nad blokiem
                ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
            }
            else { ShowContent(clicked - columns); }
        }
        else {
            if (clicked == columns * rows - 1) { //prawy dolny rog
                if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
                    ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
                }
                else { ShowContent(clicked - 1); }
                if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) { //nad blokiem
                    ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
                }
                else { ShowContent(clicked - columns); }
            }
            else {
                if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
                    ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
                }
                else { ShowContent(clicked - 1); }
                if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //po prawej
                    ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
                }
                else { ShowContent(clicked + 1); }
                if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) {//nad blokiem
                    ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
                }
                else { ShowContent(clicked - columns); }
            }
        }
    }
    else {
        if (blocks[clicked - 1].blockValue == 'empty' && blocks[clicked - 1].isOpen == false) {//lewo od bloku
            ShowContent(clicked - 1); CheckNeighbourhood(clicked - 1);
        }
        else { ShowContent(clicked - 1); }
        if (blocks[clicked - columns].blockValue == 'empty' && blocks[clicked - columns].isOpen == false) {//lewo od bloku
            ShowContent(clicked - columns); CheckNeighbourhood(clicked - columns);
        }
        else { ShowContent(clicked - columns); }
        if (blocks[clicked + 1].blockValue == 'empty' && blocks[clicked + 1].isOpen == false) { //po prawej
            ShowContent(clicked + 1); CheckNeighbourhood(clicked + 1);
        }
        else { ShowContent(clicked + 1); }
        if (blocks[clicked + columns].blockValue == 'empty' && blocks[clicked + columns].isOpen == false) {//nad blokiem
            ShowContent(clicked + columns); CheckNeighbourhood(clicked + columns);
        }
        else { ShowContent(clicked + columns); }
    }
}
function ShowContent(block) {
    // tutaj zamiast i trzeba bedzie przyjmowac parametr ktorym bedzie indeks kliknietego kafelka
    if (blocks[block].isOpen == false) {
        var checked = Number(block); // id kafelka wywolujacego cos tam
        let inBombArray = false
        blocks[checked].style.backgroundColor = "grey";
        blocks[checked].removeEventListener('contextmenu', RightClick)
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
                blocks[block].isOpen = true;
            }
            else {
                blocks[checked].style.backgroundColor = "grey";
                blocks[block].isOpen = true;
                // ShowEmptyArround(checked);
            }
        }
        else {
            blocks[checked].innerHTML = "<img src=\"grafika/bomba.png\">";
            blocks[block].isOpen = true;
            GameOver();
        }
    }
}
function GameOver() {
    alert("Game over!");
    location.reload();
}
function Restart() {
    location.reload();
}
function RowNumber(blockNumber) {
    return parseInt(blockNumber / rows);
}
function Flag() {
    var clicked = event.target.blockID;
    console.log(clicked);
    console.log('a');
    blocks[clicked].style.backgroundColor = "green";
    blocks[clicked].flagged = true;
}
function RemoveFlag() {
    var clicked = event.target.blockID;
    blocks[clicked].innerHTML = "";
    console.log('b');
    blocks[clicked].style.backgroundColor = "rgb(54, 54, 54)";
    blocks[clicked].flagged = false;
}
//! a jakby tak napisac funkcje ktora wezmie se klocka i sprawdzi czy ktorys z jego rogow nie jest pusty?
function CheckForCorners() {
    for (let i = 0; i < blocksLength; i++) {
        let checked = blocks[i].blockID; // bedzie sprawdzane od razu dla kazdego ktory nie jest pusty i jest nie otwarty
        if (blocks[checked].blockValue != 'empty' && blocks[checked].blockValue != 'bomb' && blocks[checked].isOpen == false) { //zeby tylko dla pelnych i nieotwartych
            let row = RowNumber(checked);
            //LEWA STRONA
            if (checked == columns * row) {
                // if (checked == 0) {
                //     continue;
                // }
                // else if (clicked == (rows * columns) - columns) {
                //     continue;
                // }
                // else if (blocks[checked + 1].blockValue != 'empty' &&
                //     blocks[checked - columns].blockValue != 'empty' && blocks[checked + columns].blockValue != 'empty') { //sprawdza czy ma pelnych sasiadow
                //     if (blocks[checked - columns - 1].isOpen == true || blocks[checked - columns + 1].isOpen == true ||
                //         blocks[checked - columns - 1].isOpen == true || blocks[checked + columns + 1].isOpen == true) {//sprawdza po skosach czy sa otwarte
                //         ShowContent(checked);
                //     }
                // }
                continue
            }
            //PRAWA STRONA
            else if (checked == (columns * (row + 1)) - 1) {
                continue
            }
            //GORA
            else if (checked < columns) {
                continue
            }
            // DÓŁ
            else if (checked <= (columns * rows) - 1 && checked >= (columns * rows) - columns) {
                continue
            }
            //to dziala tylko dla srodkowych wartosci
            // else if (blocks[checked - 1].blockValue != 'empty' && blocks[checked + 1].blockValue != 'empty' &&
            //     blocks[checked - columns].blockValue != 'empty' && blocks[checked + columns].blockValue != 'empty') { //sprawdza czy ma pelnych sasiadow
            //     if ((blocks[checked - columns - 1].isOpen == true && blocks[checked - columns - 1].blockValue == 'empty')
            //         || (blocks[checked - columns + 1].isOpen == true && blocks[checked - columns + 1].blockValue == 'empty')
            //         || (blocks[checked + columns - 1].isOpen == true && blocks[checked + columns - 1].blockValue == 'empty')
            //         || (blocks[checked + columns + 1].isOpen == true && blocks[checked + columns + 1].blockValue == 'empty')) {//sprawdza po skosach czy sa otwarte
            //         ShowContent(checked);
            //     }
            // }
            else if ((blocks[checked - columns - 1].isOpen == true && blocks[checked - columns - 1].blockValue == 'empty')
                || (blocks[checked - columns + 1].isOpen == true && blocks[checked - columns + 1].blockValue == 'empty')
                || (blocks[checked + columns - 1].isOpen == true && blocks[checked + columns - 1].blockValue == 'empty')
                || (blocks[checked + columns + 1].isOpen == true && blocks[checked + columns + 1].blockValue == 'empty')) {//sprawdza po skosach czy sa otwarte
                ShowContent(checked);
            }
        }
    }
}