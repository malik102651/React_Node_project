const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const cors = require('cors');
const path = require("path");
const { dirname } = require("path");


const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("API is running......");
// });
// app.get('/api/notes', (req, res) => {
//     res.json(notes);
// });
// app.get('/api/notes/:id', (req, res) => {
//     const note = notes.find((n) => n._id === req.params.id);
//     res.send(note);
// });

const corsOptions = {
     origin: 'http://localhost:3000',
    //origin: 'https://react-node-note-app1.herokuapp.com',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

//------------ DEPLOYMENT -----------------


__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    })

} else {
    app.get('/', (req, res) => {
        res.send("API is running......");
    });
}

//------------ DEPLOYMENT -----------------

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));