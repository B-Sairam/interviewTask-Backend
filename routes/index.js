var express = require('express');
var router = express.Router();
const {Hashing, hashCompare} = require('../library/Auth');
const { Users, UserDetail } = require('../library/Schema');

// Creating account
router.post('/reg',async(req,res)=>{
  let {name,email,mobile,password} = req.body;
  const existUser = await Users.findOne({
    $or: [{
      "email": email
    }, {
      "mobile": mobile
    }]
  });
  try {
    if(!name||!email||!password||!mobile){
      return res.status(400).send("Enter the all Fields")
    }else if(existUser){
      return res.status(400).send("User is already exists!!")
    }else{
      let hash = await Hashing(password);
        req.body.password = hash;
        let user = await Users.create(req.body);
        if(user){
         return  res.status(201).json({
          message:"user created successfully",detail:user
        })
        }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
 

});
// Login
router.post('/login',async(req,res)=>{
  
  try {
    let {EmailPhone,password} = req.body;
    const data = await Users.findOne({
      $or: [{
        "email": EmailPhone
      }, {
        "phone": EmailPhone
    }]
    });
    if(!EmailPhone||!password){
      return res.status(400).send('Fill all the Requirements')
    }else if(data){
        let compare = await hashCompare(password,data.password);
        if(compare===true){
          return res.status(200).json({message:"Login Successful",user:data})
        }else{
          return res.status(400).send('Invalid Password')
         }
      }else{
        return res.status(401).send("Account does not exist");
      }
    
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
   
  }
  
})

// Adding user
router.post('/creatUser',async(req,res)=>{
  let {name,email,mobile,age} = req.body;
    if(!name||!email||!mobile||!age){
      return res.status(400).send("Enter the all Fields")
    }else{
      try {
        let user = await UserDetail.create(req.body);
        if(user){
            return res.status(201).send("User was Added")
        }else{
            return res.status(201).send("Error occur while Adding")
        }
    } catch (error) {
        return res.status(500).send("server error!!")
  
    }
    }

})

//Fetching User

router.get('/getUser',async(req,res)=>{
  try {
        let data = await UserDetail.find();
        return res.status(200).json({message:"Login Successful",user:data})
      } catch (error) {
        console.log(error);
      }
})
  
module.exports = router;
