import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  itemPre: Element;

  constructor() { }

  ngOnInit() {
    this.itemPre = document.getElementById('preload').children[0];
  }

  addItem() {
    var itemClone = <Element>this.itemPre.cloneNode(true);
    if ((<HTMLInputElement>document.getElementById('newText')).value != '') {
      itemClone.getElementsByTagName('p')[0].innerHTML = (<HTMLInputElement>document.getElementById('newText')).value;
      itemClone.setAttribute('id', 'li' + document.getElementById('todoContainer').children[0].getElementsByClassName('listItem').length);
      itemClone.getElementsByTagName('button')[0].addEventListener('click', this.completeItem);
      itemClone.getElementsByTagName('button')[1].addEventListener('click', this.removeItem);
      (<HTMLInputElement>document.getElementById('newText')).value = "";
      var list = document.getElementById('todoContainer').children[0];
      list.appendChild(itemClone);
    }
  }

  completeItem(event) {
    var targ = event.target;
    var parent = (<HTMLElement>targ).parentElement.closest("li");
    if (!parent.classList.contains("completed")){
      parent.classList.add("completed");
    } else {
      parent.classList.remove("completed");
    }
  }

  removeItem(event) {
    var targ = event.target;
    var parent = (<HTMLElement>targ).parentElement.closest("li");
    parent.classList.add('scaleOut');
    setTimeout(function(){
      parent.remove();
    }, 500);
  }

}
