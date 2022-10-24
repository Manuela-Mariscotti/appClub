const db = require("../database");
const club = require("./club.controller");
const mailer = require("./sendEmail");

// --- DAR DE ALTA UN ENTRENADOR

function postCoach(req,res){

    let coach = req.body;

    let sql = `INSERT INTO coachs (coach_f_name, coach_l_name, coach_salary, coach_email) VALUES (?,?,?,?)`;

    const params = [coach.coach_f_name, coach.coach_l_name, coach.coach_salary, coach.coach_email];

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
                        message : 'New coach created. Id : '+String(result.insertId)
                    }

                    res.send(response);
                }
            })
        }
    })
}

// --- DAR DE ALTA UN ENTRENADOR EN UN CLUB

function putCoachInClub(req,res){

    let id_coach = req.body.id_coach;
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

                    console.log("players_salaries"+players_salaries);
                    console.log("coachs_salaries"+coachs_salaries);
                    console.log("actualSalaries"+actualSalaries);
                    
// 
// --- consulta salario del entrenador entrante
//                     
                    let sql2 = `SELECT coach_salary,coach_l_name,coach_email FROM coachs WHERE id_coach=${id_coach}`;

                    db.query(sql2, (error,result) => {

                        if (error) {
                    
                            let response =  {
                                error : true,
                                code : 400,
                                message : 'DB query-2 executing error -->'+error.message
                            }
        
                            res.send(response);
                            
                        } else {

                            let coach_l_name = result[0].coach_l_name;
                            let coach_email = result[0].coach_email;

                            let newSalary = result[0].coach_salary;

                            let totalSalaries = Number(actualSalaries)+Number(newSalary);

                            console.log("newSalary"+newSalary);
                            console.log("totalSalaries"+totalSalaries);
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
                                console.log("budget"+budget);
                                
                                if (totalSalaries > budget) {
                                
                                    let response =  {
                                        error : false,
                                        code : 200,
                                        message : "Not enough budget"
                                    }
                
                                    res.send(response);

                                } else {
// 
// --- incluye nuevo entrenador en el club
// 
                                let sql4=`UPDATE coachs set id_club=${id_club} where id_coach=${id_coach}`;

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

                                        mailer.sendEmail(coach_email,coach_l_name,club_name,subject);
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


// --- DAR DE BAJA UN ENTRENADOR DE UN CLUB

function putCoachOutClub(req,res){

    let id_coach = req.body.id_coach;

    let sql = `UPDATE coachs SET id_club=null WHERE id_coach=${id_coach}`;

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

module.exports = {postCoach, putCoachInClub, putCoachOutClub};