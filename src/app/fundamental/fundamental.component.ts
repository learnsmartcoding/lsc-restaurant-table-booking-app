import { Component } from '@angular/core';

@Component({
  selector: 'app-fundamental',
  templateUrl: './fundamental.component.html',
  styleUrls: ['./fundamental.component.css']
})
export class FundamentalComponent {
  username = 'Learn Smart Coding';
  action = 'Send Email';
  imageUrl = '../../assets/custom/Learn Smart Coding Logo white bg.png';
  isDisabled = true;
  showElement = true;
  handleClick() {
    alert('I was clicked');
  }

  fruits = ['Orange', 'Lemon', 'Apple', 'Banana'];
}
