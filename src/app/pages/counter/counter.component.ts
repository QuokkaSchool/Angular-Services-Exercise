import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  protected counter$: Observable<number> = this.counterService.value$;

  constructor(private counterService: CounterService) {}

  protected increment(): void {
    this.counterService.incrementValue();
  }

  protected decrement(): void {
    this.counterService.decrementValue();
  }
}
