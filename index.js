import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";
// Import functions from utils.js
import { metersToMiles, getFormattedDate } from "./utils.js";

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

// Using Statements
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get('/get-weather', async (req, res) => {
    try {
        const city = req.query.city;
        const state = req.query.state.toUpperCase();
        const country = req.query.country
        // Check if any of the fields is empty
        if (!city || !state || !country) {
            throw new Error(" Please fill in all the fields using the proper syntax as shown in the examples before searching.");
        };
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&limit=1&units=imperial&appid=${API_KEY}`);
        const data = response.data;
        const tempRaw = data.main.temp;
        const tempRound = Math.round(tempRaw);
        const weatherRaw = data.weather[0].description;
        const weatherUpper = weatherRaw.charAt(0).toUpperCase() + weatherRaw.slice(1);
        const windSpeedRaw = data.wind.speed;
        const windSpeedRound = windSpeedRaw.toFixed(1);
        const formattedDate = getFormattedDate();
        const visibilityInMiles = metersToMiles(data.visibility);
        res.render("weather.ejs", {
            data: data,
            temperature: tempRound,
            weatherDesc: weatherUpper,
            windSpeed: windSpeedRound,
            humidity: data.main.humidity,
            visibility: visibilityInMiles,
            cityName: data.name,
            stateName: state,
            currentDate: formattedDate,
            countryName: response.data.sys.country,
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Handle 404 status code separately
            res.render("weather.ejs", { error: "ERROR: City not found. Please provide a valid city, state, and country." });
        } else {
            // Handle other errors
            res.render("weather.ejs", { error: `ERROR: ${error.message}` });
        }
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});