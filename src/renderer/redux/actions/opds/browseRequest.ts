// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Action } from "readium-desktop/common/models/redux";

export const ID = "OPDS_BROWSE_REQUEST";

export interface Payload {
    level: number;
    title: string;
    url: string;
}

export function build(level: number, title: string, url: string):
    Action<typeof ID, Payload> {

    return {
        type: ID,
        payload: {
            level,
            title,
            url,
        },
    };
}
build.toString = () => ID; // Redux StringableActionCreator
export type TAction = ReturnType<typeof build>;
