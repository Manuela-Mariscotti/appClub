const {Router} = require("express");
const router = Router();
const playerCtrl = require ("../controllers/player.controller");

router.post("/player", playerCtrl.postPlayer);

router.put("/playerIn", playerCtrl.putPlayerInClub);

router.put("/playerOut", playerCtrl.putPlayerOutClub);

router.get("/playerByClub", playerCtrl.getPlayersByClub);

router.get("/playerByName", playerCtrl.getPlayerByName);

module.exports = router;