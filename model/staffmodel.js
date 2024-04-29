var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Schema = new Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    std:{
        type:String
    },
    div:{
        type:String
    }
})
module.exports=mongoose.model('staff',Schema)