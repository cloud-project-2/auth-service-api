const express = require('express');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
require('dotenv').config();

app.use(cors());

const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Mount auth routes
app.use('/auth', auth);

//start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
