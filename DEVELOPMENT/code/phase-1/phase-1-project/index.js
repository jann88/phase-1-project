const apiData = 'https://api.sampleapis.com/coffee/hot';
fetch(apiData)
    .then(resp => resp.json())
    .then(data => console.log(data[8].title.id));

function displayData(data) {
    document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
}