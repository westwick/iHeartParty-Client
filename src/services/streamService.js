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
    up: up
  });
}

