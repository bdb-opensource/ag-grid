import React, { Component } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

import { ModuleRegistry } from '@ag-grid-community/core';
// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columns = [
    { field: "id", rowDrag: true },
    { field: "color" },
    { field: "value1" },
    { field: "value2" }
];

const rowClassRules = {
    "red-row": 'data.color == "Red"',
    "green-row": 'data.color == "Green"',
    "blue-row": 'data.color == "Blue"',
};

const defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true
};

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leftApi: null,
            rightApi: null,
            leftRowData: [],
            rightRowData: [],
        };

        this.rowIdSequence = 100;

        this.eLeftGrid = React.createRef();
        this.eRightGrid = React.createRef();
        this.eBin = React.createRef();
        this.eBinIcon = React.createRef();
    }

    componentDidMount() {
        this.setState({
            leftRowData: this.createRowBlock(2),
            rightRowData: this.createRowBlock(2)
        });
    }

    createRowBlock = (blocks) => Array.apply(null, Array(blocks || 1))
        .map(() => ['Red', 'Green', 'Blue'].map((color) => this.createDataItem(color)))
        .reduce((prev, curr) => prev.concat(curr), [])

    createDataItem(color) {
        const obj = {
            id: this.rowIdSequence++,
            color: color,
            value1: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 100)
        };

        return obj;
    }

    getRowId = params => params.data.id

    addRecordToGrid(side, data) {
        // if data missing or data has no it, do nothing
        if (!data || data.id == null) { return; }

        const api = side === 'left' ? this.state.leftApi : this.state.rightApi;
        // do nothing if row is already in the grid, otherwise we would have duplicates
        const rowAlreadyInGrid = !!api.getRowNode(data.id);
        let transaction;

        if (rowAlreadyInGrid) {
            console.log('not adding row to avoid duplicates in the grid');
            return;
        }

        transaction = {
            add: [data]
        };

        api.applyTransaction(transaction);
    }

    onFactoryButtonClick(e) {
        var button = e.currentTarget,
            buttonColor = button.getAttribute('data-color'),
            side = button.getAttribute('data-side'),
            data = this.createDataItem(buttonColor);

        this.addRecordToGrid(side, data);
    }

    binDrop(data) {
        // if data missing or data has no id, do nothing
        if (!data || data.id == null) { return; }

        var transaction = {
            remove: [data]
        };

        [this.state.leftApi, this.state.rightApi].forEach((api) => {
            var rowsInGrid = !!api.getRowNode(data.id);

            if (rowsInGrid) {
                api.applyTransaction(transaction);
            }
        });
    }

    addBinZone(api) {
        const dropZone = {
            getContainer: () => this.eBinIcon.current,
            onDragEnter: () => {
                const eBin = this.eBin.current;
                const eBinIcon = this.eBinIcon.current;
                eBin.style.color = 'blue';
                eBinIcon.style.transform = 'scale(1.5)';
            },
            onDragLeave: () => {
                const eBin = this.eBin.current;
                const eBinIcon = this.eBinIcon.current;
                eBin.style.color = 'black';
                eBinIcon.style.transform = 'scale(1)';
            },
            onDragStop: (params) => {
                const eBin = this.eBin.current;
                const eBinIcon = this.eBinIcon.current;
                this.binDrop(params.node.data);
                eBin.style.color = 'black';
                eBinIcon.style.transform = 'scale(1)';
            }
        };

        api.addRowDropZone(dropZone);
    }

    addGridDropZone = (side, api) => {
        const dropApi = (side === 'Left') ? this.state.rightApi : this.state.leftApi;
        const dropZone = dropApi.getRowDropZoneParams();

        api.addRowDropZone(dropZone);
    }

    componentDidUpdate() {
        if (this.state.leftApi && this.state.rightApi) {
            this.addBinZone(this.state.leftApi);
            this.addBinZone(this.state.rightApi);
            this.addGridDropZone('Left', this.state.leftApi);
            this.addGridDropZone('Right', this.state.rightApi);
        }
    }

    onGridReady(side, params) {
        const api = params.api;
        if (side === 'Left') {
            this.setState({ leftApi: api });
        } else {
            this.setState({ rightApi: api });
        }
    }

    getAddRecordButton = (side, color) => (
        <button
            key={`btn_${side}_${color}`}
            className={`factory factory-${color.toLowerCase()}`}
            data-color={color}
            data-side={side.toLowerCase()}
            onClick={this.onFactoryButtonClick.bind(this)}
        >
            <i className="far fa-plus-square"></i>{`Add ${color}`}
        </button>
    )

    getInnerGridCol = (side) => (
        <div className="inner-col">
            <div className="toolbar">
                {['Red', 'Green', 'Blue'].map(color => this.getAddRecordButton(side, color))}
            </div>
            <div style={{ height: '100%' }} className="inner-col" ref={this[`e${side}Grid`]}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    getRowId={this.getRowId}
                    rowClassRules={rowClassRules}
                    rowDragManaged={true}
                    suppressMoveWhenRowDragging={true}
                    animateRows={true}
                    rowData={this.state[side === 'Left' ? 'leftRowData' : 'rightRowData']}
                    columnDefs={[...columns]}
                    onGridReady={this.onGridReady.bind(this, side)}
                />
            </div>
        </div>
    )

    render = () => (
        <div className="example-wrapper ag-theme-alpine">
            {this.getInnerGridCol('Left')}
            <div className="inner-col vertical-toolbar">
                <span className="bin" ref={this.eBin}>
                    <i className="far fa-trash-alt fa-3x" ref={this.eBinIcon}></i>
                </span>
            </div>
            {this.getInnerGridCol('Right')}
        </div>
    );
}
