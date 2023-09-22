import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Claim } from '../models/restaurants.model';

@Component({
  selector: 'app-claims-details',
  templateUrl: './claims-details.component.html',
  styleUrls: ['./claims-details.component.css']
})
export class ClaimsDetailsComponent {
  claims:Claim[]=[];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.claims$.subscribe((c) => {
      this.claims = c;
    });
  }
}
