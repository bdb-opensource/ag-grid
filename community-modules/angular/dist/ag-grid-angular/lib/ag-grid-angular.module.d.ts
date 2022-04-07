import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./ag-grid-angular.component";
import * as i2 from "./ag-grid-column.component";
export declare class AgGridModule {
    /**
     * If you are using Angular v9+, with Ivy enabled, you **do not** need to pass your components to the `AgGridModules` via this method.
     * They will automatically be resolved by Angular.
    */
    static withComponents(components?: any): ModuleWithProviders<any>;
    /**
     * If you are using Angular v9+, with Ivy enabled, you **do not** need to pass your components to the `AgGridModules` via this method.
     * They will automatically be resolved by Angular.
    */
    static forRoot(components?: any): ModuleWithProviders<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgGridModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AgGridModule, [typeof i1.AgGridAngular, typeof i2.AgGridColumn], never, [typeof i1.AgGridAngular, typeof i2.AgGridColumn]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AgGridModule>;
}
