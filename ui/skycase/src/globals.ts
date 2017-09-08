import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


//
// ===== File globals.ts    
//

export const baseUrl = "/api"
    ;

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private paramsSubject = new BehaviorSubject(this.testParams);
    params = this.paramsSubject.asObservable();

    private queryParamsSubject = new BehaviorSubject(this.testQueryParams);
    queryParams = this.queryParamsSubject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.paramsSubject.next(params);
    }

    private _queryParams: {};
    get testQueryParams() { return this._queryParams; }
    set testQueryParams(params: {}) {
        this._queryParams = params;
        this.queryParamsSubject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return {
            params: this.testParams,
            queryParams: this.testQueryParams
        };
    }
}
