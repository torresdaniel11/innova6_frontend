import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectWindow: boolean;
  windowClose: boolean;
  // ==============================================================================
  // ==============================================================================
  // Doughnut for first question
  public doughnutChartLabels1:string[] = ['Si', 'No' ];
  public doughnutChartData1:number[] = [350, 450];
  public doughnutChartType1:string = 'doughnut';
  // events
  public chartClicked1(e:any):void {
    console.log(e);
  }
  public chartHovered1(e:any):void {
    console.log(e);
  }
  // ==============================================================================
  // ==============================================================================
  // Doughnut for first question
  public doughnutChartLabels2:string[] = ['Muy útil', 'Ligeramente útil', 'Útil',  'Poco útil', 'Nada útil'];
  public doughnutChartData2:number[] = [350, 450, 320, 120, 100];
  public doughnutChartType2:string = 'doughnut';
  // events
  public chartClicked2(e:any):void {
    console.log(e);
  }
  public chartHovered2(e:any):void {
    console.log(e);
  }

  constructor() {
    this.selectWindow = true;
    this.windowClose = true;
  }
  // ==============================================================================
  // ==============================================================================
  // Hide windows event
  public hideWindow() {
    this.selectWindow = !this.selectWindow;
  }
  public closeWindow() {
    this.windowClose = !this.windowClose;
  }

  ngOnInit() {}

}
