import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment the counter value upon tapping increment button', () => {
    component.counter = 0;
    component.increment();
    expect(component.counter).toBe(1);
  });

  it('should decrement the counter value upon tapping decrement button', () => {
    component.counter = 10;
    component.decrement();
    expect(component.counter).toBe(9);
  });

  it('should reset the counter value upon tapping reset button', () => {
    component.counter = 5;
    component.increment(); // 6
    component.increment(); // 7
    component.reset();
    expect(component.counter).toBe(0);
  });

  it('should show an alert when the counter value goes above the MAX_VALUE', () => {
    jest.spyOn(window, 'alert');
    component.counter = component.MAX_VALUE;
    component.increment();
    expect(window.alert).toHaveBeenCalledWith('Value too high');
    expect(component.counter).toBe(component.MAX_VALUE);
  });
  it('should show an alert when the counter value goes below the MIN_VALUE', () => {
    jest.spyOn(window, 'alert');
    component.counter = component.MIN_VALUE;
    component.decrement();
    expect(window.alert).toHaveBeenCalledWith('Value too low');
    expect(component.counter).toBe(component.MIN_VALUE);
  });

  // replace the tests below
  it('should call the localStorage.getItem method on component init', () => {
    jest.spyOn(component.counterService, 'getFromStorage');
    component.ngOnInit();
    expect(component.counterService.getFromStorage).toHaveBeenCalled();
  });

  it('should retrieve the last saved value from localStorage on component init', () => {
    jest.spyOn(component.counterService, 'getFromStorage').mockReturnValue(12);
    component.ngOnInit();
    expect(component.counter).toBe(12);
  });

  it('should save the new counterValue to localStorage on increment, decrement and reset', () => {
    jest.spyOn(component.counterService, 'saveToStorage');
    component.counter = 0;
    component.increment();
    expect(component.counterService.saveToStorage).toHaveBeenCalledWith(1);
    component.counter = 20;
    component.decrement();
    expect(component.counterService.saveToStorage).toHaveBeenCalledWith(19);
    component.reset();
    expect(component.counterService.saveToStorage).toHaveBeenCalledWith(0);
  });

});
