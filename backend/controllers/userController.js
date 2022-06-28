const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");
const jwt = require("jsonwebtoken");


const regiseterUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User Already Exist");

    }


    const user = await User.create({
        name,
        email,
        password,
        pic,
    });




    if (user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Error Occured!")
    }



});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
console.log(req)

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password!")
    }

});

const user = asyncHandler(async (req, res) => {
    

    console.log(req)
    res.status(404).json({ message: "User not found" })
    // const decoded = jwt.verify(req.params.token,process.env.JWT_SECRET);



    // // const decoded = jwt.verify(req.body.token,process.env.JWT_SECRET);
    //  console.log(decoded)
    //  const user = await User.findOne( {uid:decoded.uid} );

    //  //const data = await user.save();
    
    // // const userdata = await Note.findById(req.params.token);
    // // //console.log(req.params.token)
    //  if (user) {
    //      res.json(user)
    //  } else {
    //      res.status(404).json({ message: "User not found" })
    //  }

});

const userData = asyncHandler (async (req,res)=>{
    console.log(req.body.usertoken)
    // console.log(req.params.usertoken)
    //    const decoded = jwt.verify(req.params.usertoken,process.env.JWT_SECRET);
    try {
        var token = req.body.usertoken.replace('"', "").replace('"', "")
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //console.log(jwt.verify(token,process.env.JWT_SECRET))
        console.log("decoding", decoded)
        const user = await User.findById(decoded.uid);
        console.log("helloo")
        console.log("user",user)
        if (user) {
         res.status(201).json({
             _id: user._id,
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin,
             pic: user.pic,
             token: token
         });
      } else {
          res.status(404).json({ message: "User not found" })
      }
      
        
    } catch (error) {

        res.status(401);
        throw new Error("Not authorized, token failed")
        
    }




  

    // // //  //const data = await user.save();
    
    // // // // const userdata = await Note.findById(req.params.token);
    // // // // //console.log(req.params.token)
   

})
// const userData = asyncHandler (async (req,res)=>{
//     console.log(req.body.token)
//     // console.log(req.params.usertoken)
//     //    const decoded = jwt.verify(req.params.usertoken,process.env.JWT_SECRET);

//     // var token = req.body.usertoken.replace('"', "").replace('"', "")
//     try {

//         const decoded = jwt.verify(req.body.token,process.env.JWT_SECRET);
        
//     } catch (error) {
//         res.status(401);
//          throw new Error("Not authorized, token failed")
//     }
    
//     //console.log(jwt.verify(token,process.env.JWT_SECRET))
//     console.log("decoding", decoded)
//     //   jwt.verify(token,process.env.JWT_SECRET, function(err, decoded){

//     //     console.log(decoded, err)
//     //   })
//        const user = await User.findById( decoded.uid );
//        console.log(user)

//     // // //  //const data = await user.save();
    
//     // // // // const userdata = await Note.findById(req.params.token);
//     // // // // //console.log(req.params.token)
//      if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             pic: user.pic,
//             token: req.body.token
//         });
//      } else {
//          res.status(404).json({ message: "User not found" })
//      }

// })

// const tokenauthentication = asyncHandler(async (req, res) => {
//     const jwt = require("jsonwebtoken");
//     const token = req.query.token;

//     console.log(token)
//     if (!token) {
//         return res.status(401).json({ message: "Must pass token" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         //console.log(user)
        
//         if (err) {
//             res.send(err.message)
//         } else {

//            User.findById(user.uid,(err,res)=>{
//                if(err) throw err;
//                console.log(res)
//            })
           



            
//         }

//         // console.log(user)

//         // if (err) throw err;



//         // User.findById({
//         //     "_id": user._id
//         // }, function (err, user) {
//         //     if (err) throw err;
//         //     res.json({
//         //         user: user,
//         //         token: token
//         //     });
//         // });
//     })
// })
module.exports = { regiseterUser, authUser,user,userData };
    // tokenauthentication 
