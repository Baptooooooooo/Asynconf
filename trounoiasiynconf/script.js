var data; // Une variable globale pour stocker les données JSON

// Récupérez les données JSON au chargement de la page
fetch('valeur.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; // Stockez les données JSON dans la variable globale "data"
  })
  .catch(error => {
    console.error('Une erreur s\'est produite : ' + error);
  });

function valider() {
    let score = 0
  // Cette fonction sera exécutée lorsque le bouton "Valider" est cliqué

  // Attendre que les données JSON soient chargées
  if (!data) {
    console.error('Les données JSON ne sont pas encore disponibles.');
    return;
  }

  var typevoitur = document.getElementById("typevoiture").value;
  var typecarburent = document.getElementById("typecarburant").value;
  var nmbdekm = document.getElementById("nmbdekm").value;
  var annerdevoitur = document.getElementById("annerdevoiture").value;
  var finalrep = document.getElementById("lareponce")


  var nombrepasage = document.getElementById("nombrepasager").value;

  console.log("Option sélectionnée - Type de voiture : " + typevoitur);
  console.log("Option sélectionnée - Type de carburant : " + typecarburent);
  console.log("Option sélectionnée - Nombre de kilomètres : " + nmbdekm);
  console.log("Option sélectionnée - Année de la voiture : " + annerdevoitur);

  function rechercherCategorie(categorie, valeurRecherchee) {
    if (data && data[categorie]) {
      let categorieKeys = Object.keys(data[categorie]);
      for (let i = 0; i < categorieKeys.length; i++) {
        if (valeurRecherchee === categorieKeys[i]) {
   
          console.log("Trouvé dans la catégorie '" + categorie + "': " + categorieKeys[i]);
          return data[categorie][categorieKeys[i]];
        }
      }
      console.log("Aucune correspondance trouvée dans la catégorie '" + categorie + "'");
    } else {
      console.error('Les données JSON pour la catégorie ' + categorie + ' ne sont pas disponibles.');
    }
  }

  // Exemple d'utilisation :
  let resultatcarburent = rechercherCategorie("type_de_carburant", typecarburent);
  console.log(resultatcarburent);
  let resultatvoiture = rechercherCategorie("type_de_voiture", typevoitur);
  console.log(resultatvoiture);
  let resultatKilometres = rechercherCategorie("nombre_de_klm", nmbdekm);
  console.log(resultatKilometres);
  let resultatAnnee = rechercherCategorie("annee_de_la_voiture", annerdevoitur);
  console.log(resultatAnnee);
  let resultatpasager = rechercherCategorie("nbm_pasagers", nombrepasage); // Utiliser la catégorie correcte
  console.log(resultatpasager);

  let result = parseFloat(resultatAnnee) + parseFloat(resultatvoiture) + parseFloat(resultatcarburent) + parseFloat(resultatKilometres);
  console.warn(result + "/40");

  if (result <= 10) {
    score = data.Score_véicules["0-10"];
} else if (result <= 15) {
    score = data.Score_véicules["11-15"];
} else if (result <= 25) {
    score = data.Score_véicules["16-25"];
} else if (result <= 33) {
    score = data.Score_véicules["26-33"];
} else if (result <= 40) {
    score = data.Score_véicules["34-40"];
} else {
    console.log("putin c'est la merde");
}

console.log(score);
score = parseFloat(score) + parseFloat(resultatpasager);
console.log("sit un toutal de : "+score+"%");
finalrep.textContent = "le toutal est de : "+score+"%";
}