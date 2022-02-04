const { Users } = require('../models')

const userController = {
    //get all users
    getAllUsers(req,res) {
        Users.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
         })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
      },
    
    //get user by ID with thoughts
    getUserById({ params }, res) {
        Users.findOne({ _id: params.id })
           .populate({
               path: 'thoughts',
               select: '-__v'
            })
            .populate ({
                path: 'friends',
                select: '-__v'
            })
           .select('-__v')
           .then(dbUserData => res.json(dbUserData))
           .catch(err => {
               console.log(err)
               res.status(500).json(err)
        });
     },

     //create user
     createUser({ body }, res) {
         Users.create(body)
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.status(400).json(err));
     },

     //add friend
     addFriend({ params }, res) {
         Users.findOneAndUpdate(
             {_id: params.userId},
             { $push: { friends: params.friendId } },
             { new: true, runValidators: true}
         )
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this ID!' });
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.json(err));
     },

     //update user
     updateUser({ params, body}, res) {
         Users.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this ID!' });
                 return;
             }
             res.json(dbUserData);
         })
            .catch(err => res.json(err))
     },

     //delete user
     deleteUser({ params }, res) {
         Users.findOneAndDelete({ _id: params.id })
         .then(dbUserData => {
         if (!dbUserData) {
             res.status(404).json({ message: 'No user found with this ID!' });
             return;
         }
         res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err))
     },

     //remove friend
     removeFriend( { params }, res) {
         Users.findOneAndUpdate(
             { _id: params.userId },
             { $pull: { friends: params.friendId }},
             { new: true}
         )
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
     }
     
};

module.exports = userController