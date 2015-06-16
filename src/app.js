import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, NgIf, NgFor} from 'angular2/angular2';
import {Injector, Inject, Injectable} from 'angular2/di'
import {TeamStore} from 'services/TeamStore'


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
  directives: [NgIf, InputBinding, TeamList]
})
class App {
  name = 'World';

  constructor() {
    setTimeout(() => {
      this.name = 'New Item'
    }, 2000);
  }
}


bootstrap(App);
