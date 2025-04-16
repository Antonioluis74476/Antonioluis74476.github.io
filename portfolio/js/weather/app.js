// Capitalizes the first letter of a string
const capitalize = str => str && str[0].toUpperCase() + str.slice(1);

// Fetch and populate weather data for Dublin
const populateTableRows = async () => {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=f2e49b0586fdd47fa05b748ab314c201'
    );

    if (!response.ok) {
      console.error('Error Status Code:', response.status);
      return;
    }

    const data = await response.json();
    console.log(data); // For debugging: check what data was received

    // Build the HTML rows for weather data
    const weatherRows = `
      <tr>
        <td><span>Summary</span></td>
        <td>${capitalize(data.weather[0].description)}</td>
      </tr>
      <tr>
        <td><span>Temperature</span></td>
        <td>${data.main.temp} °C</td>
      </tr>
      <tr>
        <td><span>Humidity</span></td>
        <td>${data.main.humidity} %</td>
      </tr>
      <tr>
        <td><span>Pressure</span></td>
        <td>${data.main.pressure} Pa</td>
      </tr>
    `;

    // Insert rows into the table body
    document.querySelector('#table-weather-dublin tbody').innerHTML = weatherRows;

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// Dynamically change background based on current time
const changeBackground = () => {
  const hour = new Date().getHours();
  const bgImage = (hour >= 0 && hour <= 6 || hour > 23)
    ? "url('assets/img/dublin-night.jpg')"
    : "url('assets/img/dublin-day.jpg')";

  document.querySelector('.theme-js').style.backgroundImage = bgImage;
};

// Run functions once the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    populateTableRows();
    changeBackground();
  });
} else {
  populateTableRows();
  changeBackground();
}