var mongoose=require('./db').mongoose;


var  studentSchema = new mongoose.Schema({
      name: {type : String,
             required:true
      },
      sex:  {type : String,
             enum:['男','女']
      },
      age:  {type : Number,
             min:7,
             max:45
      },
      tel:  {type : Number
      }
    });

var studentModel = mongoose.model('students', studentSchema);

module.exports = studentModel;