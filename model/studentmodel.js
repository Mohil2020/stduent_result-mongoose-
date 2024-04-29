var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Schema = new Schema({
    name:{
        type:String
    },
    std:{
        type:String
    },
    div:{
        type:String
    },
    roll:{
        type:String
    }
    
})
module.exports=mongoose.model('student',Schema)