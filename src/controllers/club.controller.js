const db = require("../database");

// --- DAR DE ALTA UN CLUB

function postClub(req,res){

    let club = req.body;

    let sql = `INSERT INTO clubs (club_name,budget) VALUES (?,?)`;
    
    const params = [club.club_name, club.budget];

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
                        message : 'DB query executing error -->'+error.message
                    }

                    res.send(response);

                } else {

                    let response ={
                        error : false,
                        code : 200,
                        message : 'New club created. Id : '+String(result.insertId)
                    }
                    
                    res.send(response)
                }
            })
        }
    })
}

// --- MODIFICAR PRESUPUESTO DE UN CLUB

function putBudgetClub(req,res){


    let id_club = req.body.id_club;
    let newBudget = Number(req.body.budget);

    let sql1 = 
    `SELECT sum(coach_salary) as salaries FROM coachs WHERE id_club=${id_club}
    union all
    SELECT sum(player_salary) as salaries FROM players WHERE id_club=${id_club}`;

    db.connect((error) =>{

        if (error) {

            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);
            
        } else {

            db.query(sql1, (error,result)=> {

                if (error) {
                    
                    let response = {
                        error : true,
                        code : 400,
                        message : 'Error executing DB query-1 -->'+error.message
                    }

                    res.send(response);

                } else {
                    

                    let coachs_salaries = result[0].salaries;
                    let players_salaries = result[1].salaries;

                    let totalSalaries = Number(coachs_salaries) + Number(players_salaries);

                    if (totalSalaries > newBudget) {
                        
                        let response =  {
                            error : false,
                            code : 200,
                            message : false
                        }
    
                        res.send(response);
                        
                    } else {

                        let sql2 = `UPDATE clubs SET budget=${newBudget} WHERE id_club=${id_club}`;

                        db.query(sql2, (error,result) => {

                            if (error) {

                                let response = {
                                    error : true,
                                    code : 400,
                                    message : 'Error executing DB query-2 -->'+error.message
                                }
            
                                res.send(response);

                            } else {

                                let response = {
                                    error : false,
                                    code : 200,
                                    message : true
                                }
            
                                res.send(response);

                            }
                        })
                    }
                }
            })
        }
    })
}

// --- MODIFICAR PRESUPUESTO DE UN CLUB CUANDO SE DA DE ALTA UN JUGADOR/ENTRENADOR

function updateBudgetClub(id_club, balance, res){
    
    db.connect((error)=>{

        if (error) {
            
            let response = {
                error : true,
                code : 400,
                message : 'DB Connection error --> '+error.message
            }

            res.send(response);
            
        } else {

            let sql4 = `UPDATE clubs SET budget=${balance} WHERE id_club=${id_club}`;

            db.query(sql4, (error,result) => {

                if (error) {

                    let response = {
                        error : true,
                        code : 400,
                        message : 'Error executing DB query-4 -->'+error.message
                    }

                    res.send(response);

                } else {

                    let response = {
                        error : false,
                        code : 200,
                        message : "Update done"
                    }

                    res.send(response);
                }
            })
        }
    })
}

module.exports = {postClub,putBudgetClub,updateBudgetClub};