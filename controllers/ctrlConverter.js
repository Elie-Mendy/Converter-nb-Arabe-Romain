// Imports
var env    = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env];

// Constantes
const  errorMessage = "On ne peut exprimer ce chiffre par la numerotation romaine le chiffre maximal est 4999 : soit la representation suivante: MMMMCMXCIX";

const sinon = require('sinon');


module.exports = {
    homepage:  (req, res) => {
      configView = {
        title: 'Convertisseur de nombres - Notation Arabe vers notation Romaine',
        baseurl: config.baseurl,
      }
      res.render('index', configView);
    },

    //Conversion d'un nombre : Notation Arabe vers Romaine
    convert: (req,res) => {
      //Récupération du nombre à convertir 
        var nbArabe = (req.query.nbArabe)?req.query.nbArabe: 0;

        // initialisation du nombre à renvoyer
        nbRomain = []

        // parcours de nbArabe + conversion 
        // (inversement de la chaine pour commencer par le traitement des unitées)
        nbArabe.split('').reverse().map((nb, i) => {

          // Traitement des unitées / dizaines / centaines 
          if (i <= 2) {
            nbRomain = module.exports.processDigit(nb, i, nbRomain);
          }

          //traitement des milliers
          else if (i == 3) {
            if (nb > 4) { 
              return res.status(200).json({nbRomain: errorMessage});
            } else {  
              for (let step = 0; step < nb; step++) { nbRomain.splice(0,0,"M"); };
            }      
          }

          // renvoi du message d'erreur si dépassement de la limite
          else {
            return res.status(200).json({nbRomain: errorMessage});
          }
          
        });

        // renvoi du nombre converti
        return res.status(200).json({nbRomain: nbRomain.join("")});
    },
    
    // Methode de Factorisation du traitement des digits qui constituent le nombre en notation Arabe
    processDigit: (nb, i, nbRomain) => { 

      var symbols = [
        ["I", "IV", "V", "IX"],
        ["X", "XL", "L", "XC"],
        ["C", "CD", "D", "CM"],
      ];

      switch(true) {
        // si zero - passe
        case nb == 0: 
          //pass
          break;
        
        //sinon si nb < 3 : on écrit n fois "I"
        case nb <= 3:   
          for (let step = 0; step < nb; step++) { nbRomain.splice(0,0,symbols[i][0]); };
          break;

        // sinon si nb = 4 : on écrit "IV"
        case nb == 4:   
          nbRomain.splice(0,0,symbols[i][1]);
          break;

        // sinon si nb < 8 : on soustrait 5 à nb , "V" + "I" fois nb 
        case nb <= 8:  
          for (let step = 0; step < nb-5; step++) { nbRomain.splice(0,0,symbols[i][0]); };
          nbRomain.splice(0,0,symbols[i][2]);
          break;

        // sinon si nb < 8 : on soustrait 5 à nb , "V" + "I" fois nb 
        case nb == 9:   
          nbRomain.splice(0,0,symbols[i][3]);
          break;
      } 
      return nbRomain;
    },
}
