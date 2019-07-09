import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

  curTimeMin: number = 0;
  curTimeSec: number = 0;
  curTimeMil: number = 0;
  timerMode: string = "Stopwatch";
  startState: string = "Start";
  private timer;

  constructor() { }

  ngOnInit() {
  }

  modeToStop(){
    this.reset();
    this.timerMode = "Stopwatch";
  }

  modeToCount(){
    this.reset();
    this.timerMode = "Countdown";
  }

  start() {
    if (this.timerMode == "Stopwatch"){
      this.timer = setInterval(() => this.timerController(), 10);
      this.startState = "Pause";
    }
    if (this.timerMode == "Countdown"){
      this.curTimeMin = parseInt((<HTMLInputElement>document.getElementById("inputMinID")).value, 10);
      this.curTimeSec = parseInt((<HTMLInputElement>document.getElementById("inputSecID")).value, 10);
      this.timer = setInterval(() => this.timerController(), 10);
      this.startState = "Pause";
    }
  }

  pause() {
    if (this.timerMode == "Stopwatch"){
      clearInterval(this.timer);
      this.startState = "Start";
    }
    if (this.timerMode == "Countdown"){
      clearInterval(this.timer);
      this.startState = "Start";
    }
  }

  reset() {
    if (this.timerMode == "Stopwatch"){
      clearInterval(this.timer);
      this.curTimeMin = this.curTimeSec = this.curTimeMil = 0;
      this.startState = "Start";
    }
    if (this.timerMode == "Countdown"){
      clearInterval(this.timer);
      var inputMinVal = <HTMLInputElement>document.getElementById("inputMinID");
      var inputSecVal = <HTMLInputElement>document.getElementById("inputSecID");
      inputMinVal.value = inputSecVal.value = "0";
      inputMinVal.disabled = inputSecVal.disabled = false;
      this.curTimeMin = this.curTimeSec = this.curTimeMil = 0;
      this.startState = "Start";
      //console.log(this.curTimeMin + ":" + this.curTimeSec + "." + this.curTimeMil);
    }
  }

  timerController(){
    if (this.timerMode == "Stopwatch"){
      this.curTimeMil += 1;
      if (this.curTimeMil >= 100) {
        this.curTimeSec += 1;
        this.curTimeMil = 0;
      }
      if (this.curTimeSec >= 60) {
        this.curTimeMin += 1;
        this.curTimeSec = 0;
      }
    }
    if (this.timerMode == "Countdown"){
      this.curTimeMil -= 1;
      var inputMinVal = <HTMLInputElement>document.getElementById("inputMinID");
      var inputSecVal = <HTMLInputElement>document.getElementById("inputSecID");
      if (isNaN(this.curTimeMin)){
        this.curTimeMin = 0;
      }
      if (isNaN(this.curTimeSec)){
        this.curTimeSec = 0;
      }
      inputMinVal.value = this.curTimeMin.toString();
      inputSecVal.value = this.curTimeSec.toString();
      inputMinVal.disabled = true;
      inputSecVal.disabled = true;
      if (this.curTimeMil < 0) {
        this.curTimeSec -= 1;
        this.curTimeMil = 99;
      }
      if (this.curTimeSec < 0) {
        this.curTimeMin -= 1;
        this.curTimeSec = 59;
      }
      if (this.isTimerZero()){
        this.reset();
        var wrapper = <HTMLElement>document.getElementById("wrapper");
        wrapper.style.backgroundColor = "yellow";
        setTimeout(function(){
          wrapper.style.backgroundColor = "white";
        }, 1000);
        //console.log("Timer Finished");
      }
    }
    //console.log(this.curTimeMin + ":" + this.curTimeSec + "." + this.curTimeMil);
  }

  isTimerZero(){
    if (this.curTimeMin < 0 || this.curTimeSec < 0 || this.curTimeMil < 0){
      return true;
    } else {
      return false;
    }
  }
}
