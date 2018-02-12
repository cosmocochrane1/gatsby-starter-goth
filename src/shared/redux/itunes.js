import { find, isArray } from 'lodash';
import { getResults, convertJsonToQuery } from './api';

const API_URL = 'https://itunes.apple.com/search';

let searchedArtist = '';
let searchedTitle = '';

const prepForCompare = string => {
    return string
        .toLowerCase()
        .split(' - ')[0]
        .replace(/\(|\)/g, '')
        .replace(/'/g, '')
        .replace(/album/g, '')
        .replace(/version/g, '')
        .replace(/remastered/g, '')
        .replace(/digital remaster/g, '')
        .replace(/./g, '')
        .replace(/ /g, '');
};

const formatResults = result => {
    if (!isArray(result.results) || !result.results.length) {
        return {};
    }

    return find(result.results, track => {
        const artist = prepForCompare(track.artistName);
        const searchArtist = prepForCompare(searchedArtist);
        const title = prepForCompare(track.trackName);
        const searchTitle = prepForCompare(searchedTitle);

        return (
            encodeURI(artist).indexOf(encodeURI(searchArtist)) > -1 &&
            encodeURI(title).indexOf(encodeURI(searchTitle)) > -1
        );
    });
};

export default function({ artist, title }) {
    searchedArtist = artist;
    searchedTitle = title;

    const params = {
        media: 'music',
        limit: 10,
        term: `${artist} ${title.split(' - ')[0].replace(/ *\([^)]*\) */g, '')}`
    };
    return getResults(API_URL + convertJsonToQuery(params)).then(formatResults);
}
