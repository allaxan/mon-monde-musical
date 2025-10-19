document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOM fully loaded and parsed");

    const playButtons = document.querySelectorAll(".play");
    const audioPlayer = document.createElement("audio");
    document.body.appendChild(audioPlayer); // Ajouter l'élément audio au body
    let musiques = []; // Contiendra les données de musique
    let currentIndex = 0; // L'indice de la musique actuelle

    // Charger les données JSON (fichier data.json)
    try {
        const response = await fetch('data.json'); // Récupérer le fichier JSON
        musiques = await response.json(); // Récupérer les données du fichier JSON
        updateMusicInfo(); // Mettre à jour les infos avec la première musique
    } catch (error) {
        console.error("Erreur de chargement des données JSON :", error); // Afficher une erreur dans la console si le chargement des données JSON échoue
    }

    // Met à jour les informations de musique
    function updateMusicInfo() {
        const musicContainers = document.querySelectorAll(".music-container"); // Recherche de toutes les div music-container
        musiques.forEach((musique, index) => { // Parcourir toutes les musiques et leurs index dans le tableau musiques
            const container = musicContainers[index]; // Récupérer la div music-container correspondante à l'index 
            if (container) { // Vérifier si la div existe 
                const title = container.querySelector(".title"); // Recherche de l'élément title dans la div music-container et le stocker dans la variable en fonction de son index et du JSON
                const opinion = container.querySelector(".opinion"); // Recherche de l'élément opinion dans la div music-container et le stocker dans la variable en fonction de son index et du JSON
                const image = container.querySelector(".image"); // Recherche de l'élément image dans la div music-container et le stocker dans la variable en fonction de son index et du JSON
                const droit = container.querySelector(".droit"); // Recherche de l'élément droit dans la div music-container et le stocker dans la variable en fonction de son index et du JSON
                const link = container.querySelector(".link"); // Recherche de l'élément link dans la div music-container et le stocker dans la variable en fonction de son index et du JSON
                const link2 = container.querySelector(".link2"); // Recherche de l'élément link2 dans la div music-container et le stocker dans la variable en fonction de son index et du JSON
                const link3 = container.querySelector(".link3"); // Recherche de l'élément link3 dans la div music-container et le stocker dans la variable en fonction de son index et du JSON

                // Mettre à jour les informations affichées
                if (title) title.textContent = musique.title; // Mettre à jour le titre de la musique
                if (opinion) opinion.textContent = musique.opinion; // Mettre à jour l'opinion de la musique
                if (image) { // Mettre à jour l'image de la musique
                    image.src = musique.image; // Mettre à jour l'attribut src de l'image avec l'image de la musique
                    image.alt = musique.title; // Mettre à jour l'attribut alt de l'image avec le titre de la musique
                }
                if (droit) droit.textContent = musique.droit; // Mettre à jour le droit de la musique 
                if (link) link.href = musique.link; // Mettre à jour le premier lien de la musique
                if (link2) link2.href = musique.link2; // Mettre à jour le deuxième lien de la musique
                if (link3) link3.href = musique.link3; // Mettre à jour le troisième lien de la musique 

                if (index === currentIndex) audioPlayer.src = musique.audio; // Charger l'audio pour la musique actuelle
            } else {
                console.error("La div music-container n'existe pas pour l'index", index); 
            }
        });
        updatePlayButton(); // Mettre à jour l'état des boutons play/pause
    }

    // Met à jour l'état des boutons play/pause
    function updatePlayButton() { // Fonction pour mettre à jour l'état des boutons play/pause
        playButtons.forEach((button, index) => { // Parcourir tous les boutons de lecture 
            if (!musiques[index] || !musiques[index].audio) { // Vérifier si la musique n'est pas définie
                button.disabled = true; // Désactiver le bouton si aucune musique n'est associée
                button.textContent = "⏵"; 
            } else { // Activer le bouton si une musique est présente
                button.disabled = false; // Activer si une musique est présente
                button.textContent = index === currentIndex && !audioPlayer.paused ? "⏸" : "⏵"; // Mettre à jour le texte du bouton si la musique est en lecture ou en pause
            }
        });
    }

    // Gérer l'événement de lecture/pause pour chaque bouton de lecture de chaque musique
    playButtons.forEach((button, index) => { 
        button.addEventListener("click", () => { 
            if (!musiques[index] || !musiques[index].audio) {
                alert("Aucune musique n'est disponible pour être jouée !");
                return;
            }

            if (currentIndex !== index) {
                currentIndex = index; // Mettre à jour l'index courant
                audioPlayer.src = musiques[currentIndex].audio; // Charger la nouvelle musique
            }

            // Alterner entre play et pause
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            updatePlayButton(); // Mettre à jour l'état des boutons
        });
    });

    // Mettre à jour le bouton quand la musique est en lecture ou en pause
    audioPlayer.addEventListener("play", updatePlayButton);
    audioPlayer.addEventListener("pause", updatePlayButton);

    // Gestion dynamique des entrées du formulaire
    const titleInput = document.querySelector('#title-input');
    const dynamicDisplay = document.querySelector('#dynamic-display');

    if (titleInput) { // Vérifier si l'élément existe
        titleInput.addEventListener('keyup', () => { // Ajouter un écouteur d'événements pour l'événement keyup
            let affichageTitre = document.querySelector('#dynamic-title'); // Recherche de l'élément dynamique d'affichage du titre
            if (!affichageTitre) { // Vérifier si l'élément n'existe pas
                affichageTitre = document.createElement('p'); // Créer un nouvel élément p
                affichageTitre.id = 'dynamic-title'; // Définir l'ID de l'élément
                dynamicDisplay.appendChild(affichageTitre); // Ajouter l'élément au conteneur dynamique donc lorqsue l'utilisateur tape un titre, il s'affiche en même temps dans le conteneur dynamique
            }
            affichageTitre.textContent = `Titre en cours : ${titleInput.value}`; 
        });
    }

    const opinionInput = document.querySelector('#opinion-input');// Recherche de l'élément opinion-input dans le formulaire
    if (opinionInput) {              
        opinionInput.addEventListener('keyup', () => { // Ajouter un écouteur d'événements pour l'événement keyup pour l'opinion
            let affichageOpinion = document.querySelector('#dynamic-opinion');
            if (!affichageOpinion) {
                affichageOpinion = document.createElement('p');  // Créer un nouvel élément p
                affichageOpinion.id = 'dynamic-opinion';
                dynamicDisplay.appendChild(affichageOpinion); //Ajouter l'élement opinion dans le conteneur dynamique, lorque l'utilisateur tape son avis, il s'affiche en même temps dans le conteneur dynamique
            }
            affichageOpinion.textContent = `Opinion en cours : ${opinionInput.value}`;  // Mettre à jour le texte de l'élément dynamic-opinion avec l'opinion donnée par l'utilisateur les données ce charge en même temps que l'utilisateur tape son avis
        });
    }

    const imageInput = document.querySelector('#image-input'); // Recherche de l'élément image-input
    if (imageInput) {
        imageInput.addEventListener('change', (event) => {
            const dynamicImage = document.querySelector('#dynamic-image'); // Recherche de l'élément dynamic-image
            const file = event.target.files[0]; // Récupérer le fichier image donné par l'utilisateur
            if (file) { // Vérifier si le fichier existe
                const reader = new FileReader();  // Créer un nouvel objet FileReader pour l'image
                reader.onload = function (e) { // Ajouter un écouteur d'événements pour l'événement load
                    dynamicImage.src = e.target.result; // Mettre à jour l'image avec les données de l'image donnée
                    dynamicImage.alt = titleInput.value; // Mettre à jour l'attribut alt de l'image avec le titre de la musique donnée
                };
                reader.readAsDataURL(file); // Lire les données de l'image donnée par l'utilisateur pour qu'il soit affiché dans le conteneur dynamique
            }
        });
    }

    const droitInput = document.querySelector('#droit-input'); // Recherche de l'élément droit-input
    if (droitInput) {
        droitInput.addEventListener('keyup', () => { // Ajouter un écouteur d'événements pour l'événement keyup pour le droit
            const dynamicDroit = document.querySelector('#dynamic-droit'); // Recherche de l'élément dynamic-droit dans le formulaire
            dynamicDroit.textContent = `Droits : ${droitInput.value}`; // Mettre à jour le texte de l'élément dynamic-droit avec le droit donné par l'utilisateur
        });
    }

    const audioInput = document.querySelector('#audio-input'); // Recherche de l'élément audio-input
    const dynamicPlayButton = document.querySelector('#dynamic-play'); // Recherche de l'élément dynamic-play donc le bouton play/pause pour l'audio du formulaire
    if (audioInput) { // Vérifier si l'élément existe
        audioInput.addEventListener('change', () => { // Ajouter un écouteur d'événements pour l'événement change pour l'audio
            const file = audioInput.files[0]; // Récupérer le fichier audio donné par l'utilisateur
            if (file) { // Vérifier si le fichier existe 
                const audioReader = new FileReader(); // Créer un nouvel objet FileReader pour l'audio
                audioReader.onload = function (e) { // Ajouter un écouteur d'événements pour l'événement load pour l'audio
                    audioPlayer.src = e.target.result; // Mettre à jour l'audio avec les données de l'audio
                };
                audioReader.readAsDataURL(file); // Lire les données de l'audio donné par l'utilisateur
            }
        });

        dynamicPlayButton.addEventListener('click', () => { // Ajouter un écouteur d'événements pour l'événement click pour mettre au pause ou play l'audio du formulaire
            if (audioPlayer.paused) { // Mettre en pause si la musique est en lecture si il a eu un click sur le bouton
                audioPlayer.play(); // Lancer la lecture de l'audio si la musique était en pause et qu'il a eu un click sur le bouton
                dynamicPlayButton.textContent = '⏸'; // Mettre à jour le texte du bouton si la musique est mise en pause
            } else { //sinon 
                audioPlayer.pause(); // Mettre en pause si la musique est en lecture  et qu'il a eu un click sur le bouton
                dynamicPlayButton.textContent = '⏵'; // Mettre à jour le texte du bouton si la musique est en route
            } 
            updatePlayButton(); 
        });
    }

    const addMusicForm = document.querySelector('.add-music-form');
    if (addMusicForm) { // Vérifier si l'élément form existe
        addMusicForm.addEventListener('submit', async (event) => { // Ajouter un évenement pour le formulaire pour l'envoi de celui-ci
            event.preventDefault(); // Empêcher l'envoi du formulaire

            const newMusic = {
                title: titleInput?.value,
                opinion: opinionInput?.value,
                image: document.querySelector('#image-input')?.files[0], // Récupérer le fichier image
                audio: document.querySelector('#audio-input')?.files[0], // Récupérer le fichier audio
                droit: document.querySelector('#droit-input')?.value, // Récupérer le droit de la musique inséré par l'utilisateur
            };

            // Vérification que tous les champs sont remplis
            if (newMusic.title && newMusic.opinion && newMusic.image && newMusic.audio && newMusic.droit) { 
                const reader = new FileReader(); // Créer un nouvel objet FileReader
                reader.onload = function (e) { // Ajouter un écouteur d'événements pour l'événement load
                    newMusic.image = e.target.result; // Mettre à jour l'image avec les données de l'image

                    // Création du message pour l'envoi API avec les données écrites par l'utilisateur
                    const message = `Titre : ${newMusic.title}, Opinion : ${newMusic.opinion}, Droits : ${newMusic.droit}`;

                    // Définir le login et l'email pour l'API
                    const login = "fiol";
                    const email = document.querySelector('#email-input')?.value;

                    // Construire l'URL en la créant au complet
                    const urlVisitee = `https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=${login}&courriel=${encodeURIComponent(email)}&title=${encodeURIComponent(newMusic.title)}&opinion=${encodeURIComponent(newMusic.opinion)}&droit=${encodeURIComponent(newMusic.droit)}&message=${encodeURIComponent(message)}`;
                    // Afficher l'URL dans la console pour s'assurer que le lien envoyé est correct
                    console.log("URL de l'API :", urlVisitee);

                    // Appel de l'API avec fetch
                    fetch(urlVisitee).then(function (response) {
                        response.json().then(function (data) {
                            console.log("Réponse reçue :");
                            console.log(data);

                            musiques.push(newMusic); // Ajouter la nouvelle musique à la liste des musiques
                            currentIndex = musiques.length - 1; // Mettre à jour l'indice de la musique actuelle
                            updateMusicInfo(); // Mettre à jour les informations de musique

                            const audioReader = new FileReader(); // Créer un nouvel objet FileReader pour l'audio
                            audioReader.onload = function (e) { // Ajouter un écouteur d'événements pour l'événement load
                                audioPlayer.src = e.target.result; // Mettre à jour l'audio avec les données de l'audio
                                audioPlayer.play(); // Lancer la lecture de l'audio

                                // Mettre à jour le bouton de lecture/pause pour l'audio du formulaire
                                dynamicPlayButton.textContent = '⏸'; // Mettre à jour le texte du bouton
                                dynamicPlayButton.addEventListener('click', () => { // Ajouter un écouteur d'événements pour l'événement click pour mettre au pause ou play
                                    if (audioPlayer.paused) { 
                                        audioPlayer.play(); 
                                        dynamicPlayButton.textContent = '⏸'; 
                                    } else { // Mettre en pause si la musique est en lecture si il a eu un click sur le bouton
                                        audioPlayer.pause();
                                        dynamicPlayButton.textContent = '⏵'; // Mettre à jour le texte du bouton si la musique est en route 
                                    }
                                });
                            };
                            audioReader.readAsDataURL(newMusic.audio);

                            addMusicForm.reset(); // Réinitialiser le formulaire
                            alert('Musique ajoutée avec succès !');
                        });
                    }).catch(function (error) {
                        console.error("Erreur lors de l'appel à l'API :", error);
                        alert('Erreur lors de l\'ajout de la musique via l\'API.');
                    });
                };
                reader.readAsDataURL(newMusic.image);
            } else {
                alert('Veuillez remplir tous les champs avant d\'ajouter une musique.'); // Afficher un message d'alerte si tous les champs ne sont pas remplis, sur les champs spécifiés non rempli
            }
        });
    }
});