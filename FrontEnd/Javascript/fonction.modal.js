function affichageModal(works) {
    resetModal();
    document.querySelector(".btn-precedent-modal").style.display = "none";
    modalH3.textContent = "Galerie photo";
    modalHeader.appendChild(modalH3);

    for (let i = 0; i < works.length; i++) {

        const figure = works[i];
        
        const worksElement = document.createElement("figure");
        worksElement.dataset.id = works[i].id;
        worksElement.classList.add("fig");

        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const icon = document.createElement("button");
        icon.id = works[i].id;
        icon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      
        modalMain.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(icon);
     }
    
    const modalFooter = document.querySelector(".modal-footer");
    modalFooter.innerHTML = '<button class="btnAdd">Ajouter une photo</button>';

    const btnAdd = document.querySelector(".btnAdd");
    btnAdd.addEventListener("click", () => {
        ajoutphoto(categories);
    })

    const idTravaux = modalMain.querySelectorAll("button");
    idTravaux.forEach(travail => travail.addEventListener("click", (event) => {
        idtravail = Number(event.currentTarget.id);
        supprWork(idtravail);
    }))
}

function ajoutphoto(categories) {
    resetModal();
    document.querySelector(".btn-precedent-modal").style.display = "flex";
    modalH3.textContent = "Ajout photo";
    const labelphoto = document.createElement("label");
    labelphoto.htmlFor = "addPhoto";
    labelphoto.classList.add("zone-ajout");
    const textLabelPhoto = document.createElement("div");
    textLabelPhoto.classList.add("text-label-photo");
    textLabelPhoto.innerHTML = `
    <i class="fa-regular fa-image"></i>
    <p class="ajouter-photo">+ Ajouter photo</p>
    <p class="info-petit">jpg, png : 4mo max</p>
    `;
    const addPhoto = document.createElement("input");
    addPhoto.type = "file";
    addPhoto.id = "addPhoto";
    addPhoto.name = "addPhoto";
    addPhoto.accept = "image/png, image/jpeg";
    addPhoto.required = true;
    const preview = document.createElement("img");
    preview.classList = "preview";
    preview.style.display = "none";
    const labelTitre = document.createElement("label");
    labelTitre.htmlFor = "Titre";
    labelTitre.textContent = "Titre";
    const titre = document.createElement("input");
    titre.type = "text";
    titre.id = "Titre";
    titre.name = "Titre";
    titre.classList.add("champ-titre");
    titre.required = true;
    const labelCat = document.createElement("label");
    labelCat.htmlFor = "category";
    labelCat.textContent = "Catégorie";
    const selectCat = document.createElement("select");
    selectCat.name = "category";
    selectCat.id = "category";
    selectCat.classList.add("champ-categorie");
    selectCat.required = true;
    const catVide = document.createElement("option");
    catVide.value = "";
    catVide.disabled = true;
    catVide.selected = true;
    catVide.hidden = true;
    const btnValider = document.createElement("input");
    btnValider.type = "submit";
    btnValider.value = "Valider";
    btnValider.disabled = true;
    btnValider.classList.add("btn-valider");
    const messageErreur = document.createElement("p");
    messageErreur.classList.add("message-erreur");
    messageErreur.style.display = "none";

    modalHeader.appendChild(modalH3);
    modalMain.appendChild(form);
    form.appendChild(labelphoto);
    form.appendChild(addPhoto);
    labelphoto.appendChild(textLabelPhoto);
    labelphoto.appendChild(preview);
    form.appendChild(labelTitre);
    form.appendChild(titre);
    form.appendChild(labelCat);
    form.appendChild(selectCat);
    selectCat.appendChild(catVide);

    for (let i = 0; i < categories.length; i++) {
        const cate = categories[i];
        const option = document.createElement("option");
        option.value = cate.id;
        option.textContent = cate.name;
        selectCat.appendChild(option);
     }

    form.appendChild(btnValider);
    form.appendChild(messageErreur);

    addPhoto.addEventListener("change", () => {
    const fichier = addPhoto.files[0];

        if (fichier) {
            preview.src = URL.createObjectURL(fichier);
            preview.style.display = "block";
            textLabelPhoto.style.display = "none";
        } else {
            preview.src = "";
            preview.style.display = "none";
            textLabelPhoto.style.display = "flex";
        }
    });

    

    const champs = form.querySelectorAll("[required]");
    function verifChamps() {
        const fichierValide = addPhoto.files.length > 0;
        const titreValide = titre.value.trim() !== "";
        const categorieValide = selectCat.value !== "";

        const formok = fichierValide && titreValide && categorieValide;

        btnValider.disabled = !formok;
        messageErreur.style.display = formok ? "none" : "block";

        if (!formok) {
            messageErreur.textContent = "Veuillez remplir tous les champs.";
        }

        else {
            console.log("Formulaire valide !");
        }
    }
    champs.forEach(champ => {
        champ.addEventListener("input", verifChamps);
    })

    const btnPrecedent = document.querySelector(".btn-precedent-modal");
    btnPrecedent.onclick = (event) => {
        event.preventDefault();
        affichageModal(works);
    }
    
    form.addEventListener("submit",async (event) => {
        event.preventDefault();
        const fichier = addPhoto.files[0];
        const titreSaisi = titre.value.trim();
        const categorieChoisie = selectCat.value;
        const formData = new FormData();
        formData.append("image", fichier);
        formData.append("title", titreSaisi);
        formData.append("category", categorieChoisie);
        await envoyerForm (formData);
    })

}

function resetModal () {
    modalMain.innerHTML = "";
    modalFooter.innerHTML = "";
    form.innerHTML = "";
}

async function envoyerForm (formData) {
    try {
        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
           body: formData
        });

        if (!reponse.ok) {
            throw new Error("Erreur lors de l'ajout de la photo.");
        }

        else {

            await majWorks();
            genererWorks(works);
            ajoutphoto(categories);
            
        }

    } catch (erreur) {
        console.log(erreur.message);
};
}

async function supprWork(idtravail) {
    try {
        const reponse = await fetch(`http://localhost:5678/api/works/${idtravail}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!reponse.ok) {
            throw new Error("Erreur lors de la suppression du travail");
        }
        else {
        console.log("Travail supprimé avec succès");

        await majWorks();
        genererWorks(works);
        affichageModal(works);
        }

    } catch (erreur) {
        console.log(erreur.message);
    }
}