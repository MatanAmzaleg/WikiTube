'use-strict'

const SEARCH_KEY = 'searchWord'
const STORAGE_KEY = 'userCache'
const gUserCache = loadFromStorage(STORAGE_KEY) || {}
let gCurrValue = loadFromStorage(SEARCH_KEY) || 'calvinharris'
let gCacheMode = false


const API_KEY = 'AIzaSyCCV_TxJrepWN7LqvUfBHhythSt7dlTrNE'
const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${gCurrValue}&maxResults=9`
const wikiUrl = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${gCurrValue}&format=json`

// getVideos()
getWiki()


function updateSearch(val){
    gCurrValue = val
    saveToStorage(SEARCH_KEY, gCurrValue)
}

function getWiki(){
    return fetch(wikiUrl)
    .then(res => res.json())
    .then(res=> res.query.search)
    .then(res=> {return res[0]})
}

function isCacheMode(){
    return gCacheMode
}


function getVideos(){
    if(gUserCache[0].title.toLowerCase().includes(gCurrValue.toLowerCase())){
        console.log('retrieving from cache');
        gCacheMode = true
        return loadFromStorage(STORAGE_KEY)
    }else {
        return fetch(youtubeUrl)
    .then(res=> res.json())
    .then(videos => {
        const videosPrms = videos.items.map(video => {
            return{
                videoId:video.id.videoId,
                videoImg: video.snippet.thumbnails.default.url,
                title: video.snippet.title,
            }
        })
        saveToStorage(STORAGE_KEY, videosPrms)
        return Promise.all(videosPrms)
     })
    }  
    

}
