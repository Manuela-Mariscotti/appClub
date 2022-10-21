const express = require ("express");
const cors = require ('cors');
const errorHandling = require("./error/errorHandling");
const clubRouter = require("./routers/club.routers");
const playerRouter = require("./routers/player.routers");
const coachRouter = require("./routers/coach.routers");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(clubRouter);
app.use(playerRouter);
app.use(coachRouter);

app.use((req, res, next) =>{
    
        res.status(404).json({
            error:true, 
            codigo: 404,
            message: "Endpoint not found"
        })
    })

app.use(errorHandling);

module.exports = app;