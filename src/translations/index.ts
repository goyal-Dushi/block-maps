import text from "./text.json";

export type Translations = typeof text;
export type Language = keyof typeof text.lang;

export const translations: Translations = text;
