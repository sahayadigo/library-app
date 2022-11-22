// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import * as styles from "readium-desktop/renderer/assets/styles/myBooks.css";

import { TranslatorProps, withTranslator } from "../utils/hoc/translator";

// tslint:disable-next-line: no-empty-interface
interface IBaseProps extends TranslatorProps {
}
// IProps may typically extend:
// RouteComponentProps
// ReturnType<typeof mapStateToProps>
// ReturnType<typeof mapDispatchToProps>
// tslint:disable-next-line: no-empty-interface
interface IProps extends IBaseProps {
}

class NoPublicationInfo extends React.Component<IProps, undefined> {

    constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactElement<{}> {
        const { __ } = this.props;
        return (
            <>
                <div className={styles.noPublicationHelp}>
                    <p>{__("catalog.noPublicationHelpL1")}</p>
                    <p>{__("catalog.noPublicationHelpL2")}</p>
                    <p>{__("catalog.noPublicationHelpL3")}</p>
                </div>
            </>
        );
    }
}

export default withTranslator(NoPublicationInfo);
