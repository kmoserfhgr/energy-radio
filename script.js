

// des Tages
async function getByDate(date) {
    const url = `https://energy-radio.kaya-moser.ch/backend/api/getByDate.php?date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
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


// Auswahl der Modi (mode, timespan, date)

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