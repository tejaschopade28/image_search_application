
const accesskey = "K-myDAW-sm4F86m4rvoLjp4gNfgJA8A0eUpj1KMs6Ts";

const formEl= document.querySelector("form");
const inputEl=  document.getElementById("search-input");
const searchResult= document.querySelector(".search-inside");
const showMore= document.getElementById("show-more-button");

let inputData="";

let  page=1;

async function searchImages(){
    inputData = inputEl.value;
    const url =  `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results= data.results;

    if(page === 1){
        searchResult.innerHTML="";
    }

    results.map((result)=>{
        const imageWrapper= document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image= document.createElement("img");
        image.src=result.urls.small;
        image.alt= result.alt_description
        const imageLink = document.createElement("a");
        imageLink.href =result.links.html;
        imageLink.target= "_blank";
        imageLink.textContent= result.alt_description; 

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    });

    page++;
    if(page > 1){
        showMore.style.display="block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();

});

showMore.addEventListener("click",()=>{
    searchImages();
});