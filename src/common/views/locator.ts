// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Locator, LocatorType } from "readium-desktop/common/models/locator";

import { Identifiable } from "../models/identifiable";
import { IdentifiableView } from "./base";

export interface LocatorView extends Identifiable {
    locator: Locator;
    locatorType: LocatorType;
    identifiableView: IdentifiableView;
    name: string;
}
