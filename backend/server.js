const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require('body-parser');
const verifyToken = require('./authMiddleware')

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

// Connect to MongoDB (replace 'your_mongodb_uri' with your actual MongoDB URI)
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a user schema
const spaceSchema = new mongoose.Schema({
    spaceName: String,
    spaceDescriptions: String,
    spacetags: [String],
    spaceImage: [String],
    spaceCoordinate: {
      latitude: Number,
      longitude: Number,
    },
    spaceAddress: String,
  });
  
  const collectionSchema = new mongoose.Schema({
    collectionName: String,
    spaces: [spaceSchema],
    collectionImage: String,
    collectionDescription: String,
  });
  
  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    collections: [collectionSchema],
  });


const User = mongoose.model("User", userSchema);

// Sign up endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        password: hashedPassword,
        collections: [
          {
            collectionName: 'All Spaces',
            collection: [],
            collectionImage: 'linear-gradient(135deg, hsl(108, 100%, 80%), hsl(138, 100%, 85%))', // You can add an image URL if needed
            collectionDescription: 'Default collection for all spaces',
          },
        ],
      });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sign in endpoint
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post('/space', async (req, res) => {
    try {

      const username = jwt.verify(req.header('Authorization'), 'your_secret_key').username;

      const {  spaceDescriptions, spacetags, bufferImages, placeId, collectionNames } = req.body;
    
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const collection = user.collections.find((col) => col.collectionName === collectionNames);

      if (!collection) {
        return res.status(404).json({ error: 'Collection not found' });
      }
  

          // Fetch latitude and longitude from Google Places API
      const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyBprJC4VwGTWaT9a7rI5reRU17jqXSuAIY`;
      const placeDetailsResponse = await fetch(googlePlacesApiUrl);
      const placeDetails = await placeDetailsResponse.json();

      // Extract latitude and longitude from the response
      const { lat, lng } = placeDetails.result.geometry.location;
      const address = placeDetails.result.formatted_address;
      console.log(spacetags);

      const spaceImage = bufferImages.map((base64Image) => Buffer.from(base64Image, 'base64').toString('base64'));

      spaceName = placeDetails.result.name;
      
    
      console.log(spaceImage)
  
      collection.spaces.push({
        spaceName,
        spaceDescriptions,
        spacetags,
        spaceImage,
        spaceCoordinate: { latitude: lat, longitude: lng },
        spaceAddress: address
      });
  
      // Save the updated user object
      await user.save();
  
      res.status(201).json({ message: 'Space created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/collection', async (req, res) => {
    try {
      const username = jwt.verify(req.header('Authorization'), 'your_secret_key').username;
      
      const { collectionName, collectionDescription, collectionImage } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Create a new collection and add it to the user's collections array
      const newCollection = {
        collectionName,
        spaces: [], // Empty spaces array
        collectionDescription,
        collectionImage,
      };
  
      user.collections.push(newCollection);
  
      // Save the updated user object
      await user.save();
  
      res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Define the endpoint for retrieving collections for a user
  app.get('/collections', verifyToken, async (req, res) => {
    try {
      const username = jwt.verify(req.header('Authorization'), 'your_secret_key').username;
      console.log(username)
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the user's collections
      res.status(200).json({ collections: user.collections });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/:collectionName/spaces', async (req, res) => {
    try {
      const { collectionName } = req.params;
      const { username } = req.query;
        console.log(username)
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the collection within the user's collections
      const collection = user.collections.find((col) => col.collectionName === collectionName);
  
      if (!collection) {
        return res.status(404).json({ error: 'Collection not found' });
      }
  
      // Retrieve all spaces for the specified collection
      const spaces = collection.spaces;
  
      res.status(200).json({ spaces });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  app.get('/collectionNames', async (req, res) => {
    try {
      const username = jwt.verify(req.header('Authorization'), 'your_secret_key').username;
      console.log(username)
      // Find the user by their ID
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Extract collection names from the user's collections
      const collectionNames = user.collections.map(collection => collection.collectionName);
  
      res.json({ collectionNames });
    } catch (error) {
      console.error('Error fetching user collections:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/getAllTags', async (req, res) => {
    try {
      // Aggregate all tags from all users and collections
      const tagCounts = await User.aggregate([
        { $unwind: '$collections' },
        { $unwind: '$collections.spaces' },
        { $unwind: '$collections.spaces.spacetags' },
        {
          $group: {
            _id: '$collections.spaces.spacetags',
            count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, tag: '$_id', count: 1 } },
      ]);
  
  
      // // Extract the unique tags from the result
      // const uniqueTags = allTags.length > 0 ? allTags[0].tags : [];
  
      res.json({ tags: tagCounts });
    } catch (error) {
      console.error('Error fetching unique tags:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
