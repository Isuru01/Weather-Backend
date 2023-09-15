# Weather Backend

This is the backend repository for the Weather Backend project. It provides API endpoints to manage user data and send weather updates via email.

## Installation

Before running the application, make sure you have Node.js and npm installed on your system.

1. Clone the repository:

   ```bash
   git clone https://github.com/Isuru01/Weather-Backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Weather-Backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the root directory with the following content:

   ```env
   EMAIL=your_email@gmail.com
   PASSWORD=your_email_app_password
   MONGO_URI=mongo_uri
   ```

   Replace `your_email@gmail.com` and `your_email_password` with your Gmail email and password. This is used for sending weather updates via email.

## Usage

To start the server, run:

```bash
npm run dev
```

The server will start on `http://localhost:8085`.

## API Endpoints

### User Routes

- `POST /api/user`: Create a new user.
- `GET /api/user/:email`: Get user details by email.
- `PUT /api/user/:email`: Update user location by email.

### Weather Data Routes

- `GET /api/user/weather?email=<user_email>&date=<date>`: Get weather data for a specific user on a given date.

### Cron Job

The server runs a cron job every three hours to fetch weather data for all users and send email updates.

## Dependencies

- axios: HTTP client for making API requests.
- bcrypt: Password hashing library.
- body-parser: Middleware for parsing request bodies.
- cookie-parser: Middleware for parsing cookies.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- dayjs: Date and time library.
- dotenv: Library for loading environment variables.
- express: Web application framework.
- form-data: A library for working with HTTP form data.
- jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT).
- mailgun.js: Mailgun API client for sending emails.
- mongoose: MongoDB ODM (Object-Document Mapping) library.
- morgan: HTTP request logger middleware.
- node-cron: Cron job library for Node.js.
- nodemailer: Email sending library.
- nodemailer-mailgun-transport: Transport for sending email using Mailgun.
- nodemon: Development tool that automatically restarts the server on code changes.
- stripe: Library for working with the Stripe payment platform.
- uuid: Library for generating UUIDs.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
