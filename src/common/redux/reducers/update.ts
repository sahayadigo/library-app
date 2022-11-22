// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { updateActions } from "readium-desktop/common/redux/actions";
import { UpdateState, UpdateStatus } from "readium-desktop/common/redux/states/update";

const initialState: UpdateState = {
    status: UpdateStatus.Unknown,
    latestVersion: null,
    latestVersionUrl: null,
};

export function updateReducer(
    state: UpdateState = initialState,
    action: updateActions.latestVersion.TAction,
) {
    switch (action.type) {
        case updateActions.latestVersion.ID:
            return Object.assign({}, state, {
                status: action.payload.status,
                latestVersion: action.payload.latestVersion,
                latestVersionUrl: action.payload.latestVersionUrl,
            });
        default:
            return state;
    }
}
