import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPageComponent } from './statistics-page.component';

describe('StatisticsPageComponent', () => {
  let component: StatisticsPageComponent;
  let fixture: ComponentFixture<StatisticsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsPageComponent]
    });
    fixture = TestBed.createComponent(StatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
