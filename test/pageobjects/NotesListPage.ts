import { $, $$ } from '@wdio/globals'

class NotesListPage {
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

    async searchNotes(query: string) {
        await this.searchInput.setValue(query)
    }

    async clearSearch() {
        await this.clearSearchButton.click()
    }
}

export default new NotesListPage()
