const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongoURI='mongodb://0.0.0.0:27017/nextauth'
const User = require('./schemas/user-schema');

const connect = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected...");
	} catch (e) {
		console.log("MongoDB does not connected...", e.message);
	}

	return mongoose.connection;
};

connect();

app.use(cors());
app.use(express.json())

app.get('/', function(req, res) {
    res.json('Your server')
})

app.post('/register', async function(req, res) {
	const { email } = req.body;
	
	try {
	  const existingUser = await User.findOne({ email });
  
	  if (existingUser) {
		return res.status(400).json({
		  message: 'Email already exists',
		});
	  }
  
	  const user = await new User(req.body).save();
	  
	  if (user) {
		return res.status(201).json({
		  message: 'User created successfully',
		  user: {
			id: user._id,
			username: user.username,
			email: user.email,
		  }
		});
	  } else {
		return res.status(500).json({
		  message: 'Internal server error',
		});
	  }
	} catch (error) {
  
	  return res.status(500).json({
		message: 'Internal server error',
		error: error.message,
	  });
	}
  });
  
// app.post('/register', async function(req, res) {
// 	const { email } = req.body;
// 	const existingUser = await User.findOne({ email });

// 	if (existingUser) {
// 		return res.status(400).json({
// 		message: 'Email already exists',
// 		});
// 	}

//     const user = await new User(req.body).save();
	
// 	if(user) {
// 		return res.status(201).json({
// 			message: 'User created successfully',
// 			user: {
// 			  id: user._id,
// 			  username: user.username,
// 			  email: user.email,
// 			}
// 		  });
// 	}
// 	return res.status(500).json({
// 		message: 'Internal server error',
// 		error: error.message 
// 	  });
// })

app.post('/login', async function(req, res) {
    try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		
		if (!user) {
		  return res.status(401).json({ message: 'User not found' });
		}
	
		if (password !== user.password) {
		  return res.status(401).json({ message: 'Incorrect password' });
		}

		return res.status(200).json({ message: 'Login successful', user });
	  } catch (error) {
		console.error('Login error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	  }
})

app.listen(4000, () => {console.log('server started...')})