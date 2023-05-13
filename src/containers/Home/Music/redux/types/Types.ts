export enum TypeForMusicModal {
    OPEN_MUSIC_MODAL = 'OPEN_MUSIC_MODAL'
}

export  interface TypesModalForMusicInitail {
    modal:boolean
}

export interface IActionTypeForMusicModal {
    type:TypeForMusicModal.OPEN_MUSIC_MODAL,
    payload:boolean
}

export type ActionTypeForMusic = IActionTypeForMusicModal