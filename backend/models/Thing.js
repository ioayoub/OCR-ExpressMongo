import mongoose from "mongoose";

const thingSchema = mongoose.Schema({
    title: {type : String, required: true},
    description: {type: String, required: true},
    imageUrl : {type: String, required: true},
    userId: {type: String, required: true},
    price : {type: Number, required: true }
});

// module.exports = mongoose.model('Thing', thingSchema);
const Thing = mongoose.model("Thing", thingSchema);

export default Thing;