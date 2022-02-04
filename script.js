let weburl =()=> location.href.split(/[?#]/)[0];

let s = (a) => document.getElementById(a);
let categories = WebScrapper.fetchjson('https://wholly-api.herokuapp.com/websites/pngaaa.com/categories.php');
let bydefault = 'nature';

let searchparam = WebScrapper.getparam;

let c=a=>console.log(a);
//Functions

let getdetails=(id)=>{
  let json = WebScrapper.fetchjson('https://wholly-api.herokuapp.com/websites/pngaaa.com/details.php?id='+id);
  let html = `
  <div class="clay" id="imgtitle">${json.title}</div>
   <div class="bar clay">
  <span id="date">${json.date}</span>
  <span id="size">${json.size}</span>
  <span class="filetype">${json.filetype}</span>
  <span id="dimentions">${json.dimensions}</span>
  <span id="licence">${json.license}</span>
  <span id="download"><a href="${json.download}">Download</a></span>
  </div>
  <div id="img" class="clay">
    <img src="${json.middle_size_image}" alt="${json.title}">
  </div>
  `;
  s('details').innerHTML = html;

  for (let i = 0; i < json.related.length; i++) {
    let url = 'https://image.pngaaa.com/' + json.related[i].substr(-3, 3) +'/'+ json.related[i]+'-small.png';

    let html = `<figure style="background-image: url(${url})">
    <figcaption><a href ="https://www.pngaaa.com/api-download/${json.related[i]}">Download</a> | <a href ="#details" onclick="view(${json.related[i]});">View</a></figcaption>
  </figure>`;
    s('main').insertAdjacentHTML("afterbegin",html);
  }

  
  
}
if(searchparam('details')){
  getdetails(searchparam('details'));
} 


let getsearch = (cat, page) => {
  if(!page) page = WebScrapper.getRandomInt(1,10);
  let url = 'https://wholly-api.herokuapp.com/websites/pngaaa.com/search.php?q=' + cat.replace(/\s+/g, '-') + '&page=' + page + '';
  let nature = WebScrapper.fetchjson(url);
  c(url);
  return nature;
}

let showresult = (id,cat,page) => {
  let result = getsearch(cat,page);
  c(result);
  for (let i = 0; i < result.data.length; i++) {
    let url = 'https://image.pngaaa.com/' + result.data[i].substr(-3, 3) +'/'+ result.data[i]+'-small.png';

    let html = `<figure style="background-image: url(${url})">
    <figcaption><a href ="https://www.pngaaa.com/api-download/${result.data[i]}">Download</a> | <a href ="#details" onclick="view(${result.data[i]});">View</a></figcaption>
  </figure>`;
    s(id).insertAdjacentHTML('beforeend', html);
  }

}
let view=(id)=>{
  getdetails(id);
  window.history.pushState('Pngaa','details.html','?details='+id);
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
};
if(searchparam('q')){
  showresult('main',searchparam('q'),searchparam('page'));
  s('q').value = searchparam('q');
  s('page').value = searchparam('page');
} else {
  showresult('main',bydefault,WebScrapper.getRandomInt(1,10));
}


function showcat(id, a) {
  if (!a) a = categories.data.length;
  for (let i = 0; i < a; i++) {
    let cat = categories.data[i];

    s(id).insertAdjacentHTML('beforeend', ' <article><a href="'+weburl()+'?q=' + cat.replace(/\s+/g, '-') + '">' + cat + '</a></article>');
  }
}
showcat('folders', 3);
showcat('folders2');




