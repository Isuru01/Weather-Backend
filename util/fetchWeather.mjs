import axios from "axios";

const fetchWeather = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${process.env.WEATHER_API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchWeather };
