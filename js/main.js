'use-strict'

function onInit() {
    const videosPrm =  getVideos()
    if(!isCacheMode()){
        console.log('bringing from url');
        console.log(videosPrm);
        videosPrm.then(videos => renderVideos(videos))
    }else renderVideos(videosPrm)


    const wiki = getWiki()
    wiki.then(wiki => renderWiki(wiki))
}


function onSendSearch(val) {
    console.log(val);
    updateSearch(val)
    location.reload();
}

function renderVideos(videos) {
    console.log(videos);
    var strHTML = videos.map(video => {
        return `
        <div onclick="onRenderVideo('${video.videoId}')" class="card flex">
        <h4 class:"title">${video.title}</h4>
        <img  onload="onImgLoad('${video.videoId}')" src= "${video.videoImg}" alt="">
                    </div>
        `
    }).join('')
    console.log(videos);
    document.querySelector('.videos-list-conatiner').innerHTML = strHTML
}

function onImgLoad(vidId){
    onRenderVideo(vidId)
}

function onRenderVideo(vidId) {
    document.querySelector('.player').src = `https://www.youtube.com/embed/${vidId}`
}

function renderWiki({ title, snippet }) {
    let strHTML =
        ` 
     <div class="wiki flex">
    <h2>${title}</h2>
    <p>${snippet}</p>
</div>
    
    `

    document.querySelector('.wiki-container').innerHTML = strHTML

}