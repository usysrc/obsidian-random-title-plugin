import { MarkdownView, Plugin, TAbstractFile } from 'obsidian';


export default class RandomTitlePlugin extends Plugin {

	/**
	 * Registers the new note event when the workspace layout is ready
	 */
	async onload() {
		this.app.workspace.onLayoutReady(() => {
			this.registerEvent(
				this.app.vault.on('create', (file) => {
					if (file.name.endsWith('.md')) {
						this.onNewNote(file);
					}
				})
			)
		})
	}

	/**
	 * Handles the creation of a new note.
	 * @param file - The abstract file to be used for creating the new note.
	 */
	async onNewNote(file: TAbstractFile) {
		// Add a delay of 10 milliseconds
		await this.delay(10);
		
		// Rename the file to a random title
		await this.app.vault.rename(file, `${file.parent?.path}/${this.generateRandomTitle()}.md`);

		// Set the focus on the new note
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			const editor = view.editor;
			if (editor) {
				editor.setCursor({ line: 1, ch: 0 });
			}
		}
	}

	async delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	generateRandomTitle() {
		return "New Note " + Date.now()
	}

}
