import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalBasePage } from './pessoal-base.page';

describe('PessoalBasePage', () => {
  let component: PessoalBasePage;
  let fixture: ComponentFixture<PessoalBasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalBasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalBasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
