const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then(res => {
        console.log('connected');
    })
    .catch(e => {
        console.log('error', e.message);
    });


const personSchema = new mongoose.Schema({
id: Number,
name: {
  type: String,
  minLength: 3,
  required: true
  },
number: {
  type: String,
  validate: {
    validator: function(v) {
      return /^\d{2,3}-\d{5,}$/.test(v);
    },
    message: props => `${props.value} is not a valid phone number!`
  },
  required: true
  },
});

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})


module.exports = mongoose.model('Person', personSchema)