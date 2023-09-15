import User from "../models/user.model.mjs";

const createUser = async (req, res, next) => {
  try {
    await User.create(req.body);

    res.status(200).json({ message: "user create success" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { location } = req.body;

    if (!location.lat || !location.lon) {
      res.status(400).json({ message: "location is required" });
    }

    const response = User.findOneAndUpdate(
      { email: email },
      { location: location },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const weatherDataByDay = async (req, res, next) => {
  try {
    const { email, date } = req.query;

    console.log(email, date);

    const response = await User.findOne(
      {
        email: email,
        "weatherReportsByDate.date": date,
      },
      { "weatherReportsByDate.$": 1 }
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export { createUser, getUser, getAllUser, updateUser, weatherDataByDay };
