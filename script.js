let kafelki = document.querySelectorAll('#square')
let dlugosc = kafelki.length;
let bombs = new Array();
let ilosc = 0;
function dodajListenery() {
    //let kafelki = document.querySelectorAll('#square')
    for (var i = 0; i < kafelki.length; i++) {
        kafelki[i].addEventListener("click", createBombs)
    }
}
function createBombs() {
    //bombs ma indeksy kafelek z bombami
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
    narysujBomby();
    // petla liczaca ile ma bomb jako sasiadow
    sprawdzSasiadow();
}
function narysujBomby() {
    for (let i = 0; i < bombs.length; i++) {
        let wartosc = bombs[i];
        kafelki[wartosc].innerHTML = "<img src=\"grafika/bomba.png\">";
    }
}
function sprawdzSasiadow() {
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
                }
                else {
                    continue
                }
            }
        }
    }
}