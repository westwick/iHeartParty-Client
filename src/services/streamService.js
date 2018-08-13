import axios from 'axios';
import { getNick } from './auth';

let apiRoot;
if (window.location.href.includes("localhost")) {
  apiRoot = 'http://localhost:9090';
} else {
  apiRoot = 'http://api.iheart.party';
}

export function sendTrack (trackId) {
  return axios.post(apiRoot + '/rooms/1/vote', {
    type: 'ihr',
    id: trackId,
    user: getNick(),
    avatar: 'whatever',
    up: true
  });
}

export function voteTrack (trackId, up) {
  return axios.post(apiRoot + '/rooms/1/vote', {
    id: trackId,
    user: getNick(),
    avatar: 'whatever',
    up
  });
}

export function addYoutubeTrack(url) {
  return axios.post(apiRoot + '/rooms/1/vote', {
    type: 'yt',
    id: url,
    user: getNick(),
    avatar: 'whatever',
    up: true
  });
}

export function addRawTrack(url) {
  return axios.post(apiRoot + '/rooms/1/vote', {
    type: 'raw',
    id: url,
    user: getNick(),
    avatar: 'whatever',
    up: true
  });
}
