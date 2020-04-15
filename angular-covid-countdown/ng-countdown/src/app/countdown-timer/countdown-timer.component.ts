import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';


@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {
  currentTime = new Date();
  targetDate = new Date("05/03/2020");
  diff;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  ngOnInit(): void {
    this.diff = this.targetDate.getTime() - this.currentTime.getTime()

    this.days = Math.floor((this.diff) / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.diff % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.diff % (1000 * 60)) / (1000));

    timer(1000, 1000)
      .pipe(
        takeWhile(() => {
          this.currentTime = new Date();
          return (this.targetDate.getTime() - this.currentTime.getTime() > 0)
        })
      )
      .subscribe(() => {
        this.diff = this.targetDate.getTime() - this.currentTime.getTime()
        console.log(`
    Days ${  Math.floor((this.diff) / (1000 * 60 * 60 * 24))} 
    Hours : ${ Math.floor((this.diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}  
    Minutes : ${ Math.floor((this.diff % (1000 * 60 * 60)) / (1000 * 60))}  
    Seconds : ${ Math.floor((this.diff % (1000 * 60)) / (1000))}
    `);

        this.days = Math.floor((this.diff) / (1000 * 60 * 60 * 24))
        this.hours = Math.floor((this.diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.minutes = Math.floor((this.diff % (1000 * 60 * 60)) / (1000 * 60))
        this.seconds = Math.floor((this.diff % (1000 * 60)) / (1000))
      });
  }




}
