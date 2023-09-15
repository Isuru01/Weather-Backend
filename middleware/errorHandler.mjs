export default (err, req, res, next) => {
  console.log(err);

  switch (err.name) {
    case "MongoServerError":
      if (err.code === 11000) {
        // Handle duplicate key errors
        res.status(400).json({ message: "A duplicate key error occurred" });
      } else {
        // Handle other MongoDB errors
        res.status(500).json({ message: "A database error occurred" });
      }
      break;
    case "ValidationError":
      // Handle Mongoose validation errors
      res.status(400).json({ message: err.message });
      break;
    default:
      // Handle other types of errors
      res.status(500).json({ message: "An unknown error occurred" });
  }
};
