const mongoose = require("mongoose");

const SmoothiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A custom Smoothie Name is required"],
      minlength: [
        3,
        "The name of your smoothie must be at least 3 characters.",
      ],
    },

    method: {
      type: String,
      required: [true, "Please select an option"],
      // drop-down options
      enum: [
        "Pick-up", 
        "Delivery",
      ],
    },

    size: {
      type: String,
      required: [true, "Please select a size for your smoothie!"],
      enum: [
      "Small",
      "Medium", 
      "Large", 
      "SuperSip",
      ],
    },

    quantity: {
      type: Number,
      required: [true, "Please select a quantity for your smoothie order!"],
      minlength: [
        1,
        "Quanitity must be at least 1 in order to purchase a smoothie!",
      ],
    },

    liquid: {
      type: String,
      required: [true, "Please select a base liquid!"],
      enum: [
        "Fruit Juice",
        "Soy Milk",
        "Milk",
        "Oat Milk",
        "Yogurt",
        "Ice-Cream",
      ],
    },
  fruits: {
    type: [String],
    // enum: [
    //   "tropicalFruit",
    //   "mixedBerry",
    //   "mango",
    //   "pomegranite",
    //   "acaiBerry",
    //   "blueberry",
    //   "banana",
    //   "raspberry",
    //   "orange",
    //   "pineapple",
    // ],
},
  veggies: { 
    type: [String],
    // enum: [
    // "kale",
    // "swissChard",
    // "Avocado",
    // "Cucumber",
    // "Mint",
    // "winter Squash",
    // "beets",
    // "celery",
    // ], 
  },
  extras: {
    type: [String],
    // enum:  [
    //   "Chocoloate Protein Powder",
    //   "Vanilla Protein Powder",
    //   "Chia",
    //   "Aloe",
    //   "Cinnamon",
    //   "Cayenne",
    //   "flax",
    //   "Goji Berry",
    //   "Hemp",
    // ], 
//     fruits: {
//       tropicalFruit: { type: Boolean, required: false, default: false },
//       mixedBerry: { type: Boolean, required: false },
//       mango: { type: Boolean, required: false, default: false },
//       pomegranite: { type: Boolean, required: false, default: false },
//       acaiBerry: { type: Boolean, required: false, default: false },
//       blueberry: { type: Boolean, required: false, default: false },
//       banana: { type: Boolean, required: false, default: false },
//       raspberry: { type: Boolean, required: false, default: false },
//       Pineapple: { type: Boolean, required: false, default: false },
//       Orange: { type: Boolean, required: false, default: false },
//   },

//     veggies: { 
//       kale: { type: Boolean, required: false, default: false },
//       swissChard: { type: Boolean, required: false, default: false },
//       avocado: { type: Boolean, required: false, default: false },
//       cucumber:{ type: Boolean, required: false, default: false },
//       spinach: { type: Boolean, required: false, default: false },
//       mint: { type: Boolean, required: false, default: false },
//       winterSquash: { type: Boolean, required: false, default: false },
//       beets: { type: Boolean, required: false, default: false },
//       celery: { type: Boolean, required: false, default: false },
//     },

//     extras: {
//       proteinPowderChoc: { type: Boolean, required: false, default: false },
//       proteinPowderVan: { type: Boolean, required: false, default: false },
//       chia: { type: Boolean, required: false, default: false },
//       aloe: { type: Boolean, required: false, default: false },
//       cinnamon: { type: Boolean, required: false, default: false },
//       cayenne: { type: Boolean, required: false, default: false },
//       flax: { type: Boolean, required: false, default: false },
//       gojiBerry: { type: Boolean, required: false, default: false },
//       hemp: { type: Boolean, required: false, default: false },
//     },
    favorited: {type: Boolean, default:false},
  },
  ordered: {type: Boolean, default:false},
  },
  {
    timestamps: true,
  },
 
);

module.exports = mongoose.model("Smoothie", SmoothiesSchema);




// SmoothiesSchema.method('FruitsList', function(){
//   var list = [];
//   var obj = SmoothiesSchema.fruits
//   for (key in Object.keys(obj)){
//     if(obj[key]){
//       list.push(key);
//     }
//   }
//   return list;
// })
// SmoothiesSchema.method('VeggiesList', function(){
//   var list = [];
//   var obj = SmoothiesSchema.veggies
//   for (key in Object.keys(obj)){
//     if(obj[key]){
//       list.push(key);
//     }
//   }
//   console.log(list);
//   return list;
// })

