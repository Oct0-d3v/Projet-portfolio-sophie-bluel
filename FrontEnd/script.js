let works = window.localStorage.getItem('works');

async function getWorks () {
    if (works === null){
        const reponse = await fetch('http://localhost:5678/api/works');
        works = await reponse.json();
        const valeurworks = JSON.stringify(works);
        window.localStorage.setItem("works", valeurworks);
    }
    else{
        works = JSON.parse(works);
    }
}

function genererWorks(works){
    for (let i = 0; i < works.length; i++) {

        const figure = works[i];
        const divGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("figure");
        worksElement.dataset.id = works[i].id

        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = figure.title;
      
        divGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(captionElement);
     }
}

getWorks ();

genererWorks(works);