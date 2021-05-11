import {folio as baseFolio} from "@playwright/test";
import {BrowserContextOptions, LaunchOptions} from "playwright";

const builder = baseFolio.extend();

builder.browserOptions.override(async ({browserOptions}, runTest) => {
    const newLaunchOptions: LaunchOptions = {
        ...
        browserOptions,
        headless: false,
        timeout: 50000
    }
    await runTest(newLaunchOptions);
});

builder.contextOptions.override(async ({contextOptions}, runTest) => {
    const newContextOptions: BrowserContextOptions = {
        ...
        contextOptions
    }
    await runTest(newContextOptions);
})

const folio = builder.build();

export const it = folio.it;
export const expect = folio.expect;
export const test = folio.test;