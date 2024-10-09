// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const uri = 'mongodb://localhost:27017/express-api';

const seedUsers = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const username = 'CoderBryan';
        const password = 'CoderBryan05';

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

seedUsers();
