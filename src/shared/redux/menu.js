export const SET_IS_MENU_OPEN = 'SET_IS_MENU_OPEN';

const DEFAULTS = {
    isOpen: false
};

export default (state = DEFAULTS, action = {}) => {
    switch (action.type) {
        case SET_IS_MENU_OPEN:
            return { ...state, isOpen: action.isOpen };
        default:
            return state;
    }
};

export const setIsMenuOpen = isOpen => ({ type: SET_IS_MENU_OPEN, isOpen });

export const getIsMenuOpen = state => state.isOpen;
