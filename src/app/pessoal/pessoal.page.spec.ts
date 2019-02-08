import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalPage } from './pessoal.page';

describe('PessoalPage', () => {
  let component: PessoalPage;
  let fixture: ComponentFixture<PessoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
