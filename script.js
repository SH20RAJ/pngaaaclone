let weburl =()=> location.search.split(/[?#]/)[0];

let s = (a) => document.getElementById(a);
let categories = WebScrapper.fetchjson('https://wholly-api.herokuapp.com/websites/pngaaa.com/categories.php');
let bydefault = 'nature';

let searchparam = WebScrapper.getparam;

let c=a=>console.log(a);
//Functions
let getsearch = (cat, page) => {
  let url = 'https://wholly-api.herokuapp.com/websites/pngaaa.com/search.php?q=' + cat + '&page=' + page + '';
  let nature = WebScrapper.fetchjson(url);
  c(url);
  return nature;
}

let showresult = (id,cat,page) => {
  let result = getsearch(cat,page);
  c(result);
  for (let i = 0; i < result.data.length; i++) {
    let url = 'https://image.pngaaa.com/' + result.data[i].substr(-3, 3) +'/'+ result.data[i]+'-middle.png';

    let html = `<figure style="background-image: url(${url})">
    <figcaption><a href ="https://www.pngaaa.com/api-download/${result.data[i]}">Download</a> | <a href ="${url}" onclick="view(this.href)">View</a></figcaption>
  </figure>`;
    s(id).insertAdjacentHTML('beforeend', html);
  }

}
let view=()=>{};
if(searchparam('q')){
  showresult('main',searchparam('q'),searchparam('page'));
  s('q').value = searchparam('q');
  s('page').value = searchparam('page');
} else {
  showresult('main',bydefault,1);
}


function showcat(id, a) {
  if (!a) a = categories.data.length;
  for (let i = 0; i < a; i++) {
    let cat = categories.data[i];

    s(id).insertAdjacentHTML('beforeend', ' <article><a href="'+weburl()+'?q=' + cat + '">' + cat + '</a></article>');
  }
}
showcat('folders', 3);
showcat('folders2');