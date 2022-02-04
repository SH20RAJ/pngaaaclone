let s = (a) => document.getElementById(a);
let categories = WebScrapper.getjson('https://wholly-api.herokuapp.com/websites/pngaaa.com/categories.php');
let bydefault = 'nature';

let searchparam = WebScrapper.getparam;

let c=a=>console.log(a);
//Functions
let getsearch = (cat, page) => {
  let nature = WebScrapper.getjson('https://wholly-api.herokuapp.com/websites/pngaaa.com/search.php?q=' + cat + '&page=' + page + '');
  return nature;
}

let showresult = (id,cat) => {
  let result = getsearch(cat);
  c(result);
  for (let i = 0; i < result.data.length; i++) {
    let url = 'https://image.pngaaa.com/' + result.data[i].substr(-3, 3) +'/'+ result.data[i]+'-middle.png';
    let caption = 'nature';

    let html = `<figure style="background-image: url(${url})">
    <figcaption><a href ="https://www.pngaaa.com/api-download/${result.data[i]}">Download</a></figcaption>
  </figure>`;
    console.log(html);
    s(id).insertAdjacentHTML('beforeend', html);
  }

}

if(searchparam('q')){
  showresult('main',searchparam('q'));
  s('q').value = searchparam('q');
  s('page').value = searchparam('page');
} else {
  showresult('main',bydefault);
}


function showcat(id, a) {
  if (!a) a = categories.data.length;
  for (let i = 0; i < a; i++) {
    let cat = categories.data[i];
    s(id).insertAdjacentHTML('beforeend', '<a href="'location.href+'?q=' + cat + '"> <article>' + cat + '</article></a>');
  }
}
showcat('folders', 3);
showcat('folders2');