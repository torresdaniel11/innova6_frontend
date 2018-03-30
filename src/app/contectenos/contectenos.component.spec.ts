import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContectenosComponent } from './contectenos.component';

describe('ContectenosComponent', () => {
  let component: ContectenosComponent;
  let fixture: ComponentFixture<ContectenosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContectenosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContectenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
