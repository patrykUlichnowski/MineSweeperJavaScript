let kafelki = document.querySelectorAll('#square')
let dlugosc = kafelki.length;
//bombs ma indeksy kafelek z bombami
let bombs = new Array();
let ilosc = 0;
function dodajListenery() {
    //let kafelki = document.querySelectorAll('#square')
    for (var i = 0; i < kafelki.length; i++) {
        createBombs();
        //kafelki[i].identyfikator = i;
        kafelki[i].addEventListener("click", kliknijKafelek)
    }
}
function kliknijKafelek() {
    console.log(kafelki)
}
function createBombs() {
    //let bombs = new Array();
    //let ilosc = 0;
    // petla losujaca pozycje bomb
    while (bombs.length < 15) {
        let losowa = Math.floor(Math.random() * dlugosc)
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
    // petla nanoszaca grafiki
    drawBomby();
    // petla liczaca ile ma bomb jako sasiadow
    sprawdzSasiadow();
}
function drawBomby() {
    for (let i = 0; i < bombs.length; i++) {
        let wartosc = bombs[i];
        kafelki[wartosc].innerHTML = "<img src=\"grafika/bomba.png\">";
    }
}
function sprawdzSasiadow() {
    // tutaj zamiast i trzeba bedzie przyjmowac parametr ktorym bedzie indeks kliknietego kafelka
    for (let i = 0; i <= dlugosc; i++) {
        let nalezyDoBomb = false;
        for (let j = 0; j < bombs.length; j++) {
            if (i == bombs[j]) {
                nalezyDoBomb = true;
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
                if (ileBomb > 0) {
                    kafelki[i].innerHTML = ileBomb;
                    switch (ileBomb) {
                        case 1:
                            kafelki[i].style.color = "blue";
                            break;
                        case 2:
                            kafelki[i].style.color = "green";
                            break;
                        case 3:
                            kafelki[i].style.color = "red";
                            break;
                        case 4:
                            kafelki[i].style.color = "purple";
                            break;
                        case 5:
                            kafelki[i].style.color = "orange";
                            break;
                    }
                }
                else {
                    continue
                }
            }
        }
    }
}