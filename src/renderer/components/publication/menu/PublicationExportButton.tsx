// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import { PublicationView } from "readium-desktop/common/views/publication";
import { TPublicationApiExportPublication } from "readium-desktop/main/api/publication";
import { apiAction } from "readium-desktop/renderer/apiAction";
import { TranslatorProps, withTranslator } from "readium-desktop/renderer/components/utils/hoc/translator";

// tslint:disable-next-line: no-empty-interface
interface IBaseProps extends TranslatorProps {
    publicationView: PublicationView;
    exportPublication?: TPublicationApiExportPublication;
}

// IProps may typically extend:
// RouteComponentProps
// ReturnType<typeof mapStateToProps>
// ReturnType<typeof mapDispatchToProps>
// tslint:disable-next-line: no-empty-interface
interface IProps extends IBaseProps {
}

class PublicationExportButton extends React.Component<IProps, undefined> {

    constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactElement<{}>  {
        const { __ } = this.props;
        return (
                <span>
                    <button
                        role="menuitem"
                        onClick={this.onExport}
                    >
                        { __("catalog.export")}
                    </button>
                </span>
        );
    }

    private onExport = () => {
        const publicationView = this.props.publicationView;
        apiAction("publication/exportPublication", publicationView).catch((error) => {
            console.error(`Error to fetch publication/exportPublication`, error);
        });
    }
}

export default withTranslator(PublicationExportButton);
