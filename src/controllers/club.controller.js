const db = require("../database");

function postClub(req,res){
    console.log("postClub");
    console.log(req.body);

    let club = req.body;

    let sql = `INSERT INTO clubs (club_name,budget) VALUES (?,?)`;
    
    const params = [club.club_name, club.budget];

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

function putBudgetClub(req,res){
    console.log("putBudgetClub");
    console.log(req.body);

    let club = req.body;

    let sql = `UPDATE clubs SET budget=? WHERE id_club=?`;
    params = [club.budget, club.id_club];

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

function getBudgetByClub(req,res){
    console.log("getBudgetClub()");
    console.log(req.body);

    let id_club = req.query.id_club;

    let sql = `SELECT budget FROM clubs WHERE id_club=${id_club}`;

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

module.exports = {postClub,putBudgetClub, getBudgetByClub};