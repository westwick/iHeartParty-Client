import axios from 'axios';
import { getNick } from './auth';

const apiRoot = 'http://api.iheart.party';
// const apiRoot = 'http://localhost:9090';

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

