import {HeaderComponent} from './header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items to undefined', () => {
    expect(component.items).toBeUndefined();
  });

  it('should valorize items on init', () => {
    component.ngOnInit();
    expect(component.items).toBeDefined();
  });
});

