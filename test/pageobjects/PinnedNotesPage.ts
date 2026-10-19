import { $ } from '@wdio/globals'
import NotesListPage from './NotesListPage'

class PinnedNotesPage {
    get title() {
        return $('id:com.s17labs.notesapp:id/toolbarTitle')
    }

    get searchInput() {
        return NotesListPage.searchInput
    }

    get noteTitle() {
        return NotesListPage.noteTitle
    }

    get clearSearchButton() {
        return NotesListPage.clearSearchButton
    }

    async searchNotes(query: string) {
        await NotesListPage.searchNotes(query)
    }

    async clearSearch() {
        await NotesListPage.clearSearch()
    }
}

export default new PinnedNotesPage()