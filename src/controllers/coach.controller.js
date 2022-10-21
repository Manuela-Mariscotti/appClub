const db = require("../database");

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
    console.log("putCoachInClub()");
    console.log(req.body);

    let coach = req.body;

    let sql = `UPDATE coachs SET id_club=? WHERE id_coach=?`;

    const params = [coach.id_club, coach.id_coach];

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