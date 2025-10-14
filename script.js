
// FUNKTIONEN

// des Tages
async function getByDate(date) {
    const url = `https://energy-radio.kaya-moser.ch/backend/api/getByDate.php?date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
    
        
        // ------------------ HTML mit Daten ausfüllen------------------
        if (mode === "songs") {
          document.querySelector(".podium-box-1 .mode-title").innerText = data.top_titles[0].title;
          document.querySelector(".podium-box-1 .artist-name").innerText = data.top_titles[0].artist;
          document.querySelector(".podium-box-1 .plays").innerText = `${data.top_titles[0].count ?? ""} Abspielungen`;

          document.querySelector(".podium-box-2 .mode-title").innerText = data.top_titles[1].title;
          document.querySelector(".podium-box-2 .artist-name").innerText = data.top_titles[1].artist;
          document.querySelector(".podium-box-2 .plays").innerText = `${data.top_titles[1].count ?? ""} Abspielungen`;

          document.querySelector(".podium-box-3 .mode-title").innerText = data.top_titles[2].title;
          document.querySelector(".podium-box-3 .artist-name").innerText = data.top_titles[2].artist;
          document.querySelector(".podium-box-3 .plays").innerText = `${data.top_titles[2].count ?? ""} Abspielungen`;

        } 
        else if (mode === "artist") {
          document.querySelector(".podium-box-1 .mode-title").innerText = data.top_artists[0].artist;
          document.querySelector(".podium-box-1 .plays").innerText = `${data.top_artists[0].count ?? ""} Abspielungen`;

          document.querySelector(".podium-box-2 .mode-title").innerText = data.top_artists[1].artist;
          document.querySelector(".podium-box-2 .plays").innerText = `${data.top_artists[1].count ?? ""} Abspielungen`;

          document.querySelector(".podium-box-3 .mode-title").innerText = data.top_artists[2].artist;
          document.querySelector(".podium-box-3 .plays").innerText = `${data.top_artists[2].count ?? ""} Abspielungen`;
        }

    } catch (error) {
        console.error(error)
    }
 
}

// der Woche
async function getByWeek(date) {
    const url = `https://energy-radio.kaya-moser.ch/backend/api/getByWeek.php?date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
    } catch (error) {
        console.error(error)
    }
}

// des Monats
async function getByMonth(date) {
    const url = `https://energy-radio.kaya-moser.ch/backend/api/getByDate.php?date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
    } catch (error) {
        console.error(error)
    }
}


// AUSWAHL DER MODI (mode, timespan, date)

document.addEventListener("DOMContentLoaded", () => {

  // Default-Zustände
  let mode = "songs";         // Default: Songs
  let timespan = "des_tages"; // Default: Tag
  let date = new Date().toISOString().split('T')[0]; // heutiges Datum

  // DOM-Elemente
  const modeInputs = document.querySelectorAll('input[name="mode"]');
  const timespanInputs = document.querySelectorAll('input[name="timespan"]');
  const datePicker = document.getElementById('datepicker');

  // Default setzen
  document.getElementById("songs").checked = true;
  document.getElementById("des_tages").checked = true;
  datePicker.value = date;

  // Event: Mode (Artist / Songs)
  modeInputs.forEach(input => {
    input.addEventListener("change", e => {
      mode = e.target.id;
      handleSelectionChange();
    });
  });

  // Event: Timespan (Tag / Woche / Monat)
  timespanInputs.forEach(input => {
    input.addEventListener("change", e => {
      timespan = e.target.id;
      handleSelectionChange();
    });
  });

  // Event: Datepicker
  datePicker.addEventListener("change", e => {
    date = e.target.value;
    handleSelectionChange();
  });

  // Reaktion auf die vorgenommenen Änderungen
  function handleSelectionChange() {
    console.log("Aktuelle Auswahl:");
    console.log("Mode:", mode);
    console.log("Zeitraum:", timespan);
    console.log("Datum:", date);

   // Bedingung: je nach timespan andere Funktion aufrufen
    if (timespan === "des_tages") {
      getByDate(date);
    } else if (timespan === "der_woche") {
      getByWeek(date);
    } else if (timespan === "des_monats") {
      getByMonth(date);
  }}

  // Initialer Aufruf
  handleSelectionChange();


});