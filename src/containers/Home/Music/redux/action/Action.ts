import {ActionTypeForMusic, TypeForMusicModal} from "../types/Types";

export const ActionMusicModal = (payload:boolean):ActionTypeForMusic => {
    return  {type:TypeForMusicModal.OPEN_MUSIC_MODAL , payload}
}
