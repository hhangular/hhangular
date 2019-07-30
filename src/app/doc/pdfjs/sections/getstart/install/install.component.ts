import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './install.component.html',
  styleUrls: ['../../../../section.scss']
})
export class InstallComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  onScroll($event) {
    console.log($event);
  }

}
