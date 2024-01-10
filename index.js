import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

// USING STATEMENTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get('/get-weather', async (req, res) => {
    try {
        const city = req.query.city;
        const state = req.query.state;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&limit=1&units=imperial&appid=${API_KEY}`);
        const tempRaw = response.data.main.temp;
        const tempRound = Math.round(tempRaw);
        const weatherRaw = response.data.weather[0].description;
        const weatherUpper = weatherRaw.charAt(0).toUpperCase() + weatherRaw.slice(1)
        res.render("weather.ejs", {
            data: response.data,
            weatherDesc: weatherUpper,
            cityName: response.data.name,
            stateName: state,
            countryName: response.data.sys.country,
            temperature: tempRound
        });
    } catch (error) {
        res.render("weather.ejs", { error: JSON.stringify(error.response.data) });
    }
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});