import {FirstListeComponent} from './first-liste.component';
import {of} from 'rxjs';

describe('FistListComponent', () => {

  let component: FirstListeComponent;
  let fakeFirstService;

  beforeEach(() => {
    fakeFirstService = {
      findAllEmployees: jest.fn()
    };
    component = new FirstListeComponent(fakeFirstService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should declare all variables correctly', () => {
    expect(component.sub.length).toEqual(0);
    expect(component.employeeList.length).toEqual(0);
    expect(component.cols.length).toEqual(0);
  });

  describe('On init', () => {
    beforeEach(() => {
      fakeFirstService.findAllEmployees.mockReturnValue(of('true'));
    });

    it('should call findAllEmployee fonction', () => {
      const spyFindAllEmployees = jest.spyOn(fakeFirstService, 'findAllEmployees');
      component.ngOnInit();
      expect(spyFindAllEmployees).toHaveBeenCalled();
      expect(component.employeeList.length).toBeGreaterThan(0);
    });
  });

  describe('on destroy', () => {
    it('should call Unsubscribe on destroy', () => {
      component.ngOnDestroy();
      component.sub.forEach(x => {
        const spy = jest.spyOn(x, 'unsubscribe');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
