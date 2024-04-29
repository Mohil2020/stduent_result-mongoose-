var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Schema = new Schema({
    std: {
        type: String
    },
    div:{
        type: String
    }
})
module.exports=mongoose.model('std',Schema);
