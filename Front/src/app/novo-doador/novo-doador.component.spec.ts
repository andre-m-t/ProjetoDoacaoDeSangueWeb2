import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoDoadorComponent } from './novo-doador.component';

describe('NovoDoadorComponent', () => {
  let component: NovoDoadorComponent;
  let fixture: ComponentFixture<NovoDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovoDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
