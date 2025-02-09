import { Component } from '@angular/core';

export class Timer {
  time = 0;
  timeString = '00:00';
  running = false;
  interval: ReturnType<typeof setInterval> | undefined;
  beeper: ReturnType<typeof setInterval> | undefined;
  modify(seconds: number) {
    this.time += seconds;
    if (this.time < 0) this.time = 0;
    this.toString(this.time);
  }
  toString(seconds: number) {
    let result = '';
    if (seconds >= 60) {
      const div = Math.floor(seconds / 60);
      const mod = seconds % 60;
      result += (div < 10 ? '0' : '') + div + (mod < 10 ? ':0' : ':') + mod;
    } else {
      result += '00:' + (seconds < 10 ? '0' : '') + seconds;
    }
    this.timeString = result;
  }
  // Simple timer implementation, think about improvements.
  run = () => {
    this.modify(-1);
    if (this.time <= 0) {
      clearInterval(this.interval);
      this.alarm();
    }
  };
  start() {
    this.running = true;
    this.interval = setInterval(this.run, 1000);
  }
  stop() {
    this.running = false;
    clearInterval(this.interval);
  }
  reset() {
    this.running = false;
    clearInterval(this.interval);
    clearInterval(this.beeper);
    this.modify(-this.time);
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

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  timer = new Timer()
}
