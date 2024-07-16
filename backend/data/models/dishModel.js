const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    dishId: {
        type: Number,
        unique: true
    },
    dishName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
    },
});

// Apply the auto-increment plugin to dishSchema
dishSchema.plugin(AutoIncrement, { inc_field: "dishId" });

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;