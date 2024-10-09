const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Tasks } = require('./models/Tasks');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error(error));

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({
            success: true,
            message: 'Login Successfully!',
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/logout', authenticateToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logout Successfully',
    });
});


app.post('/api/items', authenticateToken, async (req, res) => {
    const { name, description } = req.body;
    
    try {
        const newItem = new Tasks({ name, description });
        const savedItem = await newItem.save();
        res.status(201).json({
            success: true,
            message: 'Item created successfully!',
            item: savedItem
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/items/:id', authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedItem = await Tasks.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

        res.status(200).json({
            success: true,
            message: 'Item updated successfully!',
            item: updatedItem
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/api/items', authenticateToken, async (req, res) => {
    try {
        const items = await Tasks.find();

        res.status(200).json({
            success: true,
            message: 'Ites fetched successfully!',
            item: items
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/items/:id', authenticateToken, async (req, res) => {
    try {
        const item = await Tasks.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.status(200).json({
            success: true,
            message: 'Item fetched successfully!',
            item: item
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/items/:id', authenticateToken, async (req, res) => {
    try {
        const deletedItem = await Tasks.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

