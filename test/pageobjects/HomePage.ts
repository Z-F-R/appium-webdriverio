import { $ } from '@wdio/globals'
import NotesListPage from './NotesListPage'

class HomePage {
    get addNoteButton() {
        return $('~Add note')
    }

    get searchInput() {
        return NotesListPage.searchInput
    }

    get noteTitle() {
        return NotesListPage.noteTitle
    }

    get noteTitles() {
        return NotesListPage.noteTitles
    }

    get noteText() {
        return NotesListPage.noteText
    }

    get clearSearchButton() {
        return NotesListPage.clearSearchButton
    }

    get emptyView() {
        return NotesListPage.emptyView
    }

    get menuButton() {
        return $('id:com.s17labs.notesapp:id/menuButton')
    }

    get pinnedMenuItem() {
        return $('android=new UiSelector().resourceId("com.s17labs.notesapp:id/design_menu_item_text").text("Pinned")')
    }

    get notesMenuItem() {
        return $('android=new UiSelector().resourceId("com.s17labs.notesapp:id/design_menu_item_text").text("Notes")')
    }

    async openNewNote() {
        await this.addNoteButton.click()
    }

    async searchNotes(query: string) {
        await NotesListPage.searchNotes(query)
    }

    async openNote() {
        await this.noteTitle.click()
    }

    async clearSearch() {
        await NotesListPage.clearSearch()
    }

    async openPinnedNotes() {
        await this.menuButton.click()
        await this.pinnedMenuItem.click()
    }

    async returnToNotes() {
        await this.menuButton.click()
        await this.notesMenuItem.click()
    }
}

export default new HomePage()
