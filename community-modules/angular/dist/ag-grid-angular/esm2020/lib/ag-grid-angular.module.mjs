import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { AgGridAngular } from './ag-grid-angular.component';
import { AgGridColumn } from './ag-grid-column.component';
import * as i0 from "@angular/core";
export class AgGridModule {
    /**
     * If you are using Angular v9+, with Ivy enabled, you **do not** need to pass your components to the `AgGridModules` via this method.
     * They will automatically be resolved by Angular.
    */
    static withComponents(components) {
        return {
            ngModule: AgGridModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ],
        };
    }
    /**
     * If you are using Angular v9+, with Ivy enabled, you **do not** need to pass your components to the `AgGridModules` via this method.
     * They will automatically be resolved by Angular.
    */
    static forRoot(components) {
        return {
            ngModule: AgGridModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ],
        };
    }
}
AgGridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AgGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AgGridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AgGridModule, declarations: [AgGridAngular, AgGridColumn], exports: [AgGridAngular, AgGridColumn] });
AgGridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AgGridModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.1", ngImport: i0, type: AgGridModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AgGridAngular, AgGridColumn],
                    imports: [],
                    exports: [AgGridAngular, AgGridColumn]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWctZ3JpZC1hbmd1bGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FnLWdyaWQtYW5ndWxhci9zcmMvbGliL2FnLWdyaWQtYW5ndWxhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLDRCQUE0QixFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFPMUQsTUFBTSxPQUFPLFlBQVk7SUFFckI7OztNQUdFO0lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFnQjtRQUNsQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNQLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTthQUMvRTtTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7OztNQUdFO0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFnQjtRQUMzQixPQUFPO1lBQ0gsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNQLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTthQUMvRTtTQUNKLENBQUM7SUFDTixDQUFDOzt5R0ExQlEsWUFBWTswR0FBWixZQUFZLGlCQUpOLGFBQWEsRUFBRSxZQUFZLGFBRWhDLGFBQWEsRUFBRSxZQUFZOzBHQUU1QixZQUFZLFlBSFosRUFBRTsyRkFHRixZQUFZO2tCQUx4QixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQzNDLE9BQU8sRUFBRSxFQUFFO29CQUNYLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWdHcmlkQW5ndWxhciB9IGZyb20gJy4vYWctZ3JpZC1hbmd1bGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZ0dyaWRDb2x1bW4gfSBmcm9tICcuL2FnLWdyaWQtY29sdW1uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbQWdHcmlkQW5ndWxhciwgQWdHcmlkQ29sdW1uXSxcbiAgICBpbXBvcnRzOiBbXSxcbiAgICBleHBvcnRzOiBbQWdHcmlkQW5ndWxhciwgQWdHcmlkQ29sdW1uXVxufSlcbmV4cG9ydCBjbGFzcyBBZ0dyaWRNb2R1bGUge1xuXG4gICAgLyoqIFxuICAgICAqIElmIHlvdSBhcmUgdXNpbmcgQW5ndWxhciB2OSssIHdpdGggSXZ5IGVuYWJsZWQsIHlvdSAqKmRvIG5vdCoqIG5lZWQgdG8gcGFzcyB5b3VyIGNvbXBvbmVudHMgdG8gdGhlIGBBZ0dyaWRNb2R1bGVzYCB2aWEgdGhpcyBtZXRob2QuIFxuICAgICAqIFRoZXkgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHJlc29sdmVkIGJ5IEFuZ3VsYXIuXG4gICAgKi9cbiAgICBzdGF0aWMgd2l0aENvbXBvbmVudHMoY29tcG9uZW50cz86IGFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8YW55PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQWdHcmlkTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCB1c2VWYWx1ZTogY29tcG9uZW50cywgbXVsdGk6IHRydWUgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICogSWYgeW91IGFyZSB1c2luZyBBbmd1bGFyIHY5Kywgd2l0aCBJdnkgZW5hYmxlZCwgeW91ICoqZG8gbm90KiogbmVlZCB0byBwYXNzIHlvdXIgY29tcG9uZW50cyB0byB0aGUgYEFnR3JpZE1vZHVsZXNgIHZpYSB0aGlzIG1ldGhvZC4gXG4gICAgICogVGhleSB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcmVzb2x2ZWQgYnkgQW5ndWxhci5cbiAgICAqL1xuICAgIHN0YXRpYyBmb3JSb290KGNvbXBvbmVudHM/OiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPGFueT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFnR3JpZE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IGNvbXBvbmVudHMsIG11bHRpOiB0cnVlIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iXX0=