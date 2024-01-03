
const API_KEY = "7a56891bb9484b5f8ebd924d85d2fbe4";

const url = "https://newsapi.org/v2/everything?q=";

// https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=7a56891bb9484b5f8ebd924d85d2fbe4 // eg: of an API

// when window is loadded, window has an load event, so when the load event is called then callback function has to trigger, where we fetch news and at start we will fetch news about india
window.addEventListener('load', () => fetchNews("India"));

function reload() { // to come on home page when clicked on logo
    window.location.reload();
}

async function fetchNews (query) { // query= whatever query you put you will get news of that
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); // we make a string so we put url then query and then api-key just like eg of API
    const data = await res.json(); // it waits to get the data(promise so await)
    bindData(data.articles); // we bind the articles we are getting
    console.log(data);
}

function bindData(articles) { // to clone the templates
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return; // if the article dosent have image return it and dont show image
        const cardClone = newsCardTemplate.content.cloneNode(true); // deep-cloning (whatever inside card will be cloned)
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone); // as many articles as many clones will be added in the container
    });
} 

function fillDataInCard(cardClone, article) { // to give/get all the template 
    const newsImg = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDes = cardClone.querySelector("#news-description");

    newsImg.src = article.urlToImage; // mention on the website match it with it
    newsTitle.innerHTML = article.title;
    newsDes.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { // to convert the date in human redable formate
    timeZone: "Asia/Jakarta" // search on net

    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => { // for getting each news by clicking on it
        window.open(article.url, "_blank"); // open in new tab
    });
}

let curSelectedNav = null; // at start nav items is not selected
function onNavItemClick(id) { // id = id and even search query
    fetchNews(id);
    const navItems = document.getElementById(id);
    curSelectedNav?.classList.remove('active'); // when you click new nav item(ipl/finance) so other should shut 
    curSelectedNav = navItems;
    curSelectedNav.classList.add('active'); // when you this it should start/get active class behaviour

}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return; // if the person dosent type what to search, so return directly
    fetchNews(query); // if they search something (query) get that news
    curSelectedNav?.classList.remove('active'); // when we search active state from nav item should go
    curSelectedNav = null;
});