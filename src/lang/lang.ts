export default {
  authTokenIsInvalid: "Authorization token is invalid",
  back: "Back",
  addTranslation: "Add translation",
  loaderLabel: "Loading",
  createCategory: "Create...",
  save: "Save",
  wordOrPhrase: "Think of a word or phrase...",
  successCreateWord: "Done.",
  errorWordDuplicate: "Duplicate word or phrase title",
  successDeleteWord: (title: string): string =>
    `Word or phrase '${title}' deleted`,
  confirmDeleteWordTitle: (title: string) => `Delete "${title}"?`,
  cancelButton: "Cancel",
  confirmButton: "Confirm",
  translations: "Translations",
  translation: "First idea that comes to mind :)",
};
