import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeDoacoesComponent } from './lista-de-doacoes.component';

describe('ListaDeDoacoesComponent', () => {
  let component: ListaDeDoacoesComponent;
  let fixture: ComponentFixture<ListaDeDoacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeDoacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDeDoacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
