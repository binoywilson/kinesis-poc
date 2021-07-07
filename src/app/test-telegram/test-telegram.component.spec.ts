import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTelegramComponent } from './test-telegram.component';

describe('TestTelegramComponent', () => {
  let component: TestTelegramComponent;
  let fixture: ComponentFixture<TestTelegramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTelegramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTelegramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
