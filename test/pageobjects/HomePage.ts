import { $, $$ } from '@wdio/globals'

class HomePage {
    get addNoteButton() {
        return $('~Add note')
    }

    get searchInput() {
        return $('id:com.s17labs.notesapp:id/searchEditText')
    }

    get noteTitle() {
        return $('id:com.s17labs.notesapp:id/noteTitle')
    }

    get noteTitles() {
        return $$('id:com.s17labs.notesapp:id/noteTitle')
    }

    get noteText() {
        return $('id:com.s17labs.notesapp:id/noteText')
    }

    get clearSearchButton() {
        return $('id:com.s17labs.notesapp:id/clearButton')
    }

    get emptyView() {
        return $('id:com.s17labs.notesapp:id/emptyView')
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
        await this.searchInput.setValue(query)
    }


    async openNote() {
        await this.noteTitle.click()
    }

    async clearSearch() {
        await this.clearSearchButton.click()
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
