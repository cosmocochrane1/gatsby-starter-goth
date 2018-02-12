import fetch from 'fetch-jsonp';

export function getResults(...request) {
    return fetch(...request).then(response => response.json());
}

export function convertJsonToQuery(json) {
    let query = '';
    for (let key in json) {
        query += query.length ? '&' : '?';
        query += `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    }
    return query;
}
