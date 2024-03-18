const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Card = require('../models/card-model');
const User = require('../models/user-model');

const fs = require('fs');
const { ImgurClient } = require('imgur');
const client = new ImgurClient({ clientId: process.env.CLIENT_ID });

const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dias6f7s6', 
  api_key: '699684633821569', 
  api_secret: 'b97LZhu3XsnIeDVl_SEHf4LF3gs' 
});

const newCard = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        console.log("body", req.body);
        console.log("buffer", req.file.buffer);
        if (user) {
            const uploadedImage = await cloudinary.uploader.upload_stream({
                resource_type: "image",
                folder: "your_folder_name" // Optional: Specify the folder where you want to store the images
            }, async (error, result) => {
                if (error) {
                    console.error("Error uploading image to Cloudinary:", error);
                    return res.status(500).json({ message: "Error uploading image to Cloudinary" });
                } else {
                    console.log("Image uploaded successfully to Cloudinary:", result.url);
                    const body = req.body;
                    console.log(body.tags);
                    const newCard = new Card({
                        title: body.title,
                        ownerUsername: body.ownerUsername,
                        image: result.url,
                        websiteLink: body.websiteLink,
                        likes: 0,
                        dislikes: 0,
                        description: body.description,
                        tags: body.tags
                    });
                    user.cards.push(newCard._id);
                    await user.save(); // Ensure user.save() and newCard.save() are awaited
                    await newCard.save();
                    // Send success response
                    return res.status(200).json({ message: "Card created successfully" });
                }
            });
            // Pipe the file buffer directly to the upload stream
            uploadedImage.end(req.file.buffer);
        } else {
            console.log("failure");
            // Send failure response
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        // Send error response
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loadCards = async(req, res) => {
    console.log("loading all cards")
    try {
        const cards = await Card.find();
        res.json(cards);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const updateCard = async(req, res) => {
    try {
        const card = await Card.findOne({ _id: req.body._id });
        if (card) {
            card.title = req.body.title;
            card.ownerUsername = req.body.ownerUsername;
            card.image = req.body.image;
            card.websiteLink = req.body.websiteLink;
            card.likes = req.body.likes;
            card.dislikes = req.body.dislikes;
            card.description = req.body.description;
            card.tags = req.body.tags;
            card.save();
            res.json(card);
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const deleteCard = async (req, res) => {
    console.log("deleting card");
    try {
      const user = await User.findOne({ _id: req.userId });
      if (user) {
        console.log("found user", user);
        console.log("req", req.params);
        
        // Find the card by ID and remove it
        const deletedCard = await Card.findOneAndDelete({ _id: req.params.id });
  
        // Remove the deleted card from the user's cards array
        user.cards.pull(deletedCard);
  
        // Save the user to persist changes
        await user.save();
  
        console.log("Card deleted:", deletedCard);
  
        res.json({}); // Respond with success
      } else {
        console.log("failure");
        // Send failure response
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      // Send error response
      return res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    newCard,
    loadCards,
    updateCard,
    deleteCard
};