let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '390',
    width: '660',
    videoId: '_z0m7TozqUo',
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}