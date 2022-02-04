const { Schema, model } = require('mongoose');
const moment = require('moment');


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
      }
    ],
  friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Users'
      }
  ]
  },
  { 
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

// create the Users Model using the Schema
const Users = model('Users', UserSchema);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


  // export the Users model
module.exports = Users;