import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaComponentComponent } from './transferencia-component.component';

describe('TransferenciaComponentComponent', () => {
  let component: TransferenciaComponentComponent;
  let fixture: ComponentFixture<TransferenciaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
