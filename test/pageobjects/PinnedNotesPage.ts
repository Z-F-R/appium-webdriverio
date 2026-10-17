import { $ } from '@wdio/globals'

class PinnedNotesPage {
    get title() {
        return $('id:com.s17labs.notesapp:id/toolbarTitle')
    }

    get searchInput() {
        return $('id:com.s17labs.notesapp:id/searchEditText')
    }

    get noteTitle() {
        return $('id:com.s17labs.notesapp:id/noteTitle')
    }

    get clearSearchButton() {
        return $('id:com.s17labs.notesapp:id/clearButton')
    }

    async searchNotes(query: string) {
        await this.searchInput.setValue(query)
    }

    async clearSearch() {
        await this.clearSearchButton.click()
    }
}

export default new PinnedNotesPage()