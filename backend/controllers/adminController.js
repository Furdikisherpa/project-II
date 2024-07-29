const { validationResult } = require('express-validator');//Importing validationResult from express-validator for validation result handling
const bcrypt = require('bcryptjs'); //Import bcrypt for password hashing
const db = require('../config/dbConnection');// Importing database connection

//Function to handle Admin registration
const admin = (req, res) =>{
    const errors = validationResult(req);//Getting validation errors

    if(!errors,isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

//Escaping user input to prevent SQL injection
const username = db.escape(req.body.email);
const password = req.body.password;
const email = db.escape(req.body.email);
const role = db.escape(req.body.contact);


db.query(
    'SELECT * FROM admin WHERE adminID = ${adminID} AND LOWER(Username)=LOWER(${username}) AND LOWER(Email) = LOWER(${email});',
    (err, result) => {
        if(err){
            return res.status(500).json({msg: 'Database query error'});
        }
        if(result && result.length){
            bcrypt.compare(password, result[0].Password,(err, isMatch)=>{
                if(err){
                    return res.status(500).json({msg:'Error comparing passwords'});

                }

                if(isMatch){
                    return res.redirect('../../frontend/src/components/Contacts');
                }else{
                    return res.status(401).json({msg:'Invalid credentials'});

                }
            });
        }else{
            return res.status(404).json({msg:'Admin not found'});
        }
    }
);

};

module.exports={
    admin
};