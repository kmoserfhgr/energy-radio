/*async function getAll() {
    const url = 'https://energy-radio.kaya-moser.ch/backend/api/getAll.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
    } catch (error) {
        console.error(error)
    }
}

getAll();*/

async function getByDate(date) {
    const url = `https://energy-radio.kaya-moser.ch/backend/api/getAll.php?date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
    } catch (error) {
        console.error(error)
    }
}


const datepicker = document.querySelector('#datepicker');
datepicker.addEventListener('change', function() {
    const date = datepicker.value;
    getByDate(date)
    console.log(date);
})

const weekpicker = document.querySelector('#weekpicker');
weekpicker.addEventListener('change', function() {
    const date = weekpicker.value;
    getByDate(date)
    console.log(date);
})