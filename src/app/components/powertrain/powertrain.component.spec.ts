import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowertrainComponent } from './powertrain.component';

describe('PowertrainComponent', () => {
  let component: PowertrainComponent;
  let fixture: ComponentFixture<PowertrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowertrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowertrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
