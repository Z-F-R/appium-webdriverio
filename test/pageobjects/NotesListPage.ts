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

    async getNoteByTitle(title: string) {
        const titles = await this.noteTitles
        for (const noteTitle of titles) {
            if (await noteTitle.getText() === title) {
                return noteTitle
            }
        }
        throw new Error(`Note with title "${title}" was not found`)
    }
}

export default new NotesListPage()
