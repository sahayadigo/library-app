// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import * as LoaderIcon from "readium-desktop/renderer/assets/icons/loader.svg";
import * as styles from "readium-desktop/renderer/assets/styles/loader.css";

import SVG from "./SVG";

export default class Loader extends React.Component<{}, undefined> {

    constructor(props: {}) {
        super(props);
    }

    public render(): React.ReactElement<{}>  {
        return (
            <div className={styles.loader}>
                <SVG svg={LoaderIcon}/>
            </div>
        );
    }
}
