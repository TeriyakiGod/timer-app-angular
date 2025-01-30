import { Component } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  timer = 0;
  timerString = '0 seconds.';
  running = false;
  interval: ReturnType<typeof setInterval> | undefined;
  beeper: ReturnType<typeof setInterval> | undefined;
  modifyTimer(seconds: number) {
    this.timer += seconds;
    if (this.timer < 0) this.timer = 0;
    this.timerToString(this.timer);
  }
  timerToString(seconds: number) {
    let result = '';
    if (seconds >= 60) {
      const div = Math.floor(seconds / 60);
      const mod = seconds % 60;
      result += div + ' minutes, ' + mod + ' seconds.';
    } else {
      result += seconds + ' seconds.';
    }
    this.timerString = result;
  }
  // Simple timer implementation, think about improvements.
  updateTimer = () => {
    this.modifyTimer(-1);
    if (this.timer <= 0) {
      clearInterval(this.interval);
      this.alarm();
    }
  };
  start() {
    this.running = true;
    this.interval = setInterval(this.updateTimer, 1000);
  }
  pause() {
    this.running = false;
    clearInterval(this.interval);
  }
  reset() {
    this.running = false;
    clearInterval(this.interval);
    clearInterval(this.beeper);
    this.modifyTimer(-this.timer);
  }
  beep(audio: AudioContext) {
    const oscillator = audio.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 800;
    oscillator.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.2);
  }
  alarm() {
    let audio = new AudioContext();
    this.beeper = setInterval(this.beep, 400, audio);
  }
}
