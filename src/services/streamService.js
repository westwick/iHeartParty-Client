import axios from 'axios';
import { getNick } from './auth';

const apiRoot = 'http://api.iheart.party';

export function sendTrack (trackId) {
  return axios.post(apiRoot + '/room/1/vote', {
    id: trackId,
    user: getNick(),
    up: true
  });
}

