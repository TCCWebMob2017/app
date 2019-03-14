import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalDependentesPage } from './pessoal-dependentes.page';

describe('PessoalDependentesPage', () => {
  let component: PessoalDependentesPage;
  let fixture: ComponentFixture<PessoalDependentesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalDependentesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalDependentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
