// Time START

//Tids variabler
const timeDateH2 = document.querySelector(".timeDate h2");
const timeDateP = document.querySelector(".timeDate p");
const fullYear = new Date().getFullYear();
const fullMonth = new Date().getMonth();
const fullDay = new Date().getDay(); // Ger veckodagens nummer från 0 till 6
const fullDays = new Date().getDate(); // Ger månadens dagsnummer från 1 till 31

function getMonthName() {
    const months = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December"
    ];
    return months[fullMonth];
}

function getDayName() {
    const days = [
        "Söndag", // 0
        "Måndag", // 1
        "Tisdag", // 2
        "Onsdag", // 3
        "Torsdag", // 4
        "Fredag", // 5
        "Lördag" // 6
    ];
    return days[fullDay];
}

// Visa datum och dag
timeDateP.textContent = `${getDayName()} ${fullDays} ${getMonthName()} ${fullYear}`;


function isOpenNow(now) {
    const day = now.getDay();
    const hours = now.getHours();
    
    if (day >= 1 && day <= 5) { // Om dagnumret är mellan 1 och 5
        return hours >= 7 && hours < 18; // Sant om klockan är mellan 9 och 14
    }
    else if (day === 6) { // Om dag numret är 6 eller lördag
        return hours >= 9 && hours < 14; // Sant om klockan är mellan 7 och 18
    }
    else {
        return false;
    }
}

// Uppdatera tid och status
function updateTimeAndStatus() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    
    // Skriv ut timmar, minuter och sekunder och padStart lägger till 00
    timeDateH2.textContent = `${hours}:${minutes}:${seconds}`;
    
    const isOpen = isOpenNow(now);
    const status = document.querySelector(".time span");
    
    if (isOpen) {
        status.textContent = "Öppet just nu";
        status.classList.add("open");
        status.classList.remove("close");
    }
    else {
        status.textContent = "Stängt just nu";
        status.classList.add("close");
        status.classList.remove("open");
    }
}

updateTimeAndStatus();
setInterval(updateTimeAndStatus, 1000);
// Time END

// Ratings START
const ratingsText = document.querySelector(".ratings h3");
const ratingsTextName = document.querySelector(".ratings span h4");
const ratingsBtn = document.querySelector(".ratings button");
// Skapa en array med alla ratings för att hämta ett nytt rating varje gång med Math.random() och multiplicera med antalet element i arrayen
const ratingsArray = [
    {
        text: "Vår labradoodle Buster trivs fantastiskt bra! Personalen är otroligt trygg och engagerad.",
        name: "Ahmed"
    },
    {
        text: "Den stora rastgården och att de bara tar in 12 hundar märks verkligen på lugnet när man hämtar.",
        name: "Sara & Milo"
    },
    {
        text: "Vi känner oss alltid fullständigt trygga när vi lämnar Nova här över helgen. Rekommenderas varmt!",
        name: "Karin"
    },
    {
        text: "Nina och Pelle har ett underbart handlag med hundarna. Alltid en viftande svans vid lämning.",
        name: "Yousef"
    },
    {
        text: "Fantastiskt bemötande och otroligt smidig bokning för helgpassning.",
        name: "Erik & Bella"
    }
];
function getRatings() {
    const randomRating = Math.floor(Math.random() * ratingsArray.length);
    ratingsText.textContent = '"' + ratingsArray[randomRating].text + '"';
    ratingsTextName.textContent = ratingsArray[randomRating].name;
}
getRatings()
ratingsBtn.addEventListener("click", getRatings)
// Ratings END

// Booking START

//Boka variabler
const bookingName = document.querySelector("#bookingName");
const bookingDate = document.querySelector("#bookingDate");
const bookingForm = document.querySelector(".booking form");
const bookingData = document.querySelector(".bookingData");
const bookingError = document.querySelector(".bookingError");

class bookingList {
    constructor() {
        this.key = "tassen_bokningar"; // Bestäm nyckelnamn i localstorage
        this.booking = this.bookingStorage();
    }
    
    bookingStorage() {
        // Hämta array från localstorage, och om de inte finns så sätt en tom array
        return JSON.parse(localStorage.getItem(this.key)) || []; 
    }
    
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.booking));
    }
    
    add(name, date) {
        // Bokningslista sparar namn, datum och id
        const newBooking = {
            id: Date.now().toString(),
            name: name,
            date: date
        };
        
        this.booking.push(newBooking);
        this.save();
        return newBooking;
    }
    
    delete(id) {
        // Skapa en kopia från localstorage med filter funktionen, spara alla objekt utom det som matchar id, och spara sedan
        this.booking = this.booking.filter(a => a.id !== id);
        this.save();
    }
    
    all() {
        return this.booking;
    }
}

const myBooking = new bookingList();

function renderBooking() {
    const all = myBooking.all()
    // Töm allt inuti bookingData innan korten visas för att slippa dubbletter och vara säker på att inga kort upprepas
    bookingData.innerHTML = "";
    
    if (all.length == 0) { // Om all.length är 0 betyder det att inget finns och arrayen är tom
        const bookingDataTextEmpty = document.createElement("p");
        bookingDataTextEmpty.textContent = "Inga aktiva förfrågningar registrerade just nu. Fyll i formuläret ovan för att lägga till."
        bookingData.appendChild(bookingDataTextEmpty);
        bookingData.classList.add("emptyData");
        bookingData.classList.remove("fullData");
    }
    else {
        bookingData.classList.add("fullData");
        bookingData.classList.remove("emptyData");

        // Skapa ett bokningskort med createElement och lägg till det i bookingData
        // <div class="bookingCard">
        //     <div class="bookingCardContent">
        //         <h4>Hund: </h4>
        //         <p>Datum: </p>
        //     </div>
        //     <button>Avboka</button>
        // </div>
        
        all.forEach(element => {
            const bookingCard = document.createElement("div");
            bookingCard.classList.add("bookingCard");
            
            const bookingCardContent = document.createElement("div");
            bookingCardContent.classList.add("bookingCardContent");
            
            const bookingCardContentH4 = document.createElement("h4");
            bookingCardContentH4.textContent = `Hund: ${element.name}`;
            
            const bookingCardContentP = document.createElement("p");
            bookingCardContentP.textContent = `Datum: ${element.date}`;
            
            const bookingDataBtn = document.createElement("button");
            bookingDataBtn.textContent = "Avboka";
            bookingDataBtn.type = "button";
            // Spara id i knappen med setAttribute("data-id") för att kunna ta bort det senare
            bookingDataBtn.setAttribute("data-id", element.id);
            
            bookingCardContent.appendChild(bookingCardContentH4);
            bookingCardContent.appendChild(bookingCardContentP);
            
            bookingCard.appendChild(bookingCardContent);
            bookingCard.appendChild(bookingDataBtn);
            
            bookingData.appendChild(bookingCard);
        });
    }
}

renderBooking()

bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let dogInputName = bookingName.value;
    let dateInput = bookingDate.value;
    
    if (!dogInputName || !dateInput) {
        bookingError.style.display = "block";
    }
    else {
        bookingError.style.display = "none";
        myBooking.add(dogInputName, dateInput)
        bookingName.value = "";
        bookingDate.value = "";
        renderBooking()
    }
});

bookingData.addEventListener("click", (e) => {
    // e.target.tagName skrivs alltid med stora bokstäver, därför måste det stå BUTTON och inte button för att villkoret ska stämma
    if (e.target.tagName === "BUTTON") {
        // Hämta elementets id med getAttribute, som sparades i html elementet som data-id
        const bookingId = e.target.getAttribute("data-id")
        myBooking.delete(bookingId);
        renderBooking()
    }
});

// Booking END