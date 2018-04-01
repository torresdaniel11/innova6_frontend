import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoGtiComponent } from './equipo-gti.component';

describe('EquipoGtiComponent', () => {
  let component: EquipoGtiComponent;
  let fixture: ComponentFixture<EquipoGtiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoGtiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoGtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
