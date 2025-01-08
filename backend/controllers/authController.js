
const db = require('../models/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { first_name, last_name, mobile_number, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const query = `INSERT INTO users (first_name, last_name, mobile_number, password) 
                   VALUES (?, ?, ?, ?)`;

    db.run(query, [first_name, last_name, mobile_number, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error saving user' });
      }

      const token = jwt.sign({ userId: this.lastID }, 'secretKey');

      return res.status(201).json({
        message: 'User registered successfully!',
        token: token
      });
    });
  });
};




exports.login = (req, res) => {
  const { password, mobile_number } = req.body;

  if (!password || !mobile_number) {
    return res.status(400).json({ message: 'Mobile number and password are required' });
  }

  const query = `SELECT * FROM users WHERE mobile_number = ?`;

  db.get(query, [mobile_number], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(401).json({ message: 'Invalid mobile number or password' });
    }

  
    bcrypt.compare(password, row.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid mobile number or password' });
      }

    
      const token = jwt.sign({ userId: row.id, mobile_number }, 'your_secret_key', { expiresIn: '1h' });

      return res.status(200).json({
        token,
        user: { firstName: row.first_name, lastName: row.last_name },
      });
    });
  });
};



exports.updateProfile = (req, res) => {
  const { first_name, last_name } = req.body;
  const userId = req.user.userId;

  const query = `UPDATE users SET first_name = ?, last_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

  db.run(query, [first_name, last_name, userId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error updating profile' });
    }

    return res.status(200).json({ message: 'Profile updated successfully' });
  });
};

exports.deleteAccount = (req, res) => {
  const userId = req.user.userId;

  const query = `DELETE FROM users WHERE id = ?`;

  db.run(query, [userId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting account' });
    }

    return res.status(200).json({ message: 'Account deleted successfully' });
  });
};


