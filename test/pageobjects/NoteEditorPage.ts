import { $ } from '@wdio/globals'
import { byId } from '../helpers/locators'

class NoteEditorPage {
    get titleInput() {
        return byId('titleEditText')
    }

    get noteInput() {
        return byId('noteEditText')
    }

    get backButton() {
        return byId('backButton')
    }

    get editButton() {
        return byId('editButton')
    }

    get moreButton() {
        return byId('moreButton')
    }

    get deleteOption() {
        return $('android=new UiSelector().text("Delete")')
    }

    get pinButton() {
        return byId('pinButton')
    }

    async fillNote(title: string, text: string) {
        await this.titleInput.setValue(title)
        await this.noteInput.setValue(text)
    }

    async openEditMode() {
        await this.editButton.click()
    }

    async exitEditMode() {
        await this.backButton.click()
    }

    async returnToHome() {
        await this.backButton.click()
    }

    async deleteNote() {
        await this.moreButton.click()
        await this.deleteOption.click()
    }

    async pinNote() {
        await this.pinButton.click()
    }
}

export default new NoteEditorPage()
