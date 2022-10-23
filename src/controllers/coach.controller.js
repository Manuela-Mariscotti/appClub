const db = require("../database");
const club = require("./club.controller");

function postCoach(req,res){
    console.log("postCoach()");
    console.log(req.body);

    let coach = req.body;

    let sql = `INSERT INTO coachs (coach_f_name, coach_l_name, coach_salary, coach_email) VALUES (?,?,?,?)`;

    const params = [coach.coach_f_name, coach.coach_l_name, coach.coach_salary, coach.coach_email];

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
                        message : 'New coach created. Id : '+String(result.insertId)
                    }

                    res.send(response);
                }
            })
        }
    })
}

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
// --- consulta salario del entrenador entrante
//                     
                    let sql2 = `SELECT coach_salary FROM coachs WHERE id_coach=${id_coach}`;

                    db.query(sql2, (error,result) => {

                        if (error) {
                    
                            let response =  {
                                error : true,
                                code : 400,
                                message : 'DB query-2 executing error -->'+error.message
                            }
        
                            res.send(response);
                            
                        } else {

                            let newSalary = result[0].coach_salary;

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
// --- incluye entrenador en el club
// 
                                let sql3=`UPDATE coachs set id_club=${id_club} where id_coach=${id_coach}`;

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

function putCoachOutClub(req,res){
    console.log("putCoachOutClub()");
    console.log(req.body);


    let sql = `UPDATE coachs SET id_club=null WHERE id_coach=?`;

    const params = [req.body.id_coach];

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


module.exports = {postCoach, putCoachInClub, putCoachOutClub};