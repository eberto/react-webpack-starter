import * as React from "react"
import { assign } from "lodash"
import Popover from "material-ui/Popover"
import Menu from "material-ui/Menu"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"
import HardwareKeyboardArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import HardwareKeyboardArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import ArrowDropDown from "material-ui/svg-icons/navigation/arrow-drop-down"

export interface IPaginationProps {
    pageSize: number;
    pageSizes?: Array<number>;
    totalElements: number;
    onPageSizeChange: (newPageSize: number, oldPageSize: number) => void;
    onBefore: (currentPage: number, pageSize: number) => void;
    onNext: (currentPage: number, pageSize: number) => void;
}

export interface IPaginationState {
    currentPage?: number;
    currentPageSize?: number;
    rangeLeft?: number;
    rangeRight?: number;
    beforeDisabled?: boolean;
    nextDisabled?: boolean;
    dropdownOpen?: boolean;
    dropdownAnchorEl?: any;
}

export class Pagination extends React.Component<IPaginationProps, IPaginationState> {

    private getStyles() {
        return {
            paginationContainerStyle: {
                height: 56,
                width: "100%",
                marginTop: -4,
            },
            paginationStyle: {
                fontSize: "12px",
                color: "rgb(158, 158, 158)",
                float: "right",
                height: 56
            },
            paginationText: {
                float: "left",
                marginTop: 21
            },
            rppStyle: {
                marginRight: 54,
                height: 56,
                display: "inline-block"
            },
            verticalContainer: {
                display: "inline-block",
                height: 56,
                position: "relative",
                overflow: "hidden"
            },
            verticalElement: {
                position: "absolute",
                top: "50%"
            },
            selectStyle: {
                display: "inline-block",
                //height: 56,
                //lineHeight: "56px",
            },
            clearFix: {
                float: "none",
                clear: "both"
            }
        };
    }

    constructor() {
        super();
        this.state = {currentPage: 1, rangeLeft: 1, beforeDisabled: true};
    }

    handleBeforePage(): void {
        event.preventDefault();
        this.updatePageState({currentPage: this.state.currentPage - 1});
    }

    handleNextPage(): void {
        event.preventDefault();
        this.updatePageState({currentPage: this.state.currentPage + 1});
    }

    updatePageState(state?: any): void {
        var currentPage = state.currentPage || this.state.currentPage;
        var currentPageSize = state.currentPageSize || this.state.currentPageSize;
        var rangeLeft = (currentPage - 1) * currentPageSize + 1;
        var rangeRight = Math.min(currentPage * currentPageSize, this.props.totalElements);
        var beforeDisabled = false;
        var nextDisabled = false;
        if(rangeLeft === 1) {
            beforeDisabled = true;
        }
        if(rangeRight === this.props.totalElements) {
            nextDisabled = true;
        }
        this.setState(assign({
            rangeLeft: rangeLeft,
            rangeRight: rangeRight,
            beforeDisabled: beforeDisabled,
            nextDisabled: nextDisabled
        }, state));
    }

    handleTouchTap(event: any): void {
        event.preventDefault();
        this.setState({
            dropdownOpen: true,
            dropdownAnchorEl: event.currentTarget
        });
    };

    handleRequestClose(size?: number): void {
        var state: any = {dropdownOpen: false};
        if(size && size != this.state.currentPageSize) {
            state.currentPageSize = size || this.state.currentPageSize;
            state.currentPage = 1;
            if(this.props.onPageSizeChange) {
                this.props.onPageSizeChange(size, this.state.currentPageSize);
            }
        }
        this.updatePageState(state);
    }

    componentWillReceiveProps(nextProps: IPaginationProps) {
        var pageSize = nextProps.pageSize || 5;
        this.setState({
            currentPageSize: pageSize,
            rangeRight: pageSize
        });
    }

    render(): JSX.Element {

        const {paginationContainerStyle, paginationStyle, paginationText, clearFix} = this.getStyles();

        return (
            <div style={paginationContainerStyle}>
                <div style={paginationStyle}>
                    <div style={assign({}, paginationText, {marginRight: 40})}>
                        Filas por página:
                    </div>

                    <div style={paginationText}>
                        {this.state.currentPageSize}
                    </div>

                    <div style={{float: "left", marginTop: 16, marginRight: 32}}>
                        <FlatButton style={{width: 24, minWidth: 24, height: 24}} onTouchTap={this.handleTouchTap.bind(this)}>
                            <ArrowDropDown color="rgb(158, 158, 158)" />
                        </FlatButton>
                        <Popover
                            open={this.state.dropdownOpen}
                            anchorEl={this.state.dropdownAnchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose.bind(this)}>
                            <Menu>
                                {this.props.pageSizes.map((size: number, i: number) =>
                                    <MenuItem key={"size_"+i} style={{fontSize: 13, height: 40, lineHeight: "40px"}} primaryText={size} onClick={this.handleRequestClose.bind(this, size)} />
                                )}
                            </Menu>
                        </Popover>
                    </div>

                    <div style={{float: "left", marginTop: 21, marginRight: 32}}>
                        {this.state.rangeLeft}-{(this.state.rangeRight)} de {this.props.totalElements}
                    </div>

                    <div style={{float: "left", marginTop: 16, marginRight: 24}}>
                        <FlatButton style={{width: 24, minWidth: 24, height: 24}} disabled={this.state.beforeDisabled} onTouchTap={this.handleBeforePage.bind(this)}>
                            <HardwareKeyboardArrowLeft color="rgb(158, 158, 158)"/>
                        </FlatButton>
                    </div>

                    <div style={{float: "left", marginTop: 16, marginRight: 14}}>
                        <FlatButton style={{width: 24, minWidth: 24, height: 24}} disabled={this.state.nextDisabled} onTouchTap={this.handleNextPage.bind(this)}>
                            <HardwareKeyboardArrowRight color="rgb(158, 158, 158)" />
                        </FlatButton>
                    </div>

                    <div style={clearFix}></div>
                </div>
            </div>
        );
    }
}