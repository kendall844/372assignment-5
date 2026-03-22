const gallery = document.getElementById("gallery");
const searchBtn = document.getElementById("searchBtn");
const enterUser = document.getElementById("username");

window.addEventListener("DOMContentLoaded", () => {
    fetchRepos("kendall844");
});

searchBtn.addEventListener("click", () => {
    const username = enterUser.value.trim();
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
        if (!response.ok) {
            throw new Error("User not found");
        }

        const repos = await response.json();

        clearGallery();

        if (!repos || repos.length === 0) {
            gallery.textContent = "No repositories found.";
            return;
        }

        for (let i = 0; i < repos.length; i++) {
            let repo = repos[i];

            const languages = await fetchLanguages(repo.languages_url);
            const repoCard = createRepoCard(repo, languages);
            gallery.appendChild(repoCard);
        }
    } catch (error) {
        clearGallery();
        gallery.textContent = "Error: Could not fetch data.";
        console.error(error);
    }
}

function createRepoCard(repo, languages) {
    const div = document.createElement("div");
    div.classList.add("repo");

    const title = document.createElement("h3");
    const icon = document.createElement("i");
    icon.classList.add("fa-brands", "fa-github");
    title.appendChild(icon);
    title.appendChild(document.createTextNode(repo.name));

    const descript = document.createElement("p");
    descript.textContent = repo.description || "Description not provided";

    const created = document.createElement("p");
    created.textContent = "Created: " + formatDate(repo.created_at);

    const updated = document.createElement("p");
    updated.textContent = "Updated: " + formatDate(repo.updated_at);

    const langs = document.createElement("p");
    langs.textContent = "Languages: " + (languages.join(", ") || "No languages");

    const watchers = document.createElement("p");
    watchers.textContent = "Watchers: " + repo.watchers_count;

    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";
    link.textContent = "View Repository Here";

    div.appendChild(title);
    div.appendChild(descript);
    div.appendChild(created);
    div.appendChild(updated);
    div.appendChild(langs);
    div.appendChild(watchers);
    div.appendChild(link);

    return div;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

async function fetchLanguages(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return Object.keys(data);
    } catch {
        return [];
    }
}


