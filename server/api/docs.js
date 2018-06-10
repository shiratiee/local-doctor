
const router = require('express').Router();
const axios = require('axios');


module.exports = router;


router.get('/findById/:docId', (req, res, next) => {
  const docId = req.params.docId;
  axios.get(`https://api.betterdoctor.com/2016-03-01/doctors/${docId}?user_key=6ffaf2f592ca4029cf614bb4bf313be5`)
    .then((doc) => {
      res.json(doc.data.uid);
      res.end();
    }).catch(next);
});