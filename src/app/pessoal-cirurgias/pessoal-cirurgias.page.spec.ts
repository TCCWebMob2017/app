import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalCirurgiasPage } from './pessoal-cirurgias.page';

describe('PessoalCirurgiasPage', () => {
  let component: PessoalCirurgiasPage;
  let fixture: ComponentFixture<PessoalCirurgiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalCirurgiasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalCirurgiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
