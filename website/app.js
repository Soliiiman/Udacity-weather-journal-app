// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//personal API key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apikey = '&APPID=0da6843ca7a315f6e7f3afcf65b31af7';

// Event listener to add function to DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* function called by event listener */
function performAction(e){
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, apikey)
    .then(function (data){
        // Add data to POST request
        postData('/add', {date: newDate,temp: data.main.temp, content: feelings } )
        // Function which updates UI
        updateUI();
    })
}

/* function to GET web API data */
const getWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL + zip + ',us' + key)
    try {
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

/* function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;

    }
    catch (error) {
        console.log('error', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML =`Date: ${data[data.length-1].date}` ;
        document.getElementById('temp').innerHTML = `Temperatuer: ${data[data.length-1].temp}`;
        document.getElementById('content').innerHTML = `Your feeling: ${data[data.length-1].content}`;

    }
    catch (error) {
        console.log('error', error);
    }
}