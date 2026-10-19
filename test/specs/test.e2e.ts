import { expect } from '@wdio/globals'
import allure from '@wdio/allure-reporter'
import HomePage from '../pageobjects/HomePage'
import NoteEditorPage from '../pageobjects/NoteEditorPage'
import PinnedNotesPage from '../pageobjects/PinnedNotesPage'

const appPackage = 'com.s17labs.notesapp'

describe('Notes app', () => {
    beforeEach(async () => {
        await driver.terminateApp(appPackage)
        await driver.activateApp(appPackage)
    })

    it('should create and save a note', async () => {
        const title = `Create test ${Date.now()}`
        const text = `Text for ${title}`
        await allure.step('Create and save a new note', async () => {
            await HomePage.openNewNote()
            await NoteEditorPage.fillNote(title, text)
            await NoteEditorPage.returnToHome()
        })
        await allure.step('Find the note and verify its content', async () => {
            await HomePage.searchNotes(title)
            await expect(HomePage.noteTitle).toHaveText(title)
            await expect(HomePage.noteText).toHaveText(text)
        })
    })

    it('should find a note using search', async () => {
        const title = `Search target ${Date.now()}`
        const otherTitle = `Search unrelated ${Date.now()}`
        await allure.step('Create two notes with different titles', async () => {
            await HomePage.openNewNote()
            await NoteEditorPage.fillNote(title, 'Note for search test')
            await NoteEditorPage.returnToHome()
            await HomePage.openNewNote()
            await NoteEditorPage.fillNote(otherTitle, 'Unrelated note')
            await NoteEditorPage.returnToHome()
        })
        await allure.step('Search for one of the notes', async () => {
            await HomePage.searchNotes(title)
        })
        await allure.step('Verify that search returns exactly one result', async () => {
            await expect(HomePage.noteTitles).toBeElementsArrayOfSize(1)
            await expect(HomePage.noteTitle).toHaveText(title)
        })
    })

    it('should edit an existing note', async () => {
        const title = `Edit test ${Date.now()}`
        const updatedTitle = `${title} updated`
        const updatedText = 'Updated note text'
        await allure.step('Create the original note', async () => {
            await HomePage.openNewNote()
            await NoteEditorPage.fillNote(title, 'Original note text')
            await NoteEditorPage.returnToHome()
        })
        await allure.step('Find the note and open edit mode', async () => {
            await HomePage.searchNotes(title)
            await HomePage.openNote(title)
            await NoteEditorPage.openEditMode()
        })
        await allure.step('Update the note title and text', async () => {
            await NoteEditorPage.fillNote(updatedTitle, updatedText)
            await NoteEditorPage.exitEditMode()
            await NoteEditorPage.returnToHome()
        })
        await allure.step('Verify the updated note', async () => {
            await expect(HomePage.noteTitle).toHaveText(updatedTitle)
            await expect(HomePage.noteText).toHaveText(updatedText)
        })
    })

    it('should delete a note', async () => {
        const title = `Delete test ${Date.now()}`
        await allure.step('Create a note for deletion', async () => {
            await HomePage.openNewNote()
            await NoteEditorPage.fillNote(title, 'Note for deletion test')
            await NoteEditorPage.returnToHome()
        })
        await allure.step('Find and delete the note', async () => {
            await HomePage.searchNotes(title)
            await HomePage.openNote(title)
            await NoteEditorPage.deleteNote()
        })
        await allure.step('Verify that the deleted note cannot be found', async () => {
            await HomePage.searchNotes(title)
            await expect(HomePage.emptyView).toHaveText('No matching notes')
        })
    })

    it('should pin a note and find it in Pinned Notes', async () => {
        const title = `Pinned test ${Date.now()}`
        await allure.step('Create a note for pinning', async () => {
            await HomePage.openNewNote()
            await NoteEditorPage.fillNote(title, 'Note for pinning test')
            await NoteEditorPage.returnToHome()
        })
        await allure.step('Find and pin the note', async () => {
            await HomePage.searchNotes(title)
            await HomePage.openNote(title)
            await NoteEditorPage.pinNote()
            await NoteEditorPage.returnToHome()
        })
        await allure.step('Open Pinned Notes and verify the page', async () => {
            await HomePage.openPinnedNotes()
            await expect(PinnedNotesPage.title).toHaveText('Pinned Notes')
        })
        await allure.step('Verify that the note appears in Pinned Notes', async () => {
            await PinnedNotesPage.searchNotes(title)
            await expect(PinnedNotesPage.noteTitle).toHaveText(title)
        })
    })
})
