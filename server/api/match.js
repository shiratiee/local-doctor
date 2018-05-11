const router = require('express').Router()
const {Match} = require('../db/models')
module.exports = router

//Get all matches belonging to the logged-in user-- requires the user to be logged in so the currentUser's id can be passed to req.body
router.get('/:userId', (req, res, next) => {
  Match.findAll({
      where: {
        userId: req.params.userId
      }
    })
    .then(matches => res.json(matches))
    .catch(next)
})

//Add a match to a logged-in user
router.post('/', (req, res, next) => {
  Match.findOrCreate({
      where: {
        docId: req.body.docId,
        userId: req.body.userId
      }
    })
    .then((newMatch) => res.json(newMatch[0]))
    .catch(err => console.log(err))
})


//Delete a match
router.delete('/', (req, res, next) => {
  Match.destroy({
      where: {
        petId: req.body.docId,
        userId: req.body.userId,
      }
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})