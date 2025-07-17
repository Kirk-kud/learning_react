import { useState, useEffect } from 'react'
import placeHolder from '/placeholder.png'
import './App.css'

function App() {
  const [ city, setCities ] = useState([]);
  const [ userChoice, setUserChoice ] = useState('');
  const [ icon, setIcon ] = useState(placeHolder);

  // Poppulate options with all the cities
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/population/cities").then(response => {
      return response.json();
    }).then(data => {
      const cities = data.data;
      setCities(cities);

      return data;
    })
  }, [])

  const handleCityChange = (e) => {
    setUserChoice(e.target.value);
  };

  async function getWeatherStatistics() {
    if (userChoice.length === 0)
      return;
    
    const apiKey = "574748f0fa084862823112135251707"
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(userChoice)}`;

    fetch(apiURL).then(response => {
      if (!response.ok){
        console.error("No information retrieved");
        return;
      }
      return response.json();
    }).then(data => {
      if (data.current){
        document.getElementById('celcius').innerText = data.current.temp_c + "°C";
        document.getElementById('fahrenheit').innerText = data.current.temp_f + "°F";
        document.getElementById('uv-index').innerText = data.current.uv;
        document.getElementById('humidity').innerText = data.current.humidity + "%";

        document.getElementById('weather-info').innerText = data.current.condition.text + ":";
        setIcon(data.current.condition.icon);
      }
      else{
        document.getElementById('celcius').innerText = "-°C";
        document.getElementById('fahrenheit').innerText = "-°F";
        document.getElementById('uv-index').innerText = "-";
        document.getElementById('humidity').innerText = "-%";

        document.getElementById('weather-info').innerText = "";
        setIcon(placeHolder);
      }
    });
  };

  return (
    <>
      <div>
        <h1>Welcome to the Weather App</h1>
      </div>
      <div>
        <select id="city-select" value={userChoice} onChange={handleCityChange}>
          {city.map((c, index) => (
              <option key={index} value={c.city}>
                {c.city}
              </option>              
            ))
          }
        </select>
        <br />
        <button id="submit-button" onClick={getWeatherStatistics}>
          Get Weather Statistics
        </button>
      </div>
      {/* Showing weather information */}
      <div>
        <h2>
          <span id="weather-info"></span>
          <img id="weather-icon" src={icon}/>
        </h2>
      </div>
      {/* Setting up a table to show the weather information */}
      <div id="current-table">
        <table>
          <thead>
            <tr>
              <th>
                <span>
                  Temperature in Celcius
                </span>
              </th>
              <th>
                <span>
                  Temperature in Fahrenheit
                </span>
              </th>
              <th>
                <span>
                  UV Index
                </span>
              </th>
              <th>
                <span>
                  Humidity
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="celcius">
                -
              </td>
              <td id="fahrenheit">
                -
              </td>
              <td id="uv-index">
                -
              </td>
              <td id="humidity">
                -
              </td>
            </tr>        
          </tbody>
        </table>   
      </div>
    </>
  )
}

export default App
