require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/dbConnection');

const userRouter = require('./routes/userRoute')

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors());

app.use('/api', userRouter);

app.post('/login', (req,res)=>{
    const sql = "SELECT *FROM user WHERE 'Username'=? AND 'password'=?";
    db.query(sql, [req.body.Username, req.body.password], (err, data)=>{
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("success");
            }
            else {
                return res.json("Fail");
            }
    })
})

//error handling
app.use((err, req, res, next) => {
    err.statusCode=err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({message: err.message,

    });
});


app.listen(3000, ()=>console.log('Server is running on port 3000'));