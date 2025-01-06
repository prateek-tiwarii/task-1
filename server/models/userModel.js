import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
   password:{
    type : String,
    required: true,
   },
   name:{
    type: String,
    required: true,
   },
   phone:{
    type: String,
    required: false,
   }

});


const User = mongoose.model("User", UserSchema);

export default User;