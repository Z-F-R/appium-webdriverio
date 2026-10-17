
import { expect } from '@wdio/globals'
import allure from '@wdio/allure-reporter'
import HomePage from '../pageobjects/HomePage'
import NoteEditorPage from '../pageobjects/NoteEditorPage'
import PinnedNotesPage from '../pageobjects/PinnedNotesPage'

describe('Notes app', () => {
    it('should create and save a note', async () => {
        await allure.addStep('Open the new note editor')
        await HomePage.openNewNote()

        await allure.addStep('Enter note title and text')
        await NoteEditorPage.fillNote(
            'Appium test note',
            'Testing automatic save'
        )

        await allure.addStep('Save the note and return to the list')
        await NoteEditorPage.returnToHome()

        await allure.addStep('Verify the saved note')
        await expect(HomePage.noteTitle).toHaveText('Appium test note')
        await expect(HomePage.noteText).toHaveText('Testing automatic save')
    })

    it('should find a note using search', async () => {
        const title = `Search test ${Date.now()}`

        await allure.addStep('Create a note for the search test')
        await HomePage.openNewNote()
        await NoteEditorPage.fillNote(title, 'Note for search test')
        await NoteEditorPage.returnToHome()

        await allure.addStep('Search for the created note')
        await HomePage.searchNotes(title)

        await allure.addStep('Verify the search result')
        await expect(HomePage.noteTitle).toHaveText(title)

        await allure.addStep('Clear the search')
        await HomePage.clearSearch()
    })

    it('should edit an existing note', async () => {
        const title = `Edit test ${Date.now()}`
        const updatedTitle = `${title} updated`
        const updatedText = 'Updated note text'

        await allure.addStep('Create the original note')
        await HomePage.openNewNote()
        await NoteEditorPage.fillNote(title, 'Original note text')
        await NoteEditorPage.returnToHome()

        await allure.addStep('Find the note and open edit mode')
        await HomePage.searchNotes(title)
        await HomePage.openNote()
        await NoteEditorPage.openEditMode()

        await allure.addStep('Update the note title and text')
        await NoteEditorPage.fillNote(updatedTitle, updatedText)
        await NoteEditorPage.returnToHome()
        await NoteEditorPage.returnToHome()

        await allure.addStep('Verify the updated note')
        await expect(HomePage.noteTitle).toHaveText(updatedTitle)
        await expect(HomePage.noteText).toHaveText(updatedText)

        await allure.addStep('Clear the search')
        await HomePage.clearSearch()
    })

    it('should delete a note', async () => {
        const title = `Delete test ${Date.now()}`

        await allure.addStep('Create a note for deletion')
        await HomePage.openNewNote()
        await NoteEditorPage.fillNote(title, 'Note for deletion test')
        await NoteEditorPage.returnToHome()

        await allure.addStep('Find the note and delete it')
        await HomePage.searchNotes(title)
        await HomePage.openNote()
        await NoteEditorPage.deleteNote()

        if (await HomePage.clearSearchButton.isDisplayed()) {
            await HomePage.clearSearch()
        }

        await allure.addStep('Verify the deleted note is no longer found')
        await HomePage.searchNotes(title)
        await expect(HomePage.emptyView).toHaveText('No matching notes')

        await allure.addStep('Clear the search')
        await HomePage.clearSearch()
    })

    it('should pin a note and find it in Pinned Notes', async () => {
        const title = `Pinned test ${Date.now()}`

        await allure.addStep('Create a note for the pinning test')
        await HomePage.openNewNote()
        await NoteEditorPage.fillNote(title, 'Note for pinning test')
        await NoteEditorPage.returnToHome()

        await allure.addStep('Find the note and pin it')
        await HomePage.searchNotes(title)
        await HomePage.openNote()
        await NoteEditorPage.pinNote()
        await NoteEditorPage.returnToHome()

        await allure.addStep('Open Pinned Notes and verify the page')
        await HomePage.openPinnedNotes()
        await expect(PinnedNotesPage.title).toHaveText('Pinned Notes')

        await allure.addStep('Verify the note appears in Pinned Notes')
        await PinnedNotesPage.searchNotes(title)
        await expect(PinnedNotesPage.noteTitle).toHaveText(title)

        await allure.addStep('Clear the search and return to Notes')
        await PinnedNotesPage.clearSearch()
        await HomePage.returnToNotes()
    })
})
