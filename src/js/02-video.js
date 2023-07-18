import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const CURRENT_TIME = 'videoplayer-current-time';

const player = new Player('vimeo-player', {
    id: "vimeo-player",
    width: 640
});
player.on('play', function() {
    console.log('played the video!');
});


function timeUpdate() {
  player.getCurrentTime().then(function(currentTime) {
    localStorage.setItem(CURRENT_TIME, currentTime)
}).catch(function(error) {
   console.log('Error getting the current time:', error)
});  
};

const throttleTimeUpdate = throttle(timeUpdate, 1000);
const saveTimeVideo = localStorage.getItem(CURRENT_TIME);
if (saveTimeVideo) {
   player.setCurrentTime(saveTimeVideo).then(function(seconds) {
     console.log('The alarm position is set to ', seconds, 'seconds');
}).catch(function(error) {
//    console.log('Error setting the current time:', error);
}); 
};
player.on('timeupdate', throttleTimeUpdate);