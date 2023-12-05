import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./app/models/index.js";
import { tutorialRouter } from "./app/routes/turorial.routes.js";
import { authRouter } from "./app/routes/auth.routes.js";
import { userRouter } from "./app/routes/user.routes.js";
import { productRouter } from "./app/routes/product.routes.js";
import { addressRouter } from "./app/routes/address.routes.js";
import { wishlistRouter } from "./app/routes/wishlist.routes.js";
import { reviewRouter } from "./app/routes/review.routes.js";
import { cartRouter } from "./app/routes/cart.routes.js";
import { orderRouter } from "./app/routes/order.routes.js";

const app = express();

dotenv.config();
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const MONGO_URL = process.env.MONGO_URL;

db.mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const Role = db.role;

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

app.use("/tutorial", tutorialRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/address", addressRouter);
app.use('/order',orderRouter);

// require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to role collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to role collection");
      });
    }
  });
}
