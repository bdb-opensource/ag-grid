'use strict';

import React, { useCallback, useMemo, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

import { CellClassParams, CellClassRules, ColDef, ICellRendererParams, ModuleRegistry, ValueParserParams } from '@ag-grid-community/core';
// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ragCellClassRules: CellClassRules = {
    'rag-green-outer': params => params.value === 2008,
    'rag-amber-outer': params => params.value === 2004,
    'rag-red-outer': params => params.value === 2000,
};

const cellStyle = (params: CellClassParams) => {
    const color = numberToColor(params.value);
    return {
        backgroundColor: color,
    };
}

const cellClass = (params: CellClassParams) => {
    return params.value === 'Swimming' ? 'rag-green' : 'rag-amber';
}

const numberToColor = (val: number) => {
    if (val === 0) {
        return '#ffaaaa';
    } else if (val == 1) {
        return '#aaaaff';
    } else {
        return '#aaffaa';
    }
}

const ragRenderer = (params: ICellRendererParams) => {
    return <span className="rag-element">{params.value}</span>;
}

const numberParser = (params: ValueParserParams) => {
    const newValue = params.newValue;
    let valueAsNumber;
    if (newValue === null || newValue === undefined || newValue === '') {
        valueAsNumber = null;
    } else {
        valueAsNumber = parseFloat(params.newValue);
    }
    return valueAsNumber;
}


const GridExample = () => {

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete' },
        {
            field: 'age',
            maxWidth: 90,
            valueParser: numberParser,
            cellClassRules: {
                'rag-green': 'x < 20',
                'rag-amber': 'x >= 20 && x < 25',
                'rag-red': 'x >= 25',
            },
        },
        { field: 'country' },
        {
            field: 'year',
            maxWidth: 90,
            valueParser: numberParser,
            cellClassRules: ragCellClassRules,
            cellRenderer: ragRenderer,
        },
        { field: 'date', cellClass: 'rag-amber' },
        {
            field: 'sport',
            cellClass: cellClass,
        },
        {
            field: 'gold',
            valueParser: numberParser,
            cellStyle: {
                // you can use either came case or dashes, the grid converts to whats needed
                backgroundColor: '#aaffaa', // light green
            },
        },
        {
            field: 'silver',
            valueParser: numberParser,
            // when cellStyle is a func, we can have the style change
            // dependent on the data, eg different colors for different values
            cellStyle: cellStyle,
        },
        {
            field: 'bronze',
            valueParser: numberParser,
            // same as above, but demonstrating dashes in the style, grid takes care of converting to/from camel case
            cellStyle: cellStyle,
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 150,
            editable: true,
        }
    }, []);


    const onGridReady = useCallback((params) => {

        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => setRowData(data));
    }, []);


    return (
        <div style={containerStyle}>

            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact

                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                >
                </AgGridReact>
            </div>
        </div>
    );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
