let works = window.localStorage.getItem('works');
let categories = window.localStorage.getItem('categories');

async function getWorks () {
	if(works === null) {
		try {
		
			const reponse = await fetch("http://localhost:5678/api/works");

			if (!reponse.ok) {
				throw new Error("Problème de connexion API"); 

			}
			else {
				works = await reponse.json();
				const valeurworks = JSON.stringify(works);
				window.localStorage.setItem("works", valeurworks);
			}

		} 
		catch (erreur) {
			
			console.log(erreur.message);
		}
    }
	else {
		works = JSON.parse(works);
	}
	if(works) {
		genererWorks(works);
        genererFiltres(categories);
	}
}

async function getCategories () {
	if(categories === null) {
		try {
		
			const reponse = await fetch("http://localhost:5678/api/categories");

			if (!reponse.ok) {
				throw new Error("Problème de connexion API"); 

			}
			else {
				categories = await reponse.json();
				const valeurcategories = JSON.stringify(categories);
				window.localStorage.setItem("categories", valeurcategories);
			}

		} 
		catch (erreur) {
			
			console.log(erreur.message);
		}
    }
	else {
		categories = JSON.parse(categories);
	}
}

function genererWorks(works, IdCategory){   
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";

    if (IdCategory > 0) {
        works = works.filter(work => work.categoryId === IdCategory);
    }
    for (let i = 0; i < works.length; i++) {

        const figure = works[i];
        
        const worksElement = document.createElement("figure");
        worksElement.dataset.id = works[i].id;

        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = figure.title;
      
        divGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(captionElement);
     }
}

function genererFiltres(categories){   
    const divFiltres = document.querySelector(".filtres");
    divFiltres.innerHTML = "";

    const buttonTousElement = document.createElement("input");
    buttonTousElement.type = "submit";
    buttonTousElement.id = "0";
    buttonTousElement.value = "Tous";

    divFiltres.appendChild(buttonTousElement);

    for (let i = 0; i < categories.length; i++) {

        const category = categories[i];

        const buttonElement = document.createElement("input");
        buttonElement.type = "submit";
        buttonElement.id = category.id;
        buttonElement.value = category.name;

        divFiltres.appendChild(buttonElement);
    }
}

const inputs = document.querySelector(".filtres");
inputs.addEventListener("click", (event) => {
    IdCategory = Number(event.target.id);
    genererWorks(works, IdCategory)
})