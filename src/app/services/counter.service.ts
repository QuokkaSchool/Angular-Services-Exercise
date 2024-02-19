import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public value: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public get value$(): Observable<number> {
    return this.value.asObservable();
  }

  public incrementValue(): void {
    const currentValue = this.value.getValue();
    this.value.next(currentValue + 1);
  }

  public decrementValue(): void {
    const currentValue = this.value.getValue();
    this.value.next(currentValue - 1);
  }
}
