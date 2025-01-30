import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timer-app-angular';
}
