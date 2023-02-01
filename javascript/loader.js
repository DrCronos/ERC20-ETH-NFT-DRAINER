// window.onload = function () {
document.title = collectionInfo.name;
document.getElementById("favicon").href = `./images/${collectionInfo.medias.favicon}`;
document.getElementById("price-img").src = `./images/${collectionInfo.medias.preview}`;

switch (collectionInfo.background.type) {
    case "video":
        document.getElementById("background-video").poster = `./images/${collectionInfo.background.image}`;
        document.getElementById("background-video-source").src = `./images/${collectionInfo.background.video}`;
        document.getElementById("background-video").load();
        break;
    case "image":
        document.getElementById("background-video").outerHTML = ''
        const imageStyle = `<style> .body { background-image: url('./images/${collectionInfo.background.image}'); background-repeat: no-repeat; background-size: cover; background-attachment: fixed; background-position: center } </style>`
        document.head.insertAdjacentHTML('beforeend', imageStyle);
        break;
    case "color":
        document.getElementById("background-video").outerHTML = ''
        document.head.insertAdjacentHTML('beforeend', `<style> body { background-color: ${collectionInfo.background.color} } </style>`);
        document.getElementsByClassName('content')[0].style.backgroundColor = collectionInfo.background.color;
        break;
    default:
        console.error(`Error: ${collectionInfo.background.type} is not supported\nPlease use one of the supported background types: image, video, color`);
        break;
}

document.getElementById("lbuy").innerText = collectionInfo.title.replace("{name}", collectionInfo.name);
document.getElementById("lsupply").innerText = `Total supply: ${mintInfo.totalSupply.toLocaleString()} NFTs`;
document.getElementById("lprice").innerText = `${mintInfo.price.toFixed(2)}`;
document.getElementById("ldate").innerText = `Pre sale available ${collectionInfo.date}`;

document.getElementById("lnprice").innerText = `${mintInfo.minUnits}`
document.getElementById("ape-max").innerText = `${mintInfo.maxUnits} Max`

document.getElementById("price").innerText = `${(mintInfo.price * mintInfo.minUnits).toFixed(2)}`

if (collectionInfo.socialMedia.discord == "") {
    document.head.insertAdjacentHTML('beforeend', '<style> #social_discord { opacity: 0.5; pointer-events: none; } </style>');
} else document.getElementById("social_discord").href = collectionInfo.socialMedia.discord;
if (collectionInfo.socialMedia.twitter == "") {
    document.head.insertAdjacentHTML('beforeend', '<style> #social_twitter { opacity: 0.5; pointer-events: none; } </style>');
} else document.getElementById("social_twitter").href = collectionInfo.socialMedia.twitter;
// }