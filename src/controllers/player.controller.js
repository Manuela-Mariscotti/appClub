const db = require("../database");
const club = require("./club.controller");

function postPlayer(req,res){

    let player = req.body;

    let sql = `INSERT INTO players (player_f_name,player_l_name,player_salary,player_email) VALUES (?,?,?,?)`;

    const params = [player.player_f_name, player.player_l_name, player.player_salary, player.player_email];

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

    let id_player = req.body.id_player;
    let id_club = req.body.id_club;

    db.connect((error)=>{

        if (error) {

            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);
            
        } else {
// 
// --- consulta prespuesto y salarios actuales
// 
            let sql1 = 
            `SELECT budget,sum(coach_salary+player_salary) as salaries
            FROM clubs
            JOIN coachs ON (clubs.id_club=coachs.id_club) 
            JOIN players ON (coachs.id_club=players.id_club) 
            WHERE clubs.id_club=${id_club}`;

            db.query(sql1, (error,result) => {

                if (error) {
                    
                    let response =  {
                        error : true,
                        code : 400,
                        message : 'DB query-1 executing error -->'+error.message
                    }

                    res.send(response);

                } else {

                    let budget = result[0].budget;
                    let salaries = result[0].salaries;
// 
// --- consulta salario del jugador entrante
//                     
                    let sql2 = `SELECT player_salary FROM players WHERE id_player=${id_player}`;

                    db.query(sql2, (error,result) => {

                        if (error) {
                    
                            let response =  {
                                error : true,
                                code : 400,
                                message : 'DB query-2 executing error -->'+error.message
                            }
        
                            res.send(response);
                            
                        } else {

                            let newSalary = result[0].player_salary;

                            let totalSalaries = Number(salaries)+Number(newSalary);

                            if (totalSalaries > budget) {
                                
                                let response =  {
                                    error : false,
                                    code : 200,
                                    message : "Not enough budget"
                                }
            
                                res.send(response);

                            } else {
// 
// --- incluye jugador en el club
// 
                                let sql3=`UPDATE players set id_club=${id_club} where id_player=${id_player}`;

                                db.query(sql3, (error,result) =>{

                                    if (error) {
                                        
                                        let response =  {
                                            error : true,
                                            code : 400,
                                            message : 'DB query-3 executing error -->'+error.message
                                        }
                    
                                        res.send(response);

                                    } else {
// 
// --- actualiza presupuesto del club
// 
                                        let balance = budget - totalSalaries
                                            
                                        club.putBudgetClub(id_club, balance, res);

                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    })
}


function putPlayerOutClub(req,res){

    let sql = `UPDATE players SET id_club=null WHERE id_player=?`;

    const params = [req.body.id_player];


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

    let sql = `SELECT * FROM players WHERE id_club=?`;

    const params = [req.body.id_club]

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

module.exports = {postPlayer,putPlayerInClub, putPlayerOutClub,getPlayersByClub, getPlayerByName};