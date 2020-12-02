import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.page.html',
  styleUrls: ['./add-report.page.scss'],
})
export class AddReportPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelReport(){
      this.router.navigateByUrl('/home');
    
  }
}
