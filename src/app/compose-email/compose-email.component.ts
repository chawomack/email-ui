import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss']
})
export class ComposeEmailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  test(e) {
    console.log(e)
  }

}
