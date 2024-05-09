import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDoadorComponent } from './buscar-doador.component';

describe('BuscarDoadorComponent', () => {
  let component: BuscarDoadorComponent;
  let fixture: ComponentFixture<BuscarDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
