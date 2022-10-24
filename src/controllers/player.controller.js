const db = require("../database");
const club = require("./club.controller");
const mailer = require("./sendEmail");


// --- DAR DE ALTA UN JUGADOR

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

// --- DAR DE ALTA UN JUGADOR EN UN CLUB

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
// --- consulta salarios actuales
// 
            let sql1 = 
            `SELECT sum(player_salary) as salaries FROM players WHERE id_club=${id_club}
            union all
            SELECT sum(coach_salary) as salaries FROM coachs WHERE id_club=${id_club}`;

            db.query(sql1, (error,result) => {

                if (error) {
                    
                    let response =  {
                        error : true,
                        code : 400,
                        message : 'DB query-1 executing error -->'+error.message
                    }

                    res.send(response);

                } else {
                    
                    let players_salaries = Number(result[0].salaries);
                    let coachs_salaries = Number(result[1].salaries);
                    let actualSalaries = players_salaries + coachs_salaries;
// 
// --- consulta salario del jugador entrante
//                     
                    let sql2 = `SELECT player_salary,player_l_name,player_email FROM players WHERE id_player=${id_player}`;

                    db.query(sql2, (error,result) => {

                        if (error) {
                    
                            let response =  {
                                error : true,
                                code : 400,
                                message : 'DB query-2 executing error -->'+error.message
                            }
        
                            res.send(response);
                            
                        } else {

                            let player_l_name = result[0].player_l_name;
                            let player_email = result[0].player_email;

                            let newSalary = result[0].player_salary;

                            let totalSalaries = Number(actualSalaries)+Number(newSalary);
// 
// --- consulta presupuesto del club
// 
                            let sql3 = `SELECT budget,club_name FROM clubs WHERE id_club=${id_club}`;
                        
                            db.query(sql3, (error,result) => {

                            if (error) {
                                
                                let response =  {
                                    error : true,
                                    code : 400,
                                    message : 'DB query-3 executing error -->'+error.message
                                }
            
                                res.send(response);

                            } else {

                                let club_name = result[0].club_name;
// 
// --- comprueba si los salarios son mayores que el presupuesto
// 
                                let budget = Number(result[0].budget);
                                
                                if (totalSalaries > budget) {
                                
                                    let response =  {
                                        error : false,
                                        code : 200,
                                        message : "Not enough budget"
                                    }
                
                                    res.send(response);

                                } else {
// 
// --- incluye nuevo jugador en el club
// 
                                let sql4=`UPDATE players set id_club=${id_club} where id_player=${id_player}`;

                                db.query(sql4, (error,result) =>{

                                    if (error) {
                                        
                                        let response =  {
                                            error : true,
                                            code : 400,
                                            message : 'DB query-4 executing error -->'+error.message
                                        }
                    
                                        res.send(response);

                                    } else {

                                        let subject = "alta";

                                        mailer.sendEmail(player_email,player_l_name,club_name,subject);
// 
// --- actualiza presupuesto del club
// 
                                        let balance = budget - totalSalaries

                                        club.updateBudgetClub(id_club, balance, res);

                                    }
                                })}
                            }
                        })
                        }
                    })
                }
            })
        }
    })
}

// --- DAR DE BAJA UN JUGADOR DE UN CLUB

function putPlayerOutClub(req,res){

    let id_player = req.body.id_player

    let sql = `UPDATE players SET id_club=null WHERE id_player=${id_player}`;

    db.connect((error)=>{

        if (error) {

            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);
            
        } else {

            db.query(sql, (error,result) => {

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

// --- OBTENER JUGADORES DE UN CLUB

function getPlayersByClub(req,res){

    let id_club = req.query.id_club

    let sql = `SELECT * FROM players WHERE id_club=${id_club}`;

    db.connect((error) => { 

        if (error) {
            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);

        } else {

            db.query(sql, (error,result) => {

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

// --- OBTENER JUGADORES FILTRANDO POR APELLIDO

function getPlayerByName(req,res){

    let player_l_name = req.query.player_l_name;

    let sql = `SELECT * FROM players WHERE player_l_name="${player_l_name}"`

    db.connect((error) => { 

        if (error) {
            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);

        } else {

            db.query(sql, (error,result) => {

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