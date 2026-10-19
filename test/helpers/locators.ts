import { $, $$ } from '@wdio/globals'

const APP_PACKAGE = 'com.s17labs.notesapp'

export function appResourceId(id: string) {
    return `${APP_PACKAGE}:id/${id}`
}

export function byId(id: string) {
    return $(`id:${appResourceId(id)}`)
}

export function allById(id: string) {
    return $$(`id:${appResourceId(id)}`)
}
