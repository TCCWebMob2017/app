import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalAlergiasAddPage } from './pessoal-alergias-add.page';

describe('PessoalAlergiasAddPage', () => {
  let component: PessoalAlergiasAddPage;
  let fixture: ComponentFixture<PessoalAlergiasAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalAlergiasAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalAlergiasAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
