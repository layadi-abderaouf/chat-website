const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
    {
        name :{type :String,required:true},
        email:{type :String,required:true,unique:true},
        password:{type :String,required:true},
        image: {
            type: "String",
            
            default:
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
          },
    },
    {
        timestamps : true
    }
)

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User',UserSchema);

module.exports = User;