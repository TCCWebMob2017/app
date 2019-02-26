import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalMedicamentosAddPage } from './pessoal-medicamentos-add.page';

describe('PessoalMedicamentosAddPage', () => {
  let component: PessoalMedicamentosAddPage;
  let fixture: ComponentFixture<PessoalMedicamentosAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalMedicamentosAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalMedicamentosAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
