const db = require("../database");

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

function putBudgetClub(id_club, balance, res){
    
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
                        data : "Update done"
                    }

                    res.send(response)
                }
            })
        }
    })
}



module.exports = {postClub,putBudgetClub};