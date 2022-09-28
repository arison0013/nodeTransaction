const { where } = require("sequelize");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const checkAuth= require("./midleware/auth")
const Transaction = db.transactions;
require('dotenv');
 SECRET_KEY="nodeApi"
const Users = db.users;
var hash = require('object-hash');

const getlastentry = async () => {
  return Transaction.findOne({
    order: [["id", "desc"]],
    limit: 1,
  })
    .then((res) => {
      if (res) {
        return res.runningBalance;
      }
      return 0;
    })
    .catch((e) => {
      return 0;
    });
};

const addTransaction = async (req, res) => {
  console.log(req.user)
  let info = {
    date: new Date().toISOString(),
    description: req.body.description,
    type: req.body.type,
    amount: req.body.amount,
  };

  var remAmt = await getlastentry();
  if (info.type == "credit") {
    remAmt = parseInt(remAmt) + parseInt(info.amount);
  } else if (info.type == "debit") {
    if (parseInt(remAmt) >= parseInt(info.amount)) {
      remAmt = parseInt(remAmt) - parseInt(info.amount);
    } else {
      res.status(400).json({
        message: "insufficient balance",
      });
      return;
    }
  }
  info["runningBalance"] = remAmt;
  const transaction = await Transaction.create(info);
  res.status(200).send(transaction);
};

//get
const getAllTransaction = async (req, res)=> {
  // var token=	req.headers.authorization.split(" ")[1];
  // console.log(token);
  // let tokenValid = false;
  // try {
  //   var decode=jwt.verify(token, SECRET_KEY);
  //   tokenValid = true;
  // } catch(e) {

  // }
  // console.log(decode);
  console.log(req.user)
  let transactions = await Transaction.findAll({});
  res.status(200).send(transactions);
};

// const registerUSer = async (req, res) => {
//   const email = req.body.email;
//   let password =req.body.password
//   let hashpassword=hash.MD5(password)
//   Users.findOne({ where: { email: email } }).then(
//     async (user) => {
//       if (user) {
//         res.status(400).json({ message: "user already registered" })
//       } else {
//         let userInfo = {
//           name: req.body.name,
//           email: req.body.email,
//           password:hashpassword
//         }
//         console.log(userInfo);

//         const token = jwt.sign({email:userInfo.email},secret_key)
//         const user = await Users.create(userInfo).then((r) => {
//           if (r) {
//             res.json({ message: 'success' })
//           }
//         });
//         res.status(200).send(user)
//       }
//     }).catch((err)=>{
//       res.status(400).json({ message: "user already registered" })
//     })
// };

// const loginUser = async (req, res) => {
//   let reqpassword = hash.MD5(req.body.password);
//   console.log("jkjkkh", reqpassword);
//   const { email } = req.body
//   Users.findOne({ where: { email: email } }).then(
//     async (user) => {
//       let password_valid = user.password
//       if (user) {
//         if (reqpassword == password_valid) {
//           res.status(200).json({ message: 'login sucessfull', user: user })
//         } else {
//           res.status(400).json({ message: "password did not match" })
//         }
//       }
//     }).catch((err) => {
//       res.json({ message: err })
//     })
// };

const registerUSer = async (req, res) => {
  const { name, email, password } = req.body;
  let hashpassword = hash.MD5(password)
  try {
    const existingUSer = await Users.findOne({ where: { email: email } }).catch((err) => { console.log("Error:", err) });
    if (existingUSer) {
      res.status(400).json({ message: "user already registered" })
    }
    const newUser = new Users({ name, email, password: hashpassword });
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error:", err);
      res.status(400).json({ error: "connot register user at the moment!" });
    });
    // const token = jwt.sign({ email: Users.email }, process.env.SECRET_KEY);
    if (savedUser) {
      res.status(200).json({ message: "thanks for registering", user: savedUser })
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" })
  }
};

const loginUser = async (req, res) => {
  let reqpassword = hash.MD5(req.body.password);
  const { email, password } = req.body;
  try {

    const userWithEmail = await Users.findOne({ where: { email } }).catch((err) => {
      console.log("Error:", err);
    });

    if (!userWithEmail) {
      return res.status(400).json({ message: "user not found! plz register first" })
    }
    if (userWithEmail.password !== reqpassword) {
      return res.status(400).json({ message: "Password not matched" })
    }

    const jwtToken = await jwt.sign({ id: userWithEmail.id, email: userWithEmail.email },SECRET_KEY,{expiresIn:"7d"},{ algorithm: 'RS256' });
    res.status(200).json({ message: "Login Successfull", user: userWithEmail, token: jwtToken })

  } catch (err) { res.status(500).json({ message: "something went wrong" }) };
}

module.exports = {
  addTransaction,
  getAllTransaction,
  registerUSer,
  loginUser
};
