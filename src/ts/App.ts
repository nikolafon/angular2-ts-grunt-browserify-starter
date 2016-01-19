/**
 * @author Nikola Nikolic <nikola.nikolic@outlook.com>
 */
declare var require: any;
declare var global: any
import 'reflect-metadata';

global.Zone = require('zone.js');
global.Rx = require('rxjs');

import {bootstrap} from 'angular2/bootstrap';
import {Control, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Component, View, Inject} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AppService} from './AppService';


@Component({
    selector: 'app',
    viewProviders: [HTTP_PROVIDERS]
})
@View({
    templateUrl: 'templates/App.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
@RouteConfig([

    { path: '/', name: 'App', component: App, useAsDefault: true },
])
class App {
    message:String;

    constructor(@Inject(AppService) private appService:AppService) {

      this.appService.fetchMessage().subscribe(
          (data: Array<any>) => this.message = data[0].message);
    }
}
bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS, AppService]);
