import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChannelComponent } from './test-channel.component';

describe('TestChannelComponent', () => {
  let component: TestChannelComponent;
  let fixture: ComponentFixture<TestChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
