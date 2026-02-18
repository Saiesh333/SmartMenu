const mongoose = require("mongoose");
const Food = require("../models/Food");

require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);


const foods = [

/* ---------------- APPETIZERS ---------------- */
{ name:"Fried Papad", category:"Appetizers", type:"Veg", price:79, image:"fried_papad.jpg"},
{ name:"Roasted Papad", category:"Appetizers", type:"Veg", price:69, image:"roasted_papad.jpg"},
{ name:"French Fries", category:"Appetizers", type:"Veg", price:239, image:"french_fries.jpg"},
{ name:"Peri Peri Fries", category:"Appetizers", type:"Veg", price:259, image:"peri_peri_fries.jpg"},

/* ---------------- VEG STARTERS ---------------- */
{ name:"Paneer Tikka", category:"Veg Starters", type:"Veg", price:259, image:"paneer_tikka.jpeg"},
{ name:"Hariyali Paneer Tikka", category:"Veg Starters", type:"Veg", price:279, image:"hariyali_paneer.jpg"},
{ name:"Honey Chilli Paneer", category:"Veg Starters", type:"Veg", price:249, image:"honey_chilli_paneer.jpg"},
{ name:"Veg Manchurian Dry", category:"Veg Starters", type:"Veg", price:229, image:"veg_manchurian.jpg"},
{ name:"Crispy Corn", category:"Veg Starters", type:"Veg", price:219, image:"crispy_corn.jpg"},

/* ---------------- NON VEG STARTERS ---------------- */
{ name:"Chicken Lollipop", category:"Non-Veg Starters", type:"Non-Veg", price:379, image:"chicken_lollipop.jpg"},
{ name:"Chicken Tikka", category:"Non-Veg Starters", type:"Non-Veg", price:359, image:"chicken_tikka.jpg"},
{ name:"Chilli Chicken", category:"Non-Veg Starters", type:"Non-Veg", price:339, image:"chilli_chicken.jpg"},
{ name:"Chicken 65", category:"Non-Veg Starters", type:"Non-Veg", price:329, image:"chicken65.jpg"},

/* ---------------- MAIN COURSE VEG ---------------- */
{ name:"Paneer Butter Masala", category:"Main Course Veg", type:"Veg", price:299, image:"pbm.jpg"},
{ name:"Kadai Paneer", category:"Main Course Veg", type:"Veg", price:289, image:"kadai_paneer.jpg"},
{ name:"Dal Tadka", category:"Main Course Veg", type:"Veg", price:219, image:"dal_tadka.jpg"},
{ name:"Mix Veg", category:"Main Course Veg", type:"Veg", price:249, image:"mix_veg.jpg"},

/* ---------------- MAIN COURSE NON VEG ---------------- */
{ name:"Butter Chicken", category:"Main Course Non-Veg", type:"Non-Veg", price:379, image:"butter_chicken.jpg"},
{ name:"Chicken Kadai", category:"Main Course Non-Veg", type:"Non-Veg", price:359, image:"chicken_kadai.jpg"},
{ name:"Chicken Curry", category:"Main Course Non-Veg", type:"Non-Veg", price:329, image:"chicken_curry.jpg"},

/* ---------------- BIRYANI ---------------- */
{ name:"Veg Biryani", category:"Biryani", type:"Veg", price:259, image:"veg_biryani.jpg"},
{ name:"Paneer Biryani", category:"Biryani", type:"Veg", price:279, image:"paneer_biryani.jpg"},
{ name:"Chicken Biryani", category:"Biryani", type:"Non-Veg", price:329, image:"chicken_biryani.jpg"},
{ name:"Mutton Biryani", category:"Biryani", type:"Non-Veg", price:399, image:"mutton_biryani.jpg"},

/* ---------------- DESSERT ---------------- */
{ name:"Gulab Jamun", category:"Dessert", type:"Veg", price:99, image:"gulab_jamun.jpg"},
{ name:"Ice Cream", category:"Dessert", type:"Veg", price:129, image:"icecream.jpg"},
{ name:"Brownie with Ice Cream", category:"Dessert", type:"Veg", price:179, image:"brownie.jpg"},

];

async function seed(){
  await Food.deleteMany();
  await Food.insertMany(foods);
  console.log("FULL MENU INSERTED");
  process.exit();
}

seed();
