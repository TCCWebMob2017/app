import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalDoencasPage } from './pessoal-doencas.page';

describe('PessoalDoencasPage', () => {
  let component: PessoalDoencasPage;
  let fixture: ComponentFixture<PessoalDoencasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalDoencasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalDoencasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
