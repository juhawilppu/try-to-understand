import { FETCH_USER, SAVE_USER } from "../actions/types";

export default (state = null, action : any) => {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case SAVE_USER:
            return action.payload || false;
        default:
            return state;
    }
}