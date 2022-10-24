const {Router} = require("express");
const router = Router();
const clubCtrl = require ("../controllers/club.controller");

router.post("/club", clubCtrl.postClub);

router.put("/club", clubCtrl.putBudgetClub);

router.put("/clubUpdate", clubCtrl.updateBudgetClub);

module.exports = router;