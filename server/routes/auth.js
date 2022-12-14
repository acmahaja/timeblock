const express = require('express');
const AuthRouter = express.Router()

const User = require("../model/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");


AuthRouter.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({
          email: req.body.email,
        });
    
        if (!user) {
          res.json({ status: "error", error: "Invalid login" });
        }

        const checkPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        
        if (checkPassword) {
          const token = jwt.sign(
            {
              name: user.name,
              email: user.email,
            },
            process.env.SECRET_HASH
          );
          res.json({ status: "ok", token: token });
        } 
        else {
          res.json({ status: "error", error: "Invalid login" });
        }
      } catch (error) {
        res.json({ status: "error", error: "Something Broke" });
    
      }
})

AuthRouter.post('/register', async (req,res)=>{
    let user = User.findOne({
        email: req.body.email,
      });
    
      if (!user) {
        console.log(`⚠️ [Server]: Error\nUser Exists!`);
        res.json({ status: "error", error: "User Exists" });
      }
    
      try {
    
        req.body.password = await bcrypt.hash(
          req.body.password,
          Number.parseInt(process.env.SALT)
        );
    
        user = new User(req.body);
    
        await user.save();
    
        res.json({ status: "ok" });
      } catch (error) {
        console.log(`⚠️ [Server]: Error!\n${error}`);
    
        res.json({ status: "error", error: "Invalid User" });
      }
})

module.exports = {AuthRouter}