const gallery = document.getElementById("gallery");
const searchBtn = document.getElementById("searchBtn");
const enterUser = document.getElementById("username");

window.addEventListener("DOMContentLoaded", ()=> {
    fetchRepos("kendall844");
});

searchBtn.addEventListener("click", () => {
    const username = enterUser.ariaValueMax.trim();
    if(username){
        fetchRepos(username);
    }
});

async function fetchRepos(username){
    clearGallery();
    gallery.textContent = "Loading...";

    try{
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const repos = await response.json();

        clearGallery();

        if(!repos || repos.length === 0){
            gallery.textContent = "No repositories found.";
            return;
        }
    }
}


