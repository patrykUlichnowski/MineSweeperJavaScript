/* 

    AKTUALNIE sprawdzSasiadow2() oraz drawBomby() nic nie robia ale zostaly narazie w kodzie jakby co

*/
let kafelki = document.querySelectorAll('#square')
let dlugosc = kafelki.length;
//bombs ma indeksy kafelek z bombami
let bombs = new Array();
let ilosc = 0;
let BombsLeft = 15;
function dodajListenery() {
    for (var i = 0; i < kafelki.length; i++) {
        document.getElementById('ilebomb').innerHTML = 'Bombs left: ' + String(BombsLeft);
        kafelki[i].addEventListener("click", kliknijKafelek);
        kafelki[i].addEventListener("contextmenu", flag);
        kafelki[i].identyfikator = i;
    }
}
function kliknijKafelek() {
    var ktory = event.target.identyfikator
    kafelki[ktory].style.backgroundColor = "grey";
    kafelki[ktory].removeEventListener('contextmenu', flag)
    createBombs(event.target.identyfikator);
    sprawdzSasiadow();
    odslonKafelek(event.target.identyfikator);
    //sprawdzSasiadow2(event.target.identyfikator);
    sprawdzPuste(event.target.identyfikator);
}
function createBombs(parametr) {
    let ktory = Number(parametr);
    // petla losujaca pozycje bomb
    while (bombs.length < 15) {
        let losowa = Math.floor(Math.random() * dlugosc)
        //lewa czesc
        if (ktory == 0 || ktory == 10 || ktory == 20 || ktory == 30 || ktory == 40
            || ktory == 50 || ktory == 60 || ktory == 70 || ktory == 80 || ktory == 90) {
            if (losowa != ktory && losowa != ktory + 1 && losowa != ktory - 10
                && losowa != ktory - 9 && losowa != ktory + 10 && losowa != ktory + 11) {
                let powtorzenie = false;
                if (ilosc == 0) {
                    bombs[ilosc] = losowa;
                    ilosc += 1;
                }
                else {
                    for (var j = 0; j < bombs.length; j++) {
                        if (Number(bombs[j]) == Number(losowa)) {
                            powtorzenie = true;
                        }
                    }
                    if (powtorzenie == true) {
                        continue
                    }
                    else {
                        bombs[ilosc] = losowa;
                        ilosc += 1;
                    }
                }
            }
            else {
                continue;
            }
        }
        //prawa czesc
        else {
            if (ktory == 9 || ktory == 19 || ktory == 29 || ktory == 39 || ktory == 49 ||
                ktory == 59 || ktory == 69 || ktory == 79 || ktory == 89 || ktory == 99) {
                if (losowa != ktory && losowa != ktory - 1 && losowa != ktory - 10
                    && losowa != ktory - 11 && losowa != ktory + 10 && losowa != ktory + 9) {
                    let powtorzenie = false;
                    if (ilosc == 0) {
                        bombs[ilosc] = losowa;
                        ilosc += 1;
                    }
                    else {
                        for (var j = 0; j < bombs.length; j++) {
                            if (Number(bombs[j]) == Number(losowa)) {
                                powtorzenie = true;
                            }
                        }
                        if (powtorzenie == true) {
                            continue
                        }
                        else {
                            bombs[ilosc] = losowa;
                            ilosc += 1;
                        }
                    }
                }
                else {
                    continue;
                }
            }
            // reszta przypadkow
            else {
                if (losowa != ktory && losowa != ktory - 1 && losowa != ktory + 1 && losowa != ktory - 10 && losowa != ktory - 9
                    && losowa != ktory - 11 && losowa != ktory + 10 && losowa != ktory + 9 && losowa != ktory + 11) {
                    let powtorzenie = false;
                    if (ilosc == 0) {
                        bombs[ilosc] = losowa;
                        ilosc += 1;
                    }
                    else {
                        for (var j = 0; j < bombs.length; j++) {
                            if (Number(bombs[j]) == Number(losowa)) {
                                powtorzenie = true;
                            }
                        }
                        if (powtorzenie == true) {
                            continue
                        }
                        else {
                            bombs[ilosc] = losowa;
                            ilosc += 1;
                        }
                    }
                }
                else {
                    continue;
                }
            }
        }
        /*
        let powtorzenie = false;
        if (ilosc == 0) {
            bombs[ilosc] = losowa;
            ilosc += 1;
        }
        else {
            for (var j = 0; j < bombs.length; j++) {
                if (Number(bombs[j]) == Number(losowa)) {
                    powtorzenie = true;
                }
            }
            if (powtorzenie == true) {
                continue
            }
            else {
                bombs[ilosc] = losowa;
                ilosc += 1;
            }
        }
        */
    }
    // petla nanoszaca grafiki
    //drawBomby();
}
function drawBomby() {
    for (let i = 0; i < bombs.length; i++) {
        let wartosc = bombs[i];
        kafelki[wartosc].innerHTML = "<img src=\"grafika/bomba.png\">";
    }
}
function sprawdzSasiadow() {
    // tutaj zamiast i trzeba bedzie przyjmowac parametr ktorym bedzie indeks kliknietego kafelka
    //console.log(parametr)
    for (let i = 0; i < dlugosc; i++) {
        let nalezyDoBomb = false;
        for (let j = 0; j < bombs.length; j++) {
            if (i == bombs[j]) {
                nalezyDoBomb = true;
                kafelki[i].wartoscBomb = 'bomba';
            }
            else {
                continue;
            }
        }
        if (nalezyDoBomb == false) {
            let ileBomb = 0
            for (let j = 0; j < bombs.length; j++) {
                //lewa ściana
                if (i == 0 || i == 10 || i == 20 || i == 30 || i == 40 || i == 50 || i == 60 || i == 70 || i == 80 || i == 90) {
                    if (i - 10 == bombs[j] || i - 9 == bombs[j] || i + 1 == bombs[j] || i + 10 == bombs[j] || i + 11 == bombs[j]) {
                        ileBomb += 1;
                    }
                }
                else {
                    // prawa ściana
                    if (i == 9 || i == 19 || i == 29 || i == 39 || i == 49 || i == 59 || i == 69 || i == 79 || i == 89 || i == 99) {
                        if (i - 11 == bombs[j] || i - 10 == bombs[j] || i - 1 == bombs[j] || i + 9 == bombs[j] || i + 10 == bombs[j]) {
                            ileBomb += 1;
                        }
                    }
                    //reszta
                    else {
                        if (i - 11 == bombs[j] || i - 10 == bombs[j] || i - 9 == bombs[j] || i - 1 == bombs[j] ||
                            i + 1 == bombs[j] || i + 9 == bombs[j] || i + 10 == bombs[j] || i + 11 == bombs[j]) {
                            ileBomb += 1;
                        }
                    }
                }
                kafelki[i].wartoscBomb = String(ileBomb);
            }
        }
        else {
            kafelki[i].wartoscBomb = 'bomba';
        }
    }
}
function odslonKafelek(parametr) {
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
        let ileBomb = Number(kafelki[sprawdzany].wartoscBomb);
        if (ileBomb > 0) {
            kafelki[sprawdzany].innerHTML = ileBomb;
            switch (ileBomb) {
                case 1:
                    kafelki[sprawdzany].style.color = "blue";
                    break;
                case 2:
                    kafelki[sprawdzany].style.color = "green";
                    break;
                case 3:
                    kafelki[sprawdzany].style.color = "red";
                    break;
                case 4:
                    kafelki[sprawdzany].style.color = "purple";
                    break;
                case 5:
                    kafelki[sprawdzany].style.color = "orange";
                    break;
            }
        }
        else {
            kafelki[sprawdzany].style.backgroundColor = "grey";
        }
    }
    else {
        kafelki[sprawdzany].innerHTML = "<img src=\"grafika/bomba.png\">";
        gameover();
    }
    console.log(kafelki[sprawdzany].wartoscBomb)
}
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
                kafelki[sprawdzany].innerHTML = ileBomb;
                //kafelki[sprawdzany].wartoscBomb = 'high';
                switch (ileBomb) {
                    case 1:
                        kafelki[sprawdzany].style.color = "blue";
                        break;
                    case 2:
                        kafelki[sprawdzany].style.color = "green";
                        break;
                    case 3:
                        kafelki[sprawdzany].style.color = "red";
                        break;
                    case 4:
                        kafelki[sprawdzany].style.color = "purple";
                        break;
                    case 5:
                        kafelki[sprawdzany].style.color = "orange";
                        break;
                }
            }
            else {
                //kafelki[sprawdzany].wartoscBomb = 'low';
                continue
            }
        }
        console.log(kafelki[sprawdzany].wartoscBomb)
    }
    else {
        kafelki[sprawdzany].innerHTML = "<img src=\"grafika/bomba.png\">";
        gameover();
    }
}
function gameover() {
    alert("Game over!");
    location.reload();
}
function sprawdzPuste(parametr) {
    let ktory = parametr;
    if (kafelki[ktory].wartoscBomb == 0) {
        if (kafelki[ktory - 1].wartoscBomb == 0) {
            kafelki[ktory - 1].style.backgroundColor = "grey";
            //sprawdzPuste(ktory - 1);
        }
        if (kafelki[ktory + 1].wartoscBomb == 0) {
            kafelki[ktory + 1].style.backgroundColor = "grey";
            //sprawdzPuste(ktory + 1);
        }
        if (kafelki[ktory - 10].wartoscBomb == 0) {
            kafelki[ktory - 10].style.backgroundColor = "grey";
            //sprawdzPuste(ktory - 10);
        }
        if (kafelki[ktory + 10].wartoscBomb == 0) {
            kafelki[ktory + 10].style.backgroundColor = "grey";
            //sprawdzPuste(ktory + 10);
        }
    }
}
function flag() {
    var ktory = event.target.identyfikator;
    kafelki[ktory].innerHTML = "<img src=\"grafika/flaga.png\">";
}