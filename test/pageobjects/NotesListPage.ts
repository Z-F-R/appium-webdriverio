import { byId, allById } from '../helpers/locators'


class NotesListPage {
    get searchInput() {
        return byId('searchEditText')
    }

    get noteTitle() {
        return byId('noteTitle')
    }

    get noteTitles() {
        return allById('noteTitle')
    }


    get noteText() {
        return byId('noteText')
    }

    get clearSearchButton() {
        return byId('clearButton')
    }

    get emptyView() {
        return byId('emptyView')
    }

    async searchNotes(query: string) {
        await this.searchInput.setValue(query)
    }

    async clearSearch() {
        await this.clearSearchButton.click()
    }
}

export default new NotesListPage()
