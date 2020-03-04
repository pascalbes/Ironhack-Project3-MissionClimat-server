var express = require('express');
var router = express.Router();
const userModel = require("./../models/User");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


router.patch('/save', (req, res, next) => {
    console.log(req.user)
    console.log(req.body)
    const scenarios = req.user.scenarios
    const scenario = req.body.resultsToSave

    userModel 
      .findByIdAndUpdate(req.user._id, {scenarios : [...scenarios, scenario]})
      .then(APIres => {
        // APIres.scenarios.push(scenario)
        console.log(APIres)
        res.status(200).json({msg: "saved!"});
        })
      .catch(err => {
          console.log("error while saving", err);
          next(err);
        });

})