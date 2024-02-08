const accessKey = "RkiJf0bEiwNf8sV2CgY85BWtucfMGfbM3_ZhxvrmZWA";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const favorites = document.getElementById("favorites");

let keyword = "";
let page = 1;
let favoriteImages = JSON.parse(localStorage.getItem("favoriteImages")) || [];

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page == 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const heart = document.createElement("i");
        heart.classList.add("heart", "far", "fa-heart");
        if (favoriteImages.find(img => img.urls.small === image.src)) {
            heart.classList.remove("far");
            heart.classList.add("fas");
        }
        heart.onclick = function() {
            this.classList.toggle("fas");
            this.classList.toggle("far");
            if (this.classList.contains("fas")) {
                favoriteImages.push(result);
            } else {
                favoriteImages = favoriteImages.filter(img => img.id !== result.id);
            }
            localStorage.setItem("favoriteImages", JSON.stringify(favoriteImages));
            displayFavorites();
        };

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageContainer.appendChild(image);
        imageContainer.appendChild(heart);
        searchResult.appendChild(imageContainer);
    })
    showMoreBtn.style.display = "block";
}

function displayFavorites() {
    favorites.innerHTML = "";
    favoriteImages.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const heart = document.createElement("i");
        heart.classList.add("heart", "fas", "fa-heart");
        heart.onclick = function() {
            this.classList.toggle("fas");
            this.classList.toggle("far");
            favoriteImages = favoriteImages.filter(img => img.id !== result.id);
            localStorage.setItem("favoriteImages", JSON.stringify(favoriteImages));
            displayFavorites();
            updateMainSection();
        };

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageContainer.appendChild(image);
        imageContainer.appendChild(heart);
        favorites.appendChild(imageContainer);
    })
}

function updateMainSection() {
    Array.from(searchResult.getElementsByClassName("image-container")).forEach(imageContainer => {
        const img = imageContainer.getElementsByTagName("img")[0];
        const heart = imageContainer.getElementsByClassName("heart")[0];
        if (favoriteImages.find(img => img.urls.small === img.src)) {
            heart.classList.remove("far");
            heart.classList.add("fas");
        } else {
            heart.classList.remove("fas");
            heart.classList.add("far");
        }
    });
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})

window.onload = displayFavorites;
