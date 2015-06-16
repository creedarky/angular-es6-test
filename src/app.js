/**Initial State **/
//import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap} from 'angular2/angular2';
//
//
//@Component({
//  selector: "clicker"
//})
//@View({
//  template: '<div>' +
//  '<button id="button" (mousemove)="onMouseMove($event)" (custom)="onCustom()" (click)="onClick()">Click me</button>' +
//  '<h1>position: {{x}}, {{y}} ' +
//  'clickCounter: {{clickCounter}} ' +
//  'customCounter: {{ customCounter}}</h1>' +
//  '</div>'
//})
//class Clicker {
//  customCounter = 0;
//  clickCounter = 0;
//  x = 0;
//  y = 0;
//
//  constructor() {
//    var button = document.querySelector('#button');
//    setInterval(function () {
//      button.dispatchEvent(new Event("custom"));
//    }, 1000);
//  }
//
//  onMouseMove(event) {
//    this.x = event.x;
//    this.y = event.y;
//  }
//
//  onClick() {
//    this.clickCounter++;
//  }
//
//  onCustom() {
//    this.customCounter++;
//  }
//}
//
//@Component({
//  selector: 'app'
//
//})
//@View({
//  templateUrl: 'app.html',
//  directives: [Clicker]
//})
//class App {
//
//  constructor() {
//  }
//}
//
//
//bootstrap(App);


/** BINDING **/
//import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap} from 'angular2/angular2';
//
//
//@Component({
//  selector: "clicker"
//})
//@View({
//  template: '<div>' +
//  '<button id="button" (mousemove)="onMouseMove($event)" (custom)="onCustom()" (click)="onClick()">Click me</button>' +
//  '<h1>position: {{x}}, {{y}} ' +
//  'clickCounter: {{clickCounter}} ' +
//  'customCounter: {{ customCounter}}</h1>' +
//  '</div>'
//})
//class Clicker {
//  customCounter = 0;
//  clickCounter = 0;
//  x = 0;
//  y = 0;
//
//  constructor() {
//    var button = document.querySelector('#button');
//    setInterval(function () {
//      button.dispatchEvent(new Event("custom"));
//    }, 1000);
//  }
//
//  onMouseMove(event) {
//    this.x = event.x;
//    this.y = event.y;
//  }
//
//  onClick() {
//    this.clickCounter++;
//  }
//
//  onCustom() {
//    this.customCounter++;
//  }
//}
//
//@Component({
//  selector: "input-binding"
//})
//@View({
//  template: '<div>' +
//  '<label>Input text</label>' +
//  '<input id="input" type="text" #ref (custom)="custom()" value="" (keyup)="keyUp(ref)"> ' +
//  '<hr/>' +
//  '<h1 [style.color]="ref.value">' +
//  'value = {{ref.value}}<br/>' +
//  'this.text= {{text}}<br/>' +
//  '</div>'
//})
//class InputBinding {
//  text = '';
//
//  constructor() {
//  }
//
//  keyUp(ref) {
//    console.log(ref);
//    this.text = ref.value;
//  }
//
//}
//
//@Component({
//  selector: 'app'
//
//})
//@View({
//  templateUrl: 'app.html',
//  directives: [Clicker, InputBinding]
//})
//class App {
//
//  constructor() {
//  }
//}
//
//
//bootstrap(App);



//Final Code
import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, NgIf, NgFor} from 'angular2/angular2';
import {TeamStore} from 'services/TeamStore'
@Component({
  selector: "clicker"
})
@View({
  template: '<div>' +
  '<button id="button" (mousemove)="onMouseMove($event)" (custom)="onCustom()" (click)="onClick()">Click me</button>' +
  '<h1>position: {{x}}, {{y}} ' +
  'clickCounter: {{clickCounter}} ' +
  'customCounter: {{ customCounter}}</h1>' +
  '</div>'
})
class Clicker {
  customCounter = 0;
  clickCounter = 0;
  x = 0;
  y = 0;

  constructor() {
    var button = document.querySelector('#button');
    setInterval(function () {
      button.dispatchEvent(new Event("custom"));
    }, 1000);
  }

  onMouseMove(event) {
    this.x = event.x;
    this.y = event.y;
  }

  onClick() {
    this.clickCounter++;
  }

  onCustom() {
    this.customCounter++;
  }
}


@Component({
  selector: "input-binding"
})
@View({
  template: '<div>' +
  '<label>Input text</label>' +
  '<input id="input" type="text" #ref (custom)="custom()" value="" (keyup)="keyUp(ref)"> ' +
  '<hr/>' +
  '<h1 [style.color]="ref.value">' +
  'value = {{ref.value}}<br/>' +
  'this.text= {{text}}<br/>' +
  'this.customeventCount = {{customEventCount}}<br/></h1>' +
  '</div>'
})
class InputBinding {
  customEventCount = 0;
  text = '';

  constructor() {
    var input = document.querySelector('#input');
    setInterval(function () {

      input.dispatchEvent(new Event("custom"));

    }, 1000);
  }

  keyUp(ref) {
    console.log(ref);
    this.text = ref.value;
  }

  custom() {
    this.customEventCount++;
  }
}

@Component({
  selector: 'team-list'
})
@View({
  templateUrl: 'teamlist.html',
  directives: [NgFor, NgIf]
})
class TeamList {
  teamMembers = [];
  selectedMember = null;
  teamStore = null;
  constructor() {
    this.teamStore = new TeamStore();
    console.log(this.teamStore);
    this.teamMembers = this.teamStore.getMembers();
    console.log(this.teamMembers);
  }

  selectMember(index) {
    this.selectedMember = this.teamStore.getMember(index);
  }
}


@Component({
  selector: 'app'

})
@View({
  templateUrl: 'app.html',
  directives: [ InputBinding, TeamList, Clicker ]
})
class App {

  constructor() {
  }
}


bootstrap(App);
