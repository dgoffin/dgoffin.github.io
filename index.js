var json = {"items": [
 {
   "title": "sample 1",
   "author": "author 1"
 },
 {
  "title": "sample 2",
  "author": "author 2"
 }
]};

var news = document.getElementsByClassName("proposals-list")[0];
var items = json.items;
for(var i = 0; i < items.length; i++) {
    var h5 = document.createElement("h5");
    h5.innerHTML = items[i].title;
    news.appendChild(h5);
    var p = document.createElement("p");
    p.innerHTML = items[i].author;
    news.appendChild(p);
    
    

