export const RECENT_TRACK = 'RECENT_TRACK';
export const RECENT_TRACK_PREVIEW = 'RECENT_TRACK_PREVIEW';

export default (
    state = {
        artist: '',
        title: '',
        url: '',
        preview: ''
    },
    action = {}
) => {
    switch (action.type) {
        case RECENT_TRACK:
            const { artist, title, url } = action.track;
            return { ...state, artist, title, url };
        case RECENT_TRACK_PREVIEW:
            return {
                ...state,
                preview: action.preview
            };
        default:
            return state;
    }
};

export const recentTrack = track => ({ type: RECENT_TRACK, track });
export const recentTrackPreview = preview => ({ type: RECENT_TRACK_PREVIEW, preview });
