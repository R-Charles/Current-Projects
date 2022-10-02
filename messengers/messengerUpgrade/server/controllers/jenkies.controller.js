const Messenger = require("../models/jenkies.model");

module.exports.findAllMessengers = (req,res) => {
    Messenger.find()
    .then(allMessengers => {
        res.json({results: allMessengers})
    })
    .catch(err=> {
        res.json(err)
    })
}

module.exports.createMessenger = (req, res) => {
    Messenger.create(req.body)
    .then(newMessenger => {
        res.json({results: newMessenger})
    })
    .catch(err=> {
        res.json(err)
    })
}

module.exports.findOneMessenger = (req, res) => {
    Messenger.findOne({_id: req.params.id})
    .then(Messenger => {
        res.json({results: Messenger})
    })
    .catch(err=> {
        res.json(err)
    })
}


module.exports.updateOneMessenger = (req, res) => {
    Messenger.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        { new: true, runValidators: true }
        
    )
        .then(updatedMessenger => {
            res.json({results: updatedMessenger})
        })
        .catch(err=> {
            res.json(err)
        })
}

module.exports.deleteMessenger = (req, res) => {
    Messenger.deleteOne({_id: req.params.id})
    .then(Messenger => {
        res.json({results: Messenger})
    })
    .catch(err=> {
        res.json(err)
    })
}