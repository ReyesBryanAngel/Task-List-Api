# Task List API

A simple task list api built with Express.js and MongoDB.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com)
- [MongoDBCompass](https://www.mongodb.com/products/tools/compass)

### Installation

1. Clone the repository:

   ```bash
   git clone <app repository>

2. Install the necessary dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and add the following environment variables:
    MONGO_URI=mongodb://localhost:27017/express-api
    PORT=3000
    JWT_SECRET=706504645b53b196f7bc918edcd94fd8042d4d623dd96afbcc2777a7042fae0525479418c4ffb9d2c3c1d75856af73faa5436d69da41a8206b9bc7c142a8abb5906e70b4227251e6a9682121190052a9ed39dd8aa77b41f1446f97138211894d76d6af1f1d83829d993ea23f5b7d518d61693878ebad1365e1cbd475c34ae26b31e9e4b4c45ac7a8bc4ad7c20cda18d83927f89ab2761c3591d491305063c8dddae2196ca2d2f7598bf99d7e38757d30f27217f351a047a9afa8921e0517cde21f648cd6f6f8d9a9fc3a0c0caa682ce365a126b4d62ec889fcb13d7990edce6d5aa12b6e53ffe9eb2b2a6584e4dd85b47740b701f02500268333d339d75de89d

4. Run this command to seed in the database the authorized user.
    ```bash
    node seeder.js

5. Start running the local server from the compass and run the respository locally
    ```bash
    node server.js

### User Credential

 - Username: CoderBryan
 - Password: CoderBryan05
