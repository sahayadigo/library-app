// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";
import * as ArrowRightIcon from "readium-desktop/renderer/assets/icons/baseline-arrow_forward_ios-24px.svg";
import * as styles from "readium-desktop/renderer/assets/styles/slider.css";
import SVG from "readium-desktop/renderer/components/utils/SVG";

import { TranslatorProps, withTranslator } from "./hoc/translator";

// tslint:disable-next-line: no-empty-interface
interface IBaseProps extends TranslatorProps {
    content: JSX.Element[];
    className?: string;
}

// IProps may typically extend:
// RouteComponentProps
// ReturnType<typeof mapStateToProps>
// ReturnType<typeof mapDispatchToProps>
// tslint:disable-next-line: no-empty-interface
interface IProps extends IBaseProps {
}

interface IState {
    position: number;
    refreshVisible: boolean;
}

class Slider extends React.Component<IProps, IState> {
    private contentRef: any;
    private contentElRefs: any[] = [];
    private wrapperRef: any;
    private contentElVisible: boolean[] = [];

    constructor(props: IProps) {
        super(props);

        this.state = {
            position: 0,
            refreshVisible: true,
        };

        this.update = this.update.bind(this);

        this.contentRef = React.createRef();
        this.wrapperRef = React.createRef();
    }

    public componentDidMount() {
        this.setState({refreshVisible: true});
        window.addEventListener("resize", this.update);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.update);
    }

    public componentDidUpdate() {
        if (this.state.refreshVisible) {
            this.contentElRefs.map((element, index) => {
                /*The this.contentElRefs array is automatically populated in the render() > createContent() function,
                via the div element's ref callback (ref={(ref) => this.contentElRefs[index] = ref}),
                which can be invoked with null during the element's "unmount"
                lifecycle (see https://reactjs.org/docs/refs-and-the-dom.html ).
                Consequently, we need to check for possibly-null values in the this.contentElRefs array,
                in this componentDidUpdate() function. However, we can safely ignore usages of this.contentElRefs
                in the moveInView() and isElementVisible() functions, as these are guaranteed to be invoked when
                the element is still "mounted" (see the onFocus callback).*/
                if (element) {
                    const buttonList = element.getElementsByTagName("button");
                    for (const button of buttonList) {
                        if (!this.isElementVisible(index)) {
                            button.tabIndex = "-1";
                        } else {
                            button.tabIndex = "0";
                        }
                    }
                }
            });
            this.setState({refreshVisible: false});
        }
    }

    public render(): React.ReactElement<{}>  {
        const { className, __ } = this.props;

        const list = this.createContent();
        let max = 0;
        if (this.contentRef.current && this.wrapperRef.current) {
            max = -this.contentRef.current.offsetWidth + this.wrapperRef.current.offsetWidth;
        }

        const varStyle = {
            left: this.state.position + "px",
            transition: "left 0.5s",
        };

        return (
            <div className={(className ? className + " " : "") + styles.wrapper}>
                {this.state.position < 0 ?
                    <button
                        aria-label={__("accessibility.leftSlideButton")}
                        className={styles.back}
                        onClick={this.handleMove.bind(this, false)}
                    >
                        <SVG svg={ArrowRightIcon}/>
                    </button>
                : <div className={styles.button_substitute}/>
                }
                <div ref={this.wrapperRef} className={styles.content_wrapper}>
                    <div ref={this.contentRef} className={styles.content} style={varStyle}>
                        {list}
                    </div>
                </div>
                {this.state.position > max ?
                    <button
                        onClick={this.handleMove.bind(this, true)}
                        aria-label={__("accessibility.rightSlideButton")}
                    >
                        <SVG svg={ArrowRightIcon}/>
                    </button>
                : <div className={styles.button_substitute}/>
                }
            </div>
        );
    }

    private handleMove(moveRight: number) {
        let  step = this.wrapperRef.current.offsetWidth / 2;
        if (moveRight) {
            step = -step;
        }
        const max = -this.contentRef.current.offsetWidth + this.wrapperRef.current.offsetWidth;
        let position = this.state.position + step;
        if (position > 0) {
            position = 0;
        } else if (position < max) {
            position = max;
        }

        this.setState({position, refreshVisible: true});
    }

    private moveInView(elementId: number) {
        const max = -this.contentRef.current.offsetWidth + this.wrapperRef.current.offsetWidth;
        const element = this.contentElRefs[elementId];

        let elementPosition = -element.offsetLeft;
        const isVisible = this.isElementVisible(elementId);
        if (!isVisible) {
            elementPosition = elementPosition > 0 ? 0 : elementPosition < max ? max : elementPosition;
            this.setState({position: elementPosition, refreshVisible: true});
        }
    }

    private createContent(): JSX.Element[] {
        const content = this.props.content;

        const visible = this.contentElVisible;

        return content.map((element, index) => {
            const props: any = {};
            if (!visible[index]) {
                props.tabIndex = -1;
            }
            return (
                <div
                    ref={(ref) => this.contentElRefs[index] = ref}
                    key={index}
                    onFocus={() => this.moveInView(index)}
                    {...props}
                >
                    {element}
                </div>
            );
        });
    }

    private isElementVisible(elementId: number) {
        const element = this.contentElRefs[elementId];
        const wrapperWidth = this.wrapperRef.current.offsetWidth;
        const position = this.state.position;
        const elementPosition = -element.offsetLeft;
        const elementWidth = element.offsetWidth;

        const isVisible = elementPosition <= position && elementPosition - elementWidth >= position - wrapperWidth;
        return isVisible;
    }

    private update() {
        this.setState({refreshVisible: true});
    }
}

export default withTranslator(Slider);
