import { byId } from '../helpers/locators'
import NotesListPage from './NotesListPage'

class PinnedNotesPage {
    get title() {
        return byId('toolbarTitle')
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
