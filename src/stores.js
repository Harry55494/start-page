import { persistStore } from "./persistStore";

const defaultSettings = {
    name: 'Harrison'
}

export const settings = persistStore('settings', defaultSettings);
