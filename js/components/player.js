let player;
const playerContainer = $(".player");
const videoPaused = () => {
  if(playerContainer.hasClass("paused")) {
    playerContainer.removeClass("paused");
    player.pauseVideo();
  } else {
    playerContainer.addClass("paused");
    player.playVideo();
  }
}

let eventsEnit =() => {
$(".player__start").click(e => {
  videoPaused();
});

$(".player__pause").click(e => {
  videoPaused();
});

$(".html5-video-player").click(e => {
  videoPaused();
});

$(".player__volume").click(e => {

  if(playerContainer.hasClass("mute")) {
    playerContainer.removeClass("mute");
    player.mute();
  } else {
    playerContainer.addClass("mute");
    player.unMute();
  }
});

$(".player__splash-icon").click(e => {
  console.log("клик");
  debugger;
  if(playerContainer.hasClass("paused")) {
    playerContainer.removeClass("paused");
    debugger;
    player.pauseVideo();
  } else {
    playerContainer.addClass("paused");
    debugger
    player.playVideo();
  }
  // videoPaused();
});



$(".player__total").click(e => {
  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
  const newTotalPositionSeconds = (player.getDuration() / 100) * newButtonPositionPercent;
  
  $(".player__current").css({
    width: `${newButtonPositionPercent}%`
  });
  
  player.seekTo(newTotalPositionSeconds);
})

}

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  const seconds = addZero(Math.round(roundTime % 60));
  const minutes = addZero((roundTime - seconds) / 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
 return `${minutes} : ${seconds}`;
}

const onPlayerReady = function() {
  let interval;
  const durationSec = player.getDuration();
  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const copletedPercent = (completedSec /durationSec) * 100;  
    $(".player__current").css({
      width: `${copletedPercent}%`
    })

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000)
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '390',
    width: '660',
    videoId: '_z0m7TozqUo',
    events: {
      onReady: onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }, 
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsEnit();