const api_key = "96b8577a7a4d4d86b06b394446c1d79f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));//initially it will load page with news of india

function reload()//when clicked on logo, it will come back to home page 
{
    window.location.reload();
}
async function fetchNews(query)//function to pass keywords to search for news from nvbar items, search bar text
{
    const res = await fetch(`${url}${query}&apiKey=${api_key}`); //this is used for api link formation 
    const data = await res.json();//await can be used only inside async function, waits for promise
    console.log(data);
    bindData(data.articles);
}
function bindData(articles)
{
    const cardscontainer = document.getElementById("cards-container");
    const newscardtemp = document.getElementById("template-news-card");
    cardscontainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = newscardtemp.content.cloneNode(true);
        fillDataincard(cardclone, article);
        cardscontainer.appendChild(cardclone);
    });
}
    function fillDataincard(cardclone, article)
    {
        const newsImg = cardclone.querySelector("#newsimg");
        const newstitle = cardclone.querySelector("#newstitle");
        const newsSource = cardclone.querySelector("#news-source");
        const newsdesc = cardclone.querySelector("#news-desc");

        newsImg.src = article.urlToImage;
        newstitle.innerHTML = article.title;
        newsdesc.innerHTML = article.description;
        const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
        newsSource.innerHTML=`${article.source.name} · ${date}`;
        cardclone.firstElementChild.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        });
    }
    let curSelectedNav=null;
    function onNavItemClick(id)
    {
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove('active1');
        curSelectedNav=navItem;
        curSelectedNav.classList.add('active1');
    }
const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('text');
searchbutton.addEventListener("click", ()=>
{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active1');
    curSelectedNav=null;

})
