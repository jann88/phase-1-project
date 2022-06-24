const apiData = 'https://api.sampleapis.com/coffee/hot';
fetch(apiData)
    .then(resp => resp.json())
    .then(data => console.log(data[8].title.id));

function displayData(data) {
    document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
}
let navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = () => {
    navbar.classlist.toggle("active");
    searchForm.classlist.remove(active);
    orderItem.classlist.remove(active);
}
let searchForm = document.querySelector("search-form");
document.querySelector("#search-btn"), onclick = () => {
    searchForm.classlist.toggle(active);
    navbar.classlist.remove(active);
    orderItem.classlist.remove(active);
}
let orderItem = document.querySelector("order-items-container");
document.querySelector("#order-btn"), onclick = () => {
    orderItem.classlist.toggle(active);
    navbar.classlist.remove("active");
    orderItem.classlist.remove(active);
}
window.onscroll = () => {
    navbar.classlist.remove("active");
    searchForm.classlist.remove(active);
    orderItem.classlist.remove(active);
}