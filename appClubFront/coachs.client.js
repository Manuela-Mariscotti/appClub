class Coach{
    constructor(id_coach, coach_f_name, coach_l_name, coach_salary, coach_email, id_club){
        this.id_coach = id_coach;
        this.coach_f_name = coach_f_name;
        this.coach_l_name = coach_l_name;
        this.coach_salary = coach_salary;
        this.coach_email = coach_email;
        this.id_club = id_club;
    }
}

// --- DAR DE ALTA UN ENTRENADOR

function postCoach(){

    let newCoach = new Coach(

        document.getElementById("id_coach").value,
        document.getElementById("coach_f_name").value,
        document.getElementById("coach_l_name").value,
        document.getElementById("coach_salary").value,
        document.getElementById("coach_email").value

    )

    const url = "http://localhost:3000/coach";

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(newCoach),
        method : "POST"
    }
    
    fetch(url,param)
    .then(function(data){
        
        return data.json();

    })
    .then(function(result){

        if(result.error){

            console.log("ERROR "+result.message);

        } else {

            console.log(result.message);

        }
    })
    .catch(function(error){

        console.log(error);

    })
}

// --- DAR DE ALTA UN ENTRENADOR EN UN CLUB

function putCoachInClub(){

    let putCoachInClub = {
        id_coach : document.getElementById("id_coach").value,
        id_club : document.getElementById("id_club").value
    }

    const url = "http://localhost:3000/coachIn";

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(putCoachInClub),
        method : "PUT"
    }

    fetch(url, param)
    .then(function(data){

        return data.json();

    })
    .then(function(result){

        if (result.error) {
            
            console.log("ERROR "+result.message);

        } else {

            console.log(result.message);

        }
    })
    .catch(function(error){

        console.log(error);

    })
}

// --- DAR DE BAJA UN ENTRENADOR DE UN CLUB

function putCoachOutClub(){
    
    let putCoachOutClub = {
        id_coach : document.getElementById("id_coach").value
    }

    const url = "http://localhost:3000/coachOut";

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(putCoachOutClub),
        method : "PUT"
    }

    fetch(url, param)
    .then(function(data){

        return data.json();

    })
    .then(function(result){

        if (result.error) {

            console.log("ERROR "+result. message);

        } else {

            console.log(result.data);
            
        }
    })
    .catch(function(error){

        console.log(error);

    })
}