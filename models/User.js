// const mongoose = require('mongoose');
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// method-kan wuxu fuli marku user-ka rabo inuu email cusub sameesto
const userSchema = new mongoose.Schema({
    name: String,
    // email-kan maso laaban karo demek 
    email: { type: String, unique: true },
    password: String,
    // here for authorization.role-ka labadan midkood ayuu noqon kara. user or admin
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

// hash password before saving

// userSchema intaadan diiwan galin kahor oo save adan sameenin shaqadan ii qabo
userSchema.pre('save', async function () {
    // hadii password-ka la update-gareenin, kaliya use it when password-ka la badalo
    if(!this.isModified('password')) return ;

    // lkn hadii passwordka wax laga badalo yani he made update his password
    // bu salt=meeqo round ayan u isticmaali doonaa
    const salt = await bcrypt.genSalt(10)
    // halkan waan hash-gareenay kadib next usii gudub
    this.password = await bcrypt.hash(this.password, salt);

})

// we need also another method to compare password
// this method compares password-ka haduu isku mid yhy waxa user-ka uu hore u sameestay waa true hadii kale neh false ayuu so dhihi yani password-ka aya qaldan
userSchema.methods.comparePassword = function(inputPassword) {
    return bcrypt.compare(inputPassword, this.password)
}

// model-ka halkan anka sameenay otamatik mongoDB ayan lagu diiwan galinayaa
// module.exports = mongoose.model('User', userSchema);
// bu da ayni sekilde we change to ES modules
const User = mongoose.model('User',userSchema);
export default User;

// pre('save')
    // ↓
// password değişmiş mi?
//     ↓
// hayır → return
//     ↓
// evet
//     ↓
// salt oluştur
//     ↓
// password hashle
//     ↓
// async function tamamlanır
//     ↓
// save devam eder