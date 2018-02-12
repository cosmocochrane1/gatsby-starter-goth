import { getResults, convertJsonToQuery } from './api';

const API_URL = 'http://ws.audioscrobbler.com/2.0';

const formatResults = result => {
    if (!result.recenttracks || !result.recenttracks.track) return;

    const data = result.recenttracks.track;
    const track = Array.isArray(data) ? data[0] : data;
    return {
        album: track.album['#text'],
        artist: track.artist['#text'],
        title: track.name,
        url: track.url
    };
};

export default function() {
    const params = {
        user: 'jonnymclaughlin',
        method: 'user.getrecenttracks',
        api_key: '8dbe72c2e9ac59dcb06571e04ea9b132',
        limit: 1,
        format: 'json'
    };
    return getResults(API_URL + convertJsonToQuery(params)).then(formatResults);
}
