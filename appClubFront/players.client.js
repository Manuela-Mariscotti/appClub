class Player{
    constructor(id_player,player_f_name,player_l_name,player_salary,player_email,id_club){
        this.id_player = id_player;
        this.player_f_name = player_f_name;
        this.player_l_name = player_l_name;
        this.player_salary = player_salary;
        this.player_email = player_email;
        this.id_club = id_club;
    }
}

// --- DAR DE ALTA UN JUGADOR

function postPlayer(){

    let newPlayer = new Player(

        document.getElementById("id_player").value,
        document.getElementById("player_f_name").value,
        document.getElementById("player_l_name").value,
        document.getElementById("player_salary").value,
        document.getElementById("player_email").value

    )

    const url = "http://localhost:3000/player"

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(newPlayer),
        method : "POST"
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

// --- DAR DE ALTA UN JUGADOR EN UN CLUB

function putPlayerInClub(){

    let putPlayerInClub = {
        id_player : document.getElementById("id_player").value,
        id_club : document.getElementById("id_club").value
    }

    const url = "http://localhost:3000/playerIn";

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(putPlayerInClub),
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

            console.log(result.message);
            
        }
    })
    .catch(function(error){

        console.log(error);

    })

}

// --- DAR DE BAJA UN JUGADOR DE UN CLUB

function putPlayerOutClub(){

    let putPlayerOutClub = {
        id_player : document.getElementById("id_player").value
    }

    const url = "http://localhost:3000/playerOut";

    let param = {
        headers : {"Content-type": "application/json; charset= UTF-8"},
        body : JSON.stringify(putPlayerOutClub),
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

// --- OBTENER JUGADORES DE UN CLUB

function getPlayersByClub(){

    let id_club = document.getElementById("id_club").value
    console.log(id_club);

    const url = "http://localhost:3000/playerByClub?id_club="+id_club;

    let param = {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        method: "GET"
    }

    fetch(url,param)
    .then(function (data){

        return data.json()

    })
    .then(function(result){

        let playersTable = result.data
        console.log(playersTable);

        let list = document.getElementById("playersList");

        let contList = document.querySelector(".contTable2");

        if (!result.error) {

            if (contList.classList.contains("contTable1")) {
                contList.classList.remove("contTable1")
            }

            list.innerHTML=`
            <thead>
            <tr>
                <th scope="col">id_player</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Salario</th>
                <th scope="col">E-mail</th>
                <th scope="col">id_club</th>
            </tr>
            </thead>`

            for (let i = 0; i < playersTable.length; i++) {
                
                list.innerHTML+=`
                <tbody>
                <tr>
                    <th scope="row">${playersTable[i].id_player}</th>
                    <td>${playersTable[i].player_f_name}</td>
                    <td>${playersTable[i].player_l_name}</td>
                    <td>${playersTable[i].player_salary}</td>
                    <td>${playersTable[i].player_email}</td>
                    <td>${playersTable[i].id_club}</td>
                </tr>
                </tbody>`
            }

        } else {

            console.log(result.message);

        }
    })
    .catch(function(error){
        console.log(error);
    })
}

// --- OBTENER JUGADORES FILTRANDO POR APELLIDO

function getPlayerByName(){

    let player_l_name = document.getElementById("player_l_name").value
    console.log(player_l_name);

    const url = "http://localhost:3000/playerByName?player_l_name="+player_l_name;

    let param = {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        method: "GET"
    }

    fetch(url,param)
    .then(function (data){

        return data.json()

    })
    .then(function(result){

        let playersTable = result.data
        console.log(playersTable);

        let list = document.getElementById("playersList");

        let contList = document.querySelector(".contTable2");

        if (!result.error) {

            if (contList.classList.contains("contTable1")) {
                contList.classList.remove("contTable1")
            }

            list.innerHTML=`
            <thead>
            <tr>
                <th scope="col">id_player</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Salario</th>
                <th scope="col">E-mail</th>
                <th scope="col">id_club</th>
            </tr>
            </thead>`

            for (let i = 0; i < playersTable.length; i++) {
                
                list.innerHTML+=`
                <tbody>
                <tr>
                    <th scope="row">${playersTable[i].id_player}</th>
                    <td>${playersTable[i].player_f_name}</td>
                    <td>${playersTable[i].player_l_name}</td>
                    <td>${playersTable[i].player_salary}</td>
                    <td>${playersTable[i].player_email}</td>
                    <td>${playersTable[i].id_club}</td>
                </tr>
                </tbody>`
            }

        } else {

            console.log(result.message);

        }
    })
    .catch(function(error){
        console.log(error);
    })

}