import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalDoencaDetPage } from './pessoal-doenca-det.page';

describe('PessoalDoencaDetPage', () => {
  let component: PessoalDoencaDetPage;
  let fixture: ComponentFixture<PessoalDoencaDetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalDoencaDetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalDoencaDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
