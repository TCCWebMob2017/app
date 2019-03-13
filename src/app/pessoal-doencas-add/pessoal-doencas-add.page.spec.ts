import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalDoencasAddPage } from './pessoal-doencas-add.page';

describe('PessoalDoencasAddPage', () => {
  let component: PessoalDoencasAddPage;
  let fixture: ComponentFixture<PessoalDoencasAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalDoencasAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalDoencasAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
