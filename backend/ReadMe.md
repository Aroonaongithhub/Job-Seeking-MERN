# Dependencies installed:

- **bcrypt**: hashing user password.
- **cloudinary**: resume upload format.
- **cookie-parser**: user authorization.
- **cors**: connect frontend and backend.
- **dotenv**: to load environment variables from a .env file into your application. This helps keep sensitive information like API keys or database credentials separate from your code.
- **express**:It simplifies the process of creating web servers and handling HTTP requests and responses. With Express, you can quickly create APIs, handle routing, serve static files, and more, making it a popular choice for building web applications in Node.js.
- **express-fileupload**: Express-fileupload is a middleware for Express.js that simplifies file uploading in web applications.
  **_ NOTE: to upload file on cloudinary. _**

- **jsonwebtoken**: created when user login and how it will store in cookie.
- **mongoose**: for creating database.
- **validator**: for email verification.

# Folders purpose:

- **config**: for storing environment variables.
- **contollers**:controll the application flow like user route job contoller , application controller k functions kese hongy.
- **database**: for making connection with database.
- **middleware**: for authentication and error handling.
- **models**: for designing scemas.
- **routes**: for routing means page rendering.
- **utils**: utilities.

# changes in package.json

- **type: module** for using ES Javascript not commonjs for import and export.
- "scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
  }, when we run npm dev then server.js file will run

# cloudinary website link

https://console.cloudinary.com/pm/c-59454ce07e98a01a6f828154dbf13c/getting-started

- file upload functionality setup CLoud name, api key, api secret key

# used postman:

- API client tool that simplifies the process of developing, testing, and documenting APIs. It provides a user-friendly interface for sending HTTP requests to APIs and inspecting the responses.
