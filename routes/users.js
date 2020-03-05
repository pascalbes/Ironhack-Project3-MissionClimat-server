var express = require('express');
var router = express.Router();
const userModel = require("./../models/User");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.patch('/save', (req, res, next) => {
    // console.log(req.user)
    // console.log(req.body)
    const scenarios = req.user.scenarios
    const scenario = req.body.resultsToSave
    console.log(scenario.name)

    userModel
    .find({"scenarios" : {$elemMatch : {name: `${scenario.name}`}}})
    .then(APIres => {
      console.log(APIres)
      if (APIres.length === 0) {
        userModel 
          .findByIdAndUpdate(req.user._id, {scenarios : [...scenarios, scenario]})
          .then(apires => {
            // console.log(APIres)
            res.status(200).json({msg : "Scénario créé."});
            })
          .catch(err => {
              console.log("error while saving", err);
              next(err);
            });
      } else {
      res.status(200).json({msg : "Scénario déjà existant."})}
    })
    .catch(next)
})


router.patch('/edit-scenario', (req, res, next) => {
  // console.log(req.user)
  // console.log(req.body)
  const scenarios = req.user.scenarios
  const scenario = req.body.resultsToSave
 
      userModel 
        .findByIdAndUpdate(req.user._id, {scenarios : [...scenarios, scenario]})
        .then(apires => {
          // console.log(APIres)
          res.status(200).json({msg : "Scénario édité."});
          })
        .catch(err => {
            console.log("error while saving", err);
            next(err);
          });
    } 
)




router.patch('/delete-scenario', (req, res, next) => {
  console.log(req.user);
  const scenarios = req.user.scenarios
  console.log(scenarios);
  console.log(scenarios[req.body.i]);

  userModel
    .findById(req.user._id)
    .then(APIRes => {
      var newScenarios = req.user.scenarios.filter(scenario => scenario != scenarios[req.body.i])
      userModel
        .findByIdAndUpdate(req.user._id, {scenarios : [...newScenarios]}, {new: true})
        .then(APIRes2 => {console.log(APIRes2.scenarios); res.status(200).json(APIRes2)})
        .catch(err => {
          console.log("error while deleting", err);
          next(err);
        });
    }
    )
    .catch(err => {
      console.log("error while deleting", err);
      next(err);
    });
  
  })

module.exports = router;

