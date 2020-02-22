export const INFOBAR_MESSAGE_UPDATE = "INFOBAR_MESSAGE_UPDATE";

const initialInfobarState = {
    message: null,
    type: null,
    show: false
};

export function infobarReducer(state = initialInfobarState, action) { 
    switch (action.type) {
        case INFOBAR_MESSAGE_UPDATE:
            return Object.assign({}, state, { 
                message: action.payload.message,
                type: action.payload.type,
                show: action.payload.show
            });
        default:
            return state;
    }
}