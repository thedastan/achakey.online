import {ActionTypeForMusic, TypeForMusicModal, TypesModalForMusicInitail} from "../types/Types";

const initialState:TypesModalForMusicInitail = {
    modal:false
}

export const reducerMusicModal = (state = initialState  , action:ActionTypeForMusic):TypesModalForMusicInitail => {
    switch (action.type){
        case TypeForMusicModal.OPEN_MUSIC_MODAL:
            return {...state , modal:action.payload}
        default:
            return state
    }
}
