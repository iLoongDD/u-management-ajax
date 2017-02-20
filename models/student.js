const mongoose = require('./db').mongoose;

const studentSchema = new mongoose.Schema({
  name: { type: String,
    required: true,
  },
  sex: { type: String,
    enum: ['男', '女'],
    required: true,
  },
  age: { type: Number,
    min: 7,
    max: 45,
    required: true,
  },
  tel: { type: Number,
    required: true,
  },
});
const studentModel = mongoose.model('students', studentSchema);
module.exports = studentModel;
