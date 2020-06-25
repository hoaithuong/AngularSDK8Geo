import { Component, OnInit } from '@angular/core';
import { ExecuteExampleComponent } from '../../components/execute-example/execute-example.component';
import  ExecuteExampleComponentSRC  from '!!raw-loader!../../components/execute-example/execute-example.component.ts';
import  ExecuteExampleComponentHTML  from '!!raw-loader!../../components/execute-example/execute-example.component.html';
import  ExecuteExampleComponentCSS  from '!!raw-loader!../../components/execute-example/execute-example.component.css';


@Component({
  selector: 'app-execute-components',
  templateUrl: './execute-components.component.html',
  styleUrls: ['./execute-components.component.css']
})
export class ExecuteComponentsComponent implements OnInit {

  constructor() { }
  basicComponentsArray = [
    {
      title: 'Execute Examples',
      for: ExecuteExampleComponent,
      ts: ExecuteExampleComponentSRC,
      html: ExecuteExampleComponentHTML,
      css: ExecuteExampleComponentCSS
    },
    
  ]
  ngOnInit() {
  }

}
