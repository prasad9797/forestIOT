const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const path = require("path");
const pgp = require("./dbinit/dbConn").pgp;

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("common"));
app.disable("etag");

app.get("/api", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Health check successful",
    data: null,
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  //__dirname : It will resolve to your project folder.
});

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/store", async (req, res) => {
  try {
    console.log("Hello");
    var array = req.body.array;
    var danger = 0;
    for (let i = 0; i < 4; i++) {
      if (array[i] == "1" || array[2] < "6" || array[2] > "7") {
        danger = 1;
        // var nodemailer = require("nodemailer");

        // var transporter = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: "quric02@gmail.com",
        //     pass: "prasad@123",
        //   },
        // });

        // var mailOptions = {
        //   from: "quric02@gmail.com",
        //   to: "quric9797@gmail.com",
        //   subject: "Forest in danger Alert",
        //   text: `Someone is harming the forest at location ${lat},${long}`,
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //   }
        // });
      }
    }

    result = await pgp.query(
      "INSERT INTO sensordata (fire, sound, ph, gyro, gx, gy, gz, lat, long, danger) VALUES (${fire},${sound},${ph},${gyro},${gx},${gy},${gz},${lat},${long},${danger})",
      {
        fire: array[0],
        sound: array[1],
        ph: array[2],
        gyro: array[3],
        gx: array[4],
        gy: array[5],
        gz: array[6],
        lat: array[7],
        long: array[8],
        danger: danger,
      }
    );
    var sum = 10;
    res.json({ result: sum });
  } catch (err) {
    next(err);
  }
});

app.get("/sensordata", async (req, res, next) => {
  try {
    var result = await pgp.query("select * from sensordata");
    console.log(result);
    res.status(200).json({
      message: `found ${result.length} templates`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

app.put("/updatedata", async (req, res, next) => {
  try {
    console.log("hello1");
    var result = await pgp.query(
      "UPDATE sensordata SET danger = '0', fire = '0', sound = '0', ph = 7, gyro = '0'  WHERE danger='1'"
    );
    console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const port = process.env.PORT || 5100;

app.listen(port, () => console.log(`Server is listening on ${port}`));
