function getQueryString(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var player;
var playlistId = getQueryString('list');

if (playlistId) {
    localStorage.setItem('list', playlistId);
} else {
    playlistId = localStorage.getItem('list');
}

function onPlayerReady(event) {
    event.target.loadPlaylist({list: playlistId});
    event.target.setLoop(true);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: { 'onReady': onPlayerReady }
    });
}
