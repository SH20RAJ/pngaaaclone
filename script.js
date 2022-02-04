let s = (a) => document.getElementById(a);
let categories = WebScrapper.getjson('https://wholly-api.herokuapp.com/websites/pngaaa.com/categories.php');

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
    <figcaption>${caption}</figcaption>
  </figure>`;
    console.log(html);
    s(id).insertAdjacentHTML('beforeend', html);
  }

}
showresult('main','nature');

function showcat(id, a) {
  if (!a) a = categories.data.length;
  for (let i = 0; i < a; i++) {
    let cat = categories.data[i];
    s(id).insertAdjacentHTML('beforeend', '<article>' + cat + '</article>');
  }
}
showcat('folders', 3);
showcat('folders2');