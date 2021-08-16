import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    
  }

  

  fontColor = 'blue';
    sayHelloId = 1;
    canClick = false;
    message = 'Hello, World';
    sayMessage() {
        alert(this.message);
    }

}
