const {Router} = require("express");
const router = Router();
const coachCtrl = require ("../controllers/coach.controller");

router.post("/coach", coachCtrl.postCoach);

router.put("/coachIn", coachCtrl.putCoachInClub);

router.put("/coachOut", coachCtrl.putCoachOutClub);

module.exports = router;