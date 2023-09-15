import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const WeatherReportSchema = new Schema({
  coord: {
    lon: Number,
    lat: Number,
  },
  weather: [
    {
      id: Number,
      main: String,
      description: String,
      icon: String,
    },
  ],
  base: String,
  main: {
    temp: Number,
    feels_like: Number,
    temp_min: Number,
    temp_max: Number,
    pressure: Number,
    humidity: Number,
  },
  visibility: Number,
  wind: {
    speed: Number,
    deg: Number,
  },
  clouds: {
    all: Number,
  },
  dt: Number,
  sys: {
    type: Object,
    id: Number,
    country: String,
    sunrise: Number,
    sunset: Number,
  },
  timezone: Number,
  id: Number,
  name: String,
  cod: Number,
});

const UserSchema = new Schema({
  key: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    lat: Number,
    lon: Number,
  },
  weatherReportsByDate: [
    {
      date: {
        type: String,
        required: true,
      },
      reports: [WeatherReportSchema],
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (!this.key) {
    this.key = uuidv4();
  }
  next();
});

const UserModel = model("User", UserSchema);
export default UserModel;
