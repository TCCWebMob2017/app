import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalAlergiasPage } from './pessoal-alergias.page';

describe('PessoalAlergiasPage', () => {
  let component: PessoalAlergiasPage;
  let fixture: ComponentFixture<PessoalAlergiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalAlergiasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalAlergiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
