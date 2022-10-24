class Club{
    constructor(id_club,club_name,budget){
        this.id_club = id_club;
        this.club_name = club_name;
        this.budget = budget;
    }
}

function postClub(){

    let newClub = new Club(

        document.getElementById("id_club").value,
        document.getElementById("club_name").value,
        document.getElementById("budget").value

    );

    const url = "http://localhost:3000/club";

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(newClub),
        method : "POST"
    }

    fetch(url,param)
    .then(function(data){

        return data.json();

    })
    .then(function(result){

        if (result.error) {

            console.log("ERROR "+result. message);

        } else {

            console.log(result.message);

        }
    })
    .catch(function(error){

        console.log(error);

    })
}

function putBudgetClub(){

    let editedBudgetClub = {
        
        id_club : document.getElementById("id_club").value,
        budget : document.getElementById("budget").value

    };

    const url = "http://localhost:3000/club";

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(editedBudgetClub),
        method : "PUT"
    }

    fetch(url,param)
    .then(function(data){

        return data.json();

    })
    .then(function(result){

        if (result.error) {

            console.log("ERROR "+result. message);

        } else {

            if (result.message) {
                console.log("Budget update done");
            } else {
                console.log("Not enough budget");
            }
        }
    })
    .catch(function(error){

        console.log(error);

    })
} 