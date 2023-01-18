import { persistStore } from "./persistStore";

const defaultSettings = {
    name: 'Friend',
    search_engine: 'duckduckgo'
}

export const settings = persistStore('settings', defaultSettings);

const defaultBookmarks = [
    {
        name: 'GitHub',
        url: 'https://github.com'
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/',
    },
    {
        name: 'Reddit',
        url: 'https://www.reddit.com/',
    },
    {
        name: 'LeetCode',
        url: 'https://leetcode.com/problemset/all/',
    }
]

export const bookmarks = persistStore('bookmarks', defaultBookmarks);

