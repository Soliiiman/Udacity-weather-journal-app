//personal API key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '0da6843ca7a315f6e7f3afcf65b31af7';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getWeather(baseURL, zipCode, key)
    .then(function (data){
        // Add data to POST request
        postData('/add', {temperature: data.main.temp, date: newDate, feeling: feelings } )
        // Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}

/* function to GET web API data */
const getWeather = async (baseURL, code, key)=>{
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + key)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

/* function to POST data */
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
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
        const allData = await request.json();
        document.getElementById('date').innerHTML =`Date: ${allData.date}` ;
        document.getElementById('temp').innerHTML = `Temperatuer: ${allData.temperature}`;
        document.getElementById('content').innerHTML = `Your feeling: ${allData.feeling}`;
    }
    catch (error) {
        console.log('error', error);
    }
}