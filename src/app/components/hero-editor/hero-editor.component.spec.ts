import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEditorComponent } from './hero-editor.component';

describe('HeroEditorComponent', () => {
  let component: HeroEditorComponent;
  let fixture: ComponentFixture<HeroEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
