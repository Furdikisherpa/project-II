const { validationResult } = require('express-validator');
const db = require('../config/dbConnection');

const msg = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {SenderID, ReceiverID, Content } = req.body;

    const query = `
        INSERT INTO message (SenderID, ReceiverID, Content)
        VALUES (?, ?, ?)
    `;

    db.query(query, [SenderID, ReceiverID, Content], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Error inserting message", error: err });
        }
        return res.status(201).json({ msg: "Message send successfully"});
    });
};

module.exports = {
    msg
};
