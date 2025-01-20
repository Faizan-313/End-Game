import { words } from "./word";

let randomIndex;
export function getWord(){
    randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].word;
}

export function getHint(){
    return words[randomIndex].hint;
}

export function getFarewellText(language) {
    const options = [
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, your watch has ended`,
        `${language} has left the building`,
        `So long, ${language}, and thanks for all the syntax!`,
        `${language}, you've been deprecated... but not forgotten!`,
        `${language}, consider this your final commit.`,
        `Goodbye, ${language}, and may your code never be spaghetti.`,
        `${language}, you were the classiest of them all.`,
        `404: ${language} not found anymore.`,
        `${language}, it's time to close the final tag.`,
        `${language}, you've been garbage collected.`,
        `End of file for ${language}.`,
        `The stack is empty, ${language}. Farewell!`,
        `${language}, you've been compiled for the last time.`,
        `${language}, you were a solid state of awesome.`,
        `${language}, we've pushed our final changes.`,
        `${language}, you'll forever live in the legacy code.`,
        `${language}, see you in the great codebase beyond.`,
        `One last breakpoint for ${language}.`,
        `Shift+Del: ${language} removed.`,
        `${language}, the ultimate bug fix.`,
        `CTRL+Z won't save you now, ${language}.`,
        `${language}, thanks for the memories—and the bugs.`,
        `No more loops for ${language}. It's infinite peace now.`,
        `${language}, you've thrown your final exception.`,
        `${language}, you're out of scope now.`,
        `Gone but still documented, ${language}.`,
        `Last pull request: ${language} into oblivion.`,
        `${language}, rest in infinite recursion.`,
        `${language}, you're now part of the legacy branch.`,
        `${language}, your namespace will be missed.`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}