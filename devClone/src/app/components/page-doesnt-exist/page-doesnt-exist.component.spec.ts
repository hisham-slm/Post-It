import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDoesntExistComponent } from './page-doesnt-exist.component';

describe('PageDoesntExistComponent', () => {
  let component: PageDoesntExistComponent;
  let fixture: ComponentFixture<PageDoesntExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDoesntExistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDoesntExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
