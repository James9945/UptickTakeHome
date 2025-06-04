const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const BookController = require('./Controllers/BookController');

const BooksRoutes = require('./Routes/BooksRoutes');
const UserRoutes = require('./Routes/UserRoutes');
const app = express();

app.listen(3000, ()=>{
    console.log("server running at port 3000")
})



app.use(express.json());


app.use('/api/books', BooksRoutes);
app.use('/api/users', UserRoutes);


//Root route for public book listing:
app.get('/', BookController.getAllBook);



const str = process.env.MONGO_URI;
mongoose.connect(str)
.then(()=> {
    console.log("Connected Successfully");  
})
.catch((error)=> {
    console.log("Connection failed",error.message);
});