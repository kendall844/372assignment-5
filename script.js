const gallery = document.getElementById("gallery");
const searchBtn = document.getElementById("searchBtn");
const enterUser = document.getElementById("username");

window.addEventListener("DOMContentLoaded", () => {
    fetchRepos("kendall844");
});

searchBtn.addEventListener("click", () => {
    const username = enterUser.ariaValueMax.trim();
    if (username) {
        fetchRepos(username);
    }
});

function clearGallery() {
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
}

async function fetchRepos(username) {
    clearGallery();
    gallery.textContent = "Loading...";

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const repos = await response.json();

        clearGallery();

        if (!repos || repos.length === 0) {
            gallery.textContent = "No repositories found.";
            return;
        }

        for (let i = 0; i < repos.length; i++) {
            let repo = repos[i];

            const languages = await fetchLang(repo.languages_url);
            const repoCard = createRepoCard(repo, languages);
            gallery.appendChild(repoCard);
        }
    } catch (error) {
        clearGallery();
        gallery.textContent = "Error: Could not fetch data.";
        console.error(error);
    }
}



