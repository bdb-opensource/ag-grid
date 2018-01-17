import {Autowired, Bean} from "../../context/context";
import {IDateComp, IDateParams} from "../../rendering/dateComponent";
import {GridOptions} from "../../entities/gridOptions";
import {IComponent} from "../../interfaces/iComponent";
import {ColDef} from "../../entities/colDef";
import {IHeaderGroupComp, IHeaderGroupParams} from "../../headerRendering/headerGroup/headerGroupComp";
import {IHeaderComp, IHeaderParams} from "../../headerRendering/header/headerComp";
import {
    IFloatingFilterComp, IFloatingFilterParams,
    ReadModelAsStringFloatingFilterComp
} from "../../filter/floatingFilter";
import {GridOptionsWrapper} from "../../gridOptionsWrapper";
import {
    EmptyFloatingFilterWrapperComp, FloatingFilterWrapperComp, IFloatingFilterWrapperComp,
    IFloatingFilterWrapperParams
} from "../../filter/floatingFilterWrapper";
import {Column} from "../../entities/column";
import {IFilterComp} from "../../interfaces/iFilter";
import {FilterManager} from "../../filter/filterManager";
import {ComponentResolver} from "./componentResolver";
import {ICellRendererComp, ICellRendererParams} from "../../rendering/cellRenderers/iCellRenderer";
import {GroupCellRendererParams} from "../../rendering/cellRenderers/groupCellRenderer";
import {ISetFilterParams} from "../../interfaces/iSetFilterParams";
import {IRichCellEditorParams} from "../../interfaces/iRichCellEditorParams";
import {Promise} from "../../utils";
import {IOverlayWrapperComp, OverlayWrapperComponent} from "../../rendering/overlays/overlayWrapperComponent";
import {ILoadingOverlayComp} from "../../rendering/overlays/loadingOverlayComponent";
import {INoRowsOverlayComp} from "../../rendering/overlays/noRowsOverlayComponent";

enum ComponentType {
    AG_GRID, FRAMEWORK
}

/**
 * B the business interface (ie IHeader)
 * A the agGridComponent interface (ie IHeaderComp). The final object acceptable by ag-grid
 */
interface ComponentToUse<A extends IComponent<any> & B, B> {
    component:{new(): A}|{new(): B},
    type:ComponentType
}


@Bean('componentRecipes')
export class ComponentRecipes {
    @Autowired("componentResolver")
    private componentResolver:ComponentResolver;

    @Autowired("gridOptions")
    private gridOptions: GridOptions;

    @Autowired("gridOptionsWrapper")
    private gridOptionsWrapper: GridOptionsWrapper;

    @Autowired('filterManager')
    private filterManager: FilterManager;

    private static filterToFloatingFilterNames: {[p:string]:string} = {
        set:'agSetColumnFloatingFilter',
        agSetColumnFilter:'agSetColumnFloatingFilter',

        number:'agNumberColumnFloatingFilter',
        agNumberColumnFilter:'agNumberColumnFloatingFilter',

        date:'agDateColumnFloatingFilter',
        agDateColumnFilter:'agDateColumnFloatingFilter',

        text:'agTextColumnFloatingFilter',
        agTextColumnFilter:'agTextColumnFloatingFilter'
    };

    public newDateComponent (params: IDateParams): Promise<IDateComp>{
        return this.componentResolver.createAgGridComponent<IDateComp>(this.gridOptions, params, "dateComponent", "agDateInput");
    }

    public newHeaderComponent(params:IHeaderParams): Promise<IHeaderComp> {
        return this.componentResolver.createAgGridComponent<IHeaderComp>(params.column.getColDef(), params, "headerComponent", "agColumnHeader");
    }

    public newHeaderGroupComponent(params:IHeaderGroupParams): Promise<IHeaderGroupComp> {
        return this.componentResolver.createAgGridComponent(params.columnGroup.getColGroupDef(), params, "headerGroupComponent", "agColumnGroupHeader");
    }

    public newFloatingFilterWrapperComponent<M, P extends IFloatingFilterParams<M, any>> (column:Column, params:IFloatingFilterParams<M, any>):IFloatingFilterWrapperComp<M, any, any, any>{
        let colDef:ColDef = column.getColDef();

        if (colDef.suppressFilter){
            return this.newEmptyFloatingFilterWrapperComponent(column);
        }

        let defaultFloatingFilterType: string;

        if (!colDef.filter){
            defaultFloatingFilterType = this.gridOptionsWrapper.isEnterprise() ? 'agSetColumnFloatingFilter' : 'agTextColumnFloatingFilter';
        } else if (typeof colDef.filter === 'string' && Object.keys(ComponentRecipes.filterToFloatingFilterNames).indexOf(colDef.filter) > -1){
            defaultFloatingFilterType = ComponentRecipes.filterToFloatingFilterNames[colDef.filter]
        }

        let floatingFilter: Promise<IFloatingFilterComp<M, any, P>> = this.componentResolver.createAgGridComponent<IFloatingFilterComp<M, any, any>>(
            colDef,
            params,
            "floatingFilterComponent",
            defaultFloatingFilterType,
            false
        );
        let floatingFilterWrapperComponentParams : IFloatingFilterWrapperParams <M, any, any> = <any>{
            column: column,
            floatingFilterComp: floatingFilter,
            suppressFilterButton: this.componentResolver.mergeParams(colDef, 'floatingFilterComponent',params).suppressFilterButton
        };

        if (!floatingFilter){
            let filterComponent:ComponentToUse<any, any> = this.getFilterComponentPrototype(colDef);

            if (filterComponent && !filterComponent.component.prototype.getModelAsString){
                return this.newEmptyFloatingFilterWrapperComponent(column);
            }

            let rawModelFn = params.currentParentModel;
            params.currentParentModel = ():M=>{
                let parentPromise:Promise<IFilterComp> = this.filterManager.getFilterComponent(column);
                return <any>parentPromise.resolveNow(null, parent=>parent.getModelAsString ? parent.getModelAsString(rawModelFn()) : null);
            };
            floatingFilterWrapperComponentParams.floatingFilterComp = Promise.resolve(this.componentResolver.createInternalAgGridComponent<IFloatingFilterComp<M, any, any>>(
                ReadModelAsStringFloatingFilterComp,
                params

            ));
        }


        return this.componentResolver.createInternalAgGridComponent<IFloatingFilterWrapperComp<any, any, any, any>> (
            FloatingFilterWrapperComp,
            floatingFilterWrapperComponentParams
        );
    }

    public newFullWidthGroupRowInnerCellRenderer (params:ICellRendererParams):Promise<ICellRendererComp>{
        return this.componentResolver.createAgGridComponent<ICellRendererComp>(this.gridOptions, params, "groupRowInnerRenderer", null, false);
    }

    public newCellRenderer (target: ColDef | ISetFilterParams | IRichCellEditorParams, params:ICellRendererParams):Promise<ICellRendererComp>{
        return this.componentResolver.createAgGridComponent<ICellRendererComp>(target, params, "cellRenderer", null, false);
    }

    public newInnerCellRenderer (target: GroupCellRendererParams, params:ICellRendererParams):Promise<ICellRendererComp>{
        return this.componentResolver.createAgGridComponent<ICellRendererComp>(target, params, "innerRenderer", null);
    }

    public newFullRowGroupRenderer (params:ICellRendererParams):Promise<ICellRendererComp>{
        return this.componentResolver.createAgGridComponent<ICellRendererComp>(this.gridOptionsWrapper, params, "fullWidthCellRenderer", null);
    }

    public newOverlayWrapperComponent(): IOverlayWrapperComp {
        return this.componentResolver.createInternalAgGridComponent (
            OverlayWrapperComponent,
            null
        );
    }

    public newLoadingOverlayComponent(): Promise<ILoadingOverlayComp> {
        return this.componentResolver.createAgGridComponent<ILoadingOverlayComp>(this.gridOptions, null, "loadingOverlayComponent", "agLoadingOverlay");
    }

    public newNoRowsOverlayComponent(): Promise<INoRowsOverlayComp> {
        return this.componentResolver.createAgGridComponent<INoRowsOverlayComp>(this.gridOptions, null, "noRowsOverlayComponent", "agNoRowsOverlay");
    }

    private getFilterComponentPrototype<A extends IComponent<any> & B, B>
    (colDef: ColDef): ComponentToUse<A, B> {
        return <ComponentToUse<A, B>>this.componentResolver.getComponentToUse(colDef, "filter");
    }

    private newEmptyFloatingFilterWrapperComponent(column:Column): IFloatingFilterWrapperComp<any, any, any, any> {
        let floatingFilterWrapperComponentParams : IFloatingFilterWrapperParams <any, any, any> = <any>{
            column: column,
            floatingFilterComp: null
        };
        return this.componentResolver.createInternalAgGridComponent (
            EmptyFloatingFilterWrapperComp,
            floatingFilterWrapperComponentParams
        );
    }
}