import mongoose from "mongoose";
import Role from "./role.model.js";
import Tutorial from "./tutorial.model.js";
import User from "./user.model.js";

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
// db.tutorial = Tutorial;
db.user = User;
db.role = Role;

db.ROLES = ["user", "admin", "moderator"];

export default db;
