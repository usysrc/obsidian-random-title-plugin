import { MarkdownView, Plugin, TAbstractFile } from 'obsidian';


export default class RandomTitlePlugin extends Plugin {

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

	async onNewNote(file: TAbstractFile) {
		console.log("new note")

		await this.delay(10);
		await this.app.vault.rename(file, `${file.parent?.path}/${this.generateRandomTitle()}.md`);

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			const editor = view.editor;
			if (editor) {
				editor.focus();
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

	onunload() {

	}

}
