# Hundpensionatet Tassen

En webbplats för Hundpensionatet Tassen byggd med HTML, CSS och JavaScript.

---

## Hur man startar
Öppna `index.html` direkt i webbläsaren eller med **Live Server** i VS Code.

---

## Felsökning (Bugg jag löste)
1. När jag testade klockan och datumet visades ordet `undefined` på söndagar. Problemet var att JavaScript ger söndag siffran `0`. Min lista med dagar började på måndag, så koden letade efter plats `-1`. Jag fixade det genom att sätta **Söndag** först i listan (på index `0`). Därefter fungerade datumet varje dag.
2. Ett av de problem jag stötte på under mitt arbete var att sidan uppdaterades varje gång jag klickade på **submit** i formuläret, trots att jag hade skrivit `e.preventDefault();` Jag förstod aldrig orsaken till problemet förrän jag granskade koden och upptäckte ett fel högst upp i koden som inte visades i `console.log` eller i vscode. Det tog mig en stund att inse att problemet låg i koden högst upp och inte i min egen formulärkod.
3. Jag stötte på ett problem när jag klickade på knappen **Avboka**, eftersom den inte fungerade trots att jag hade skrivit koden korrekt. När användaren klickar på knappen **Avboka** via `e.target.tagName`, om den är lika med ”button”, vilket är knappen som finns inuti "bookingData", så fungerade det inte förrän jag skrev ut `e.target. tagName` i `console.log` och insåg att det måste skrivas med versaler och inte med gemener.

---

## Reflektion
Det svåraste för mig var att hantera klasser i JavaScript, eftersom jag hade viss bakgrundskunskap inom ämnet tack vare mina kunskaper i C#, men jag lyckades förstå hur det fungerade och fick det att fungera.

---

## AI-användning
Jag använde AI under projektet som ett lärverktyg för att förstå vissa begrepp, såsom `padStart`, `this` och `class`. När det gäller koden skrev jag den själv, och jag förstår varje rad jag skrev. Jag lade till kommentarer för att kunna minnas senare när jag granskar koden.

---

## VG Frågor

### 1. Scope och `this`
I klassen `bookingList` pekar ordet `this` på det egna objektet. Det gör att funktionerna inuti klassen kan nå sina egna variabler, som `this.booking` och `this.save()`.

### 2. Layout (Flexbox och Grid)
* **Flexbox:** Används i menyn och klockan för att enkelt lägga saker i en rad och centrera dem.
* **Grid:** Används för korten i prislistan för att få jämna rader och kolumner som passar bra på alla skärmar.

### 3. Val av loop (`forEach`)
Jag har använt `forEach` istället för map eller for. Både `forEach` och for tar en array och går igenom varje element i den, medan map tar varje element i arrayen, bearbetar det och lägger sedan in det i en ny array. Detta passar inte för projektet, eftersom jag vill gå igenom varje element i arrayen och sedan skriva ut det som ett kort.

---

## Källor

För att förstå hur tid används och hur tiden fungerar i JavaScript
https://www.w3schools.com/js/js_dates.asp


För att förstå vad Math är, hur man använder det och se alla Math funktioner, såsom `Math.random()` och `Math.floor()`.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

