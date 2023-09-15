import nodemailer from "nodemailer";
import dayjs from "dayjs";
import User from "../models/user.model.mjs";
import { fetchWeather } from "../util/fetchWeather.mjs";

const getWeather = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users.length) {
      console.log("No users found");
      return;
    }

    const weatherPromise = users.map(async (user) => {
      const weather = await fetchWeather(user.location);

      if (!weather) {
        console.log(`No weather data found for location: ${user.location}`);
        return null;
      }

      try {
        const currentDate = dayjs().format("YYYY-MM-DD");
        // First, try to find the user and the weather report for the current date
        let updatedUser = await User.findOneAndUpdate(
          {
            email: user.email,
            "weatherReportsByDate.date": currentDate,
          },
          {
            $addToSet: {
              "weatherReportsByDate.$.reports": weather,
            },
          },
          { new: true }
        );

        // If the weather report for the current date does not exist, create a new one
        if (!updatedUser) {
          updatedUser = await User.findOneAndUpdate(
            {
              email: user.email,
            },
            {
              $addToSet: {
                weatherReportsByDate: {
                  date: currentDate,
                  reports: [weather],
                },
              },
            },
            { new: true }
          );
        }

        console.log(updatedUser);
      } catch (error) {
        console.log(error);
      }

      return {
        email: user.email,
        location: user.location,
        weather,
      };
    });

    const weatherData = (await Promise.all(weatherPromise)).filter(Boolean);

    if (!weatherData.length) {
      console.log("No weather data available for any user");
      return;
    }

    weatherData.forEach(({ email, weather }) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        user: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "login",
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      let mailOptions = {
        from: "testweather23api@gmail.com",
        to: email,
        subject: "Weather Update",
        html: `
          <h4>Weather Update for ${weather.name}, ${weather.sys.country}</h4>
          <p>Hello, ${email}</p>
          <p>Weather Update at ${dayjs().format("HH:mm:ss")}</p>
          <ul>
            <li><strong>Weather:</strong> ${weather.weather[0].main}, ${
          weather.weather[0].description
        }</li>
            <li><strong>Temperature:</strong> ${weather.main.temp} K</li>
            <li><strong>Feels Like:</strong> ${weather.main.feels_like} K</li>
            <li><strong>Minimum Temperature:</strong> ${
              weather.main.temp_min
            } K</li>
            <li><strong>Maximum Temperature:</strong> ${
              weather.main.temp_max
            } K</li>
            <li><strong>Pressure:</strong> ${weather.main.pressure} hPa</li>
            <li><strong>Humidity:</strong> ${weather.main.humidity}%</li>
            <li><strong>Wind Speed:</strong> ${weather.wind.speed} m/s</li>
            <li><strong>Wind Direction:</strong> ${
              weather.wind.deg
            } degrees</li>
          </ul>
          <p>Stay Safe.</p>
          <p>Best regards,</p>
          <p>Your Weather Update Team</p>`,
      };

      transporter.sendMail(mailOptions, (error, result) => {
        if (error) {
          console.log("Error ", error);
        } else {
          console.log("Success", result);
        }
      });
    });

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    next(error);
  }
};

export { getWeather };
