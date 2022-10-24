/*

 Función para mandar e-mails a la hora de dar de alta/baja un jugador/entrenador en un club

*/

let nodemailer = require('nodemailer');

function sendEmail(email,last_name,club_name,subject){

    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'gestordelclub@gmail.com',-------->sustituir por email válido 
    //       pass: 'password'
    //     }
    //   });
      
      let mailOptions = {
        from: 'gestordelclub@gmail.com',
        to: email,
        subject: 'Notificacion de '+club_name,
        text: `Estimado sr.${last_name} : Desde el club ${club_name} nos dirigimos a usted para informarle de ha sido dado de ${subject} en el club. Saludos cordiales.`
      };

      console.log(mailOptions);
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
}

module.exports = {sendEmail};