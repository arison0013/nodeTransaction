const express = require("express");
const app = express();
 const cors = require("cors");
 require('./models');
 bodyParser = require('body-parser'),
// const connection = require("./dataBase");

app.use(express.json());
const PORT = 8000;
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// router
const router=require('./routes/transactionRouter.js')
app.use('/api/transaction',router)

app.get ('/', (req, res) => {
  res.json({message: 'welcome'});
  });

// app.get("/", (req, res) => {
//   connection.query("select * from transaction", (err, result) => {
//     if (err) {
//       res.send("Error");
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.post("/add-transaction", (req, res) => {
//   console.log("herer");
//   let date = new Date().toISOString();
//   const description = req.body.description;
//   const type = req.body.type;
//   const amount = req.body.amount;
//   let getLastQuery = `select * from transaction order by id DESC limit 1`;
//   connection.query(getLastQuery, (err, result) => {
//     console.log(result);
//     if (err) {
//       res.status(400).json({
//         status: 400,
//         message: err,
//       });
//     } else {
//       var total = 0;
//       console.log(result);
//       if (result.length) {
//         total = result[0].RunningBalance;
//       }
//       if (type == "credit") {
//         total = parseInt(total) + parseInt(amount);
//       } else if (type == "debit") {
//          if (parseInt(total) >= parseInt(amount)) {
//           total = parseInt(total) - parseInt(amount);
//         } else {
//           res.status(400).json({
//             status: 400,
//             message: "insufficient balance",
//           });
//           return;
//         }
//       }
//       var link = `Insert into transaction (date,description,type,amount,RunningBalance) VALUES('${date}','${description}','${type}','${amount}','${total}')`;
//       console.log(link);
//       connection.query(link, (error, result) => {
//         if (error) error;
//         res.send(result);
//       });
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running...${PORT}`);
});
