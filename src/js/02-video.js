
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const time = throttle(data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000);

player.on('timeupdate', time);

const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime) {
  player.setCurrentTime(parseFloat(storedTime));
}