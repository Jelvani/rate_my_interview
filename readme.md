# Rate My Interview

## A fullstack application for giving your interview experience
***

This project is built using the [MERN](https://www.mongodb.com/mern-stack) stack. The website uses MongoDB Atlas for its cloud databse, and also provide authentication with Google OAuth.

## Getting Started

In order to run this demo, you must have [Node.js and NPM](https://nodejs.org/en/download/) installed.

1. Clone the repo
2. Create the file `server/config.env` and set the following environment variables:
    * `PORT` for your express server port
    * `ATLAS_URI` for your MongoDB Atlas connection string URI
    * `CLIENT_ID` for your google OAth Client ID
3. In the root folder, run `npm install` to install all dependecies from `package.json`
4. Start server with `npm run server`
5. Start client with `npm run client`

## Production Instructions

To prepare project for production, run `npm run build`. This will bundle react in production mode, and move this build folder into the `server/public/build` directory, to be served by the express.js server when starting it with `npm start`.

## File Structure

***
* `frontend`
    * Contains our create-react-app project files for our client code.

* `server`
    * Contains our express.js project files for our server side code.

* `config.env`
    * A plain text file containing environment variables to be used by our express.js server. This file can contain sensisitve information, so notice that it is excluded from the git project through our `.gitignore` file.

* `package.json`
    * This contains all our dependecies for `npm` to use. It also contains some scripts, which allow us to get our server and front end running in development and production. Also notice it contains a proxy parameter. This is used when the client and server are running on different ports during production. It allows the client to proxy requests to the servers port, which avoids the need for [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## Resources

[Express Intro](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)

[MERN Stack Intro](https://www.mongodb.com/languages/mern-stack-tutorial)
