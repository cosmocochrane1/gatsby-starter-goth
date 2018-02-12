import { recentTrack, recentTrackPreview } from './redux/now-listening';
import fetchRecentTrack, { formatTrack } from './redux/last-fm';
import fetchRecentTrackPreview from './redux/itunes';
import { setIsMenuOpen } from './redux/menu';

export function getNowListening() {
    console.log('aslkdfjalskdjfklsd');
    return function(dispatch) {
        return fetchRecentTrack()
            .then(track => {
                dispatch(recentTrack(track));
                return fetchRecentTrackPreview(track);
            })
            .then(results => {
                if (results && results.previewUrl) {
                    dispatch(recentTrackPreview(results.previewUrl));
                }
            });
    };
}

export function toggleMenu(isOpen = false) {
    return function(dispatch) {
        return dispatch(setIsMenuOpen(isOpen));
    };
}
