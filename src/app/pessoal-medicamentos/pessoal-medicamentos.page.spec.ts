import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalMedicamentosPage } from './pessoal-medicamentos.page';

describe('PessoalMedicamentosPage', () => {
  let component: PessoalMedicamentosPage;
  let fixture: ComponentFixture<PessoalMedicamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalMedicamentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalMedicamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
