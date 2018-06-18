
const router = require('express').Router();


module.exports = router;



// router.get('/findById/:docId', (req, res, next) => {
//   const docId = req.params.docId;
//   fetch(`https://api.betterdoctor.com/2016-03-01/doctors/${docId}?user_key=6ffaf2f592ca4029cf614bb4bf313be5`)
//   .then(res => res.json())
//   .then((res) => {
//       console.log(res);
//       res.json(res.data.uid);
//       res.end();
//     }).catch(next);
// });