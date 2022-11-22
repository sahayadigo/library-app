// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { BrowserWindow, Menu, MenuItem, webContents } from "electron";
import { diMainGet } from "readium-desktop/main/di";
import { _CONTINUOUS_INTEGRATION_DEPLOY, IS_DEV } from "readium-desktop/preprocessor-directives";

let _darwinApplicationMenuAlreadySet = false; // application-wide menu, not dependent on individual BrowserWindows

export function setMenu(win: BrowserWindow, isReaderView: boolean) {
    if (process.platform === "darwin") {
        if (!_darwinApplicationMenuAlreadySet) {
            setMenuDarwin(win, isReaderView);
        }
        _darwinApplicationMenuAlreadySet = true;
    } else {
        setMenuWindowsLinux(win, isReaderView);
    }
}

function devMenu(win: BrowserWindow, _isReaderView: boolean): Electron.MenuItemConstructorOptions {
    if (_CONTINUOUS_INTEGRATION_DEPLOY) {
        return {
            label: "EPUB DEBUG",
            submenu: [
                {
                    label: "OPEN WEB INSPECTOR / DEVELOPER TOOLS",
                    accelerator: "Shift+Alt+CmdOrCtrl+I",
                    click: (_item: MenuItem, _focusedWindow: BrowserWindow) => {
                        for (const wc of webContents.getAllWebContents()) {
                            if (wc.hostWebContents) {
                                // wc.hostWebContents.id === readerWindow.webContents.id
                                wc.openDevTools({ mode: "detach" });
                            }
                        }
                    },
                },
            ],
        };
    }
    return {
        label: "DEV",
        submenu: [
            {
                label: "RELOAD WINDOW",
                accelerator: "CmdOrCtrl+R",
                click: (_item: MenuItem, focusedWindow: BrowserWindow) => {
                    if (focusedWindow) {
                        focusedWindow.webContents.reload();
                    } else {
                        const bw = BrowserWindow.getFocusedWindow();
                        if (bw) {
                            bw.webContents.reload();
                        } else if (win) {
                            win.webContents.reload();
                        } else {
                            const arr = BrowserWindow.getAllWindows();
                            arr.forEach((bww) => {
                                bww.webContents.reload();
                            });
                        }
                    }
                },
            },
            {
                label: "TOGGLE DEV TOOLS",
                accelerator: "Alt+CmdOrCtrl+I",
                click: (_item: MenuItem, focusedWindow: BrowserWindow) => {
                    if (focusedWindow) {
                        focusedWindow.webContents.toggleDevTools();
                    } else {
                        const bw = BrowserWindow.getFocusedWindow();
                        if (bw) {
                            bw.webContents.toggleDevTools();
                        } else if (win) {
                            win.webContents.toggleDevTools();
                        } else {
                            const arr = BrowserWindow.getAllWindows();
                            arr.forEach((bww) => {
                                bww.webContents.toggleDevTools();
                            });
                        }
                    }
                },
            },
            {
                type: "separator",
            },
            {
                label: "OPEN ALL DEV TOOLS",
                accelerator: "Shift+Alt+CmdOrCtrl+I",
                click: (_item: MenuItem, _focusedWindow: BrowserWindow) => {
                    const arr = BrowserWindow.getAllWindows();
                    arr.forEach((bww) => {
                        bww.webContents.openDevTools({ mode: "detach" });
                    });
                },
            },
            {
                label: "OPEN ALL R2-NAVIGATOR DEV TOOLS",
                accelerator: "Shift+Alt+CmdOrCtrl+I",
                click: (_item: MenuItem, _focusedWindow: BrowserWindow) => {
                    for (const wc of webContents.getAllWebContents()) {
                        if (wc.hostWebContents) {
                            // wc.hostWebContents.id === readerWindow.webContents.id
                            wc.openDevTools({ mode: "detach" });
                        }
                    }
                },
            },
            {
                type: "separator",
            },
            {
                label: "INJECT AXE A11Y CHECKER",
                accelerator: "Shift+Alt+CmdOrCtrl+A",
                click: (_item: MenuItem, _focusedWindow: BrowserWindow) => {
                    const arr = BrowserWindow.getAllWindows();
                    arr.forEach((bww) => {
                        bww.webContents.openDevTools({ mode: "detach" });
                        setTimeout(() => {
                            bww.webContents.send("AXE_A11Y", {});
                        }, 300);
                    });
                },
            },
        ],
    };
}

function setMenuWindowsLinux(win: BrowserWindow, isReaderView: boolean) {
    if (IS_DEV || (isReaderView && _CONTINUOUS_INTEGRATION_DEPLOY)) {
        const template: Electron.MenuItemConstructorOptions[] = [];
        template.push(devMenu(win, isReaderView));

        // Menu.setApplicationMenu(Menu.buildFromTemplate(template));
        win.setMenu(Menu.buildFromTemplate(template));
    } else {
        win.removeMenu();
        // win.setMenu(null);
    }
}

function setMenuDarwin(win: BrowserWindow, isReaderView: boolean) {
    const translator = diMainGet("translator");
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: "Thorium",
            submenu: [
                {
                    role: "togglefullscreen",
                },
                {
                    role: "minimize",
                },
                {
                    role: "close",
                },
                {
                    role: "front",
                },
                {
                    type: "separator",
                },
                {
                    role: "hide",
                },
                {
                    role: "hideothers",
                },
                {
                    role: "unhide",
                },
                {
                    type: "separator",
                },
                {
                    role: "services",
                    submenu: [],
                },
                {
                    type: "separator",
                },
                {
                    role: "quit",
                    // accelerator: "Command+Q",
                    // click: () => { app.quit(); },
                    label: translator.translate("app.quit"),
                },
            ] as Electron.MenuItemConstructorOptions[],
        },
        {
            label: translator.translate("app.edit.title"),
            role: "editMenu",
            submenu: [
                {
                    role: "undo",
                    // accelerator: "CmdOrCtrl+Z",
                    // selector: "undo:",
                    label: translator.translate("app.edit.undo"),
                },
                {
                    role: "redo",
                    // accelerator: "Shift+CmdOrCtrl+Z",
                    // selector: "redo:",
                    label: translator.translate("app.edit.redo"),
                },
                {
                    type: "separator",
                },
                {
                    role: "cut",
                    // accelerator: "CmdOrCtrl+X",
                    // selector: "cut:",
                    label: translator.translate("app.edit.cut"),
                },
                {
                    role: "copy",
                    // accelerator: "CmdOrCtrl+C",
                    // selector: "copy:",
                    label: translator.translate("app.edit.copy"),
                },
                {
                    role: "paste",
                    // accelerator: "CmdOrCtrl+V",
                    // selector: "paste:",
                    label: translator.translate("app.edit.paste"),
                },
                {
                    role: "selectall",
                    // accelerator: "CmdOrCtrl+A",
                    // selector: "selectAll:",
                    label: translator.translate("app.edit.selectAll"),
                },
            ] as Electron.MenuItemConstructorOptions[],
        },
    ];
    // isReaderView never invoked because single app-wide menu, does not depend on BrowserWindows
    // if (IS_DEV || (isReaderView && _CONTINUOUS_INTEGRATION_DEPLOY)) {
    if (IS_DEV || _CONTINUOUS_INTEGRATION_DEPLOY) {
        template.push(devMenu(win, isReaderView));
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
