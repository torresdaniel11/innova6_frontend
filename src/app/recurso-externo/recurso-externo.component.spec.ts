import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoExternoComponent } from './recurso-externo.component';

describe('RecursoExternoComponent', () => {
  let component: RecursoExternoComponent;
  let fixture: ComponentFixture<RecursoExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
