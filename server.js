const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const studentModel = require('./models/user');
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Employee')
    .then(() => {
        console.log("DB Connected successfully");
    })
    .catch((err) => {
        console.error("Not connected successfully " + err);
    });

app.get("/", (req, res) => {
    console.log("All working");
    res.send("Server is running");
});

app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
        const existingUser = await studentModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await studentModel.create({ name, email, password: hashedPassword });
      res.json(user);

    } catch (err) {
      console.error('Error registering user:', err.message);
      if (err.code === 11000) { 
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
      try {
      const user = await studentModel.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'secret123', { expiresIn: '3600s' }); // Token expires in 1 hour
  
      res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });


app.post('/displayUsers', async(req,res)=>{
  const users = await studentModel.find()
  res.json(users)
})

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing required parameter: id' });
    }
    const deletedUser = await studentModel.findByIdAndDelete(mongoose.Types.ObjectId(id));
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
    console.log("Application is running on port " + port);
});
