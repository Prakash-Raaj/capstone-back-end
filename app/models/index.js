import mongoose from 'mongoose';
import Role from './role.model.js';
import Tutorial from './tutorial.model.js';
import User from './user.model.js';
import Product from './product.model.js';
import Address from './address.model.js';
import Cart from './cart.model.js';
import Wishlist from './wishlist.model.js';
import Review from './review.model.js';
import Order from './order.model.js';

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.tutorial = Tutorial;
db.user = User;
db.role = Role;
db.product = Product;
db.address = Address;
db.review = Review;
db.wishlist = Wishlist;
db.cart = Cart;
db.order = Order;

db.ROLES = ['user', 'admin', 'moderator'];

export default db;
