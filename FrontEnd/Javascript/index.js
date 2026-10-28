let works = window.localStorage.getItem('works');
let categories = window.localStorage.getItem('categories');
let token = window.localStorage.getItem("token");
const form = document.createElement("form");
const modal = document.querySelector("#modifier-galery");
const modalHeader = document.querySelector(".modal-header");
const modalMain = document.querySelector(".modal-main");
const modalFooter = document.querySelector(".modal-footer");
const modalH3 = document.querySelector(".modal-h3");

getCategories ();

getWorks ().then(() => {
	if(works) {
		genererWorks(works);
		genererFiltres(categories);
		}
});
	
affichageUser ();

const logout = document.querySelector(".logout");
logout.addEventListener("click", function()  {
    window.localStorage.removeItem("token");
	token = null;
    affichageUser ();
});

const inputs = document.querySelector(".filtres");
inputs.addEventListener("click", (event) => {
    IdCategory = Number(event.target.id);
	inputs.querySelectorAll("input").forEach(input => {
		input.classList.remove("selected")
	});
			
	event.target.classList.add("selected");
    genererWorks(works, IdCategory)
})

const btnModifier = document.querySelector(".modifier");

btnModifier.addEventListener("click", () => {
    modal.showModal();
	affichageModal(works);
})

const btnFermer = document.querySelector(".btn-fermer-modal");
    btnFermer.addEventListener("click", () => {
    	modal.close();
		genererWorks(works);
		resetModal();
    })

modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.close();
		genererWorks(works);
		resetModal();
	}
})

