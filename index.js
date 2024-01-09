import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

// USING STATEMENTS
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post('/get-weather', async (req, res) => {
    try {
        const city = req.body.city;
        const state = req.body.state;
        const country = req.body.country;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&limit=1&units=imperial&appid=${API_KEY}`);
        res.render("index.ejs", {
            data: response.data,
            weatherDesc: response.data.weather[0].description,
            cityName: response.data.name,
            stateName: state,
            countryName: response.data.sys.country,
            temperature: response.data.main.temp
        });
    } catch (error) {
        res.render("index.ejs", { error: JSON.stringify(error.response.data) });
    }
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});