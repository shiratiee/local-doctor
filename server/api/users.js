const router = require('express').Router()

const {User, Match} = require('../db/models')
module.exports = router

//get a single user (to set them as current user on state)
router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId, { include: {
        model: Match, as: 'matches'
    }})
    .then(user => res.json(user))
    .catch(next)
})

