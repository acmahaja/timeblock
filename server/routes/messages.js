const express = require('express');
const MessagesRouter = express.Router()

const User = require("../model/User");
const UserData = require("../model/UserData");
const {verifyAccessToken} = require('../utils/auth')
const dotenv = require("dotenv");
dotenv.config();


MessagesRouter.post('/message', verifyAccessToken, async(req,res)=> {
    try {
        const decoded = res.locals.decoded;
        const user = await User.findOne({
          email: decoded.email,
        });
        let userData = new UserData({
            user: user._id,
            Message: req.body.message,
        })
    
        await userData.save()
    
        res.json({ status: "ok", userData: userData.id });
    
    
      } catch (error) {
        res.json({ status: "error", error: "Failed to add message" });
      }
})  

MessagesRouter.get('/message', verifyAccessToken, async (req, res)=>{
    try {
        const decoded = res.locals.decoded;
        

        const user = await User.findOne({
            email: decoded.email
        });

        console.log(user);
    
        const userData = await UserData.find({
            user: user._id
        });
        
        console.log(userData);

        res.json({ status: "ok", data: userData });
      
    } catch (error) {
        console.log(error);
        res.json({ status: "error", error: "Something Broke getting" });
      
    }
})

module.exports = {MessagesRouter}
