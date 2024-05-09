import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeDoadoresComponent } from './lista-de-doadores.component';

describe('ListaDeDoadoresComponent', () => {
  let component: ListaDeDoadoresComponent;
  let fixture: ComponentFixture<ListaDeDoadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeDoadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDeDoadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
