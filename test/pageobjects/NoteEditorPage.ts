
import { $ } from '@wdio/globals'

class NoteEditorPage {
    get titleInput() {
        return $('id:com.s17labs.notesapp:id/titleEditText')
    }

    get noteInput() {
        return $('id:com.s17labs.notesapp:id/noteEditText')
    }

    get backButton() {
        return $('id:com.s17labs.notesapp:id/backButton')
    }

    get editButton() {
        return $('id:com.s17labs.notesapp:id/editButton')
    }

    get moreButton() {
        return $('id:com.s17labs.notesapp:id/moreButton')
    }

    get deleteOption() {
        return $('android=new UiSelector().text("Delete")')
    }

    get pinButton() {
        return $('id:com.s17labs.notesapp:id/pinButton')
    }

    async fillNote(title: string, text: string) {
        await this.titleInput.setValue(title)
        await this.noteInput.setValue(text)
    }

    async openEditMode() {
        await this.editButton.click()
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
