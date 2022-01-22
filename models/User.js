const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name: {
        type:String,
        set: function omitEmptyString(v) {
            if (this instanceof mongoose.Query && v === '') {
              return undefined;
            }
            return v;
          }
        
    },
    gender:{
        type:String,
        set: function omitEmptyString(v) {
            if (this instanceof mongoose.Query && v === '') {
              return undefined;
            }
            return v;
          }
        
    },
    mob: {
        type:String,
        set: function omitEmptyString(v) {
            if (this instanceof mongoose.Query && v === '') {
              return undefined;
            }
            return v;
          }
        
    },

});
const User=mongoose.model('users',UserSchema);
module.exports=User;