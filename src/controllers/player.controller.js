const db = require("../database");
const club = require("./club.controller");

function postPlayer(req,res){
    console.log("postPlayer()");
    console.log(req.body);

    let player = req.body;

    let sql = `INSERT INTO players (player_f_name,player_l_name,player_salary,player_email) VALUES (?,?,?,?)`;

    const params = [player.player_f_name, player.player_l_name, player.player_salary, player.player_email];

    console.log(sql);

    db.connect((error)=>{

        if (error) {

            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);

        } else {

            db.query(sql, params, (error,result) => {

                if (error){

                    let response =  {
                        error : true,
                        code : 400,
                        message : 'DB query executing error -->'+error.message
                    }

                    res.send(response);

                } else {

                    let response ={
                        error : false,
                        code : 200,
                        message : 'New player created. Id : '+String(result.insertId)
                    }

                    res.send(response);
                }
            })
        }
    })
}

function putPlayerInClub(req,res){
    console.log("putPlayerInClub()");
    console.log(req.body);

    let player = req.body;

    let sql = `UPDATE players SET id_club=? WHERE id_player=?`;

    const params = [player.id_club,player.id_player];

    console.log(sql);

    db.connect((error)=>{

        if (error) {

            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);
            
        } else {

            db.query(sql, params, (error,result) => {

                if (error) {

                    let response = {
                        error : true,
                        code : 400,
                        message : 'Error executing DB query -->'+error.message
                    }

                    res.send(response);

                } else {

                    let response = {
                        error : false,
                        code : 200,
                        data : result
                    }

                    res.send(response);
                }
            })
        }
    })
}


function putPlayerOutClub(req,res){
    console.log("putPlayerOutClub()");
    console.log(req.body);

    let sql = `UPDATE players SET id_club=null WHERE id_player=?`;

    const params = [req.body.id_player];

    console.log(sql);

    db.connect((error)=>{

        if (error) {

            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);
            
        } else {

            db.query(sql, params, (error,result) => {

                if (error) {

                    let response = {
                        error : true,
                        code : 400,
                        message : 'Error executing DB query -->'+error.message
                    }

                    res.send(response);

                } else {

                    let response = {
                        error : false,
                        code : 200,
                        data : result
                    }

                    res.send(response);
                }
            })
        }
    })
}

function getPlayersByClub(req,res){
    console.log("getPlayersByClub()");
    console.log(req.body);

    let sql = `SELECT * FROM players WHERE id_club=?`;

    const params = [req.body.id_club]
    console.log(sql);

    db.connect((error) => { 

        if (error) {
            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);

        } else {

            db.query(sql, params, (error,result) => {

                if (error) {
                    
                    let response = {
                        error : true,
                        code : 400,
                        message : 'DB query executing error -->'+error.message
                    }

                    res.send(response);

                } else {

                    let response ={ 
                        error : false,
                        code : 200,
                        data : result
                    }

                    res.send(response);
                    
                }
            })
        }
    })
}

function getPlayerByName(req,res){
    console.log("getPlayerByName()");
    console.log(req.body);

    let sql = `SELECT * FROM players WHERE player_l_name=?`

    const params = [req.body.player_l_name];

    db.connect((error) => { 

        if (error) {
            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);

        } else {

            db.query(sql, params, (error,result) => {

                if (error) {
                    
                    let response = {
                        error : true,
                        code : 400,
                        message : 'DB query executing error -->'+error.message
                    }

                    res.send(response);

                } else {

                    let response ={ 
                        error : false,
                        code : 200,
                        data : result
                    }

                    res.send(response);
                    
                }
            })
        }
    })
}

module.exports = {postPlayer,putPlayerInClub,putPlayerOutClub,getPlayersByClub, getPlayerByName};