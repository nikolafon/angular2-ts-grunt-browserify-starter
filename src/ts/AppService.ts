/**
 * @author Nikola Nikolic <nikola.nikolic@outlook.com>
 */
import {Injectable, Inject, Component, View} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';

export class AppService {
    message: String;
    constructor( @Inject(Http) private http: Http) {
    }

    public fetchMessage(): Observable<Array<any>> {
        return this.http.get("http://localhost:9001/message").map((res: Response) => res.json());
    }
}
