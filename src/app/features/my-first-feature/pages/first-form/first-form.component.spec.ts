import {FirstFormComponent} from './first-form.component';
import {Employee} from '../../../../shared/models/employee';
import {of, Subscription, throwError} from 'rxjs';

describe('FirstFormComponent', () => {
  let component: FirstFormComponent;
  let fakeFirstService;
  let fakeMessageService;
  let fakeRouter;

  beforeEach(() => {
    fakeFirstService = {
      findAllFonctions: jest.fn(),
      saveEmployee: jest.fn(),
    };
    fakeMessageService = {
      add: jest.fn()
    };
    fakeRouter = {
      navigate: jest.fn()
    };
    component = new FirstFormComponent(fakeFirstService, fakeMessageService, fakeRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Declaration of variables', () => {
    it('should declare fonctionList as empty array of Fonctions', () => {
      expect(component.fonctionList).toBeDefined();
      expect(component.fonctionList.length).toEqual(0);
    });

    it('should declare sub as empty array of Subscriptions', () => {
      expect(component.sub).toBeDefined();
      expect(component.sub.length).toEqual(0);
    });

    it('should declare employee as new Employee', () => {
      expect(component.employee).toBeDefined();
      expect(component.employee instanceof Employee).toBeTruthy();
    });

    it('should declare empForm as undefined', () => {
      expect(component.empForm).toBeUndefined();
    });
  });


  describe('setup component', () => {
    describe('On init', () => {
      beforeEach(() => {
        fakeFirstService.findAllFonctions.mockReturnValue(of([{id: 1, libelle: 'fct1'}, {id: 2, libelle: 'fct2'}]));
      });

      it('should call findAllFonctions on init ', () => {
        const spyFindAllFonctions = jest.spyOn(fakeFirstService, 'findAllFonctions');
        component.ngOnInit();
        expect(spyFindAllFonctions).toHaveBeenCalled();
        expect(component.fonctionList.length).toBeGreaterThan(0);
        expect(component.fonctionList).toEqual([{id: 1, libelle: 'fct1'}, {id: 2, libelle: 'fct2'}]);
      });

      it('should call one subscription', () => {
        component.ngOnInit();
        expect(component.sub.length).toEqual(1);
      });

      it('should call createForm on init', () => {
        const spyCreateForm = jest.spyOn(component, 'createForm');
        component.ngOnInit();
        expect(spyCreateForm).toHaveBeenCalled();
        expect(component.empForm).toBeDefined();
      });
    });

    describe('On destroy', () => {
      it('should call Unsubscribe on destroy', () => {
        component.ngOnDestroy();
        component.sub.forEach(x => {
          const spy = jest.spyOn(x, 'unsubscribe');
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });

  it('should transform to titlecase', () => {
    expect(component.setTitleCase('test')).toEqual('Test');
  });

  describe('test is form is valid', () => {
    beforeEach(() => {
      fakeFirstService.findAllFonctions.mockReturnValue(of(['test']));
      component.ngOnInit();
      component.empForm.setValue(
        {
          nom: 'nom',
          prenom: 'prenom',
          fonction: {
            id: 1,
            libelle: 'fonction',
          },
          dateArrivee: new Date(2015, 10, 8),
          sexe: 'M'
        }
      );
    });
    describe('invalid form if one field is in error', () => {
      it('should be invalid if nom field is blank', () => {
        component.empForm.get('nom').setValue(undefined);
        expect(component.empForm.status).toEqual('INVALID');
      });

      it('should be invalid if prenom field is blank', () => {
        component.empForm.get('prenom').setValue(undefined);
        expect(component.empForm.status).toEqual('INVALID');
      });

      it('should be invalid if fonction field is blank', () => {
        component.empForm.get('fonction').setValue(undefined);
        expect(component.empForm.status).toEqual('INVALID');
      });

      it('should be invalid if dateArrivee field is blank', () => {
        component.empForm.get('dateArrivee').setValue(undefined);
        expect(component.empForm.status).toEqual('INVALID');
      });

      it('should be invalid if sexe field is blank', () => {
        component.empForm.get('sexe').setValue(undefined);
        expect(component.empForm.status).toEqual('INVALID');
      });
    });

    describe('valid form', () => {
      it('should be valid if all fields have beed acquainted', () => {
        expect(component.empForm.status).toEqual('VALID');
      });

      describe('submit', () => {
        beforeEach(() => {
          fakeFirstService.saveEmployee.mockReturnValue(of({nom: 'nom', prenom: 'prenom'}));
        });

        it('should mark all fields all touched', () => {
          const spyMarkAllAsTouched = jest.spyOn(component.empForm, 'markAllAsTouched');
          component.submit();
          expect(spyMarkAllAsTouched).toHaveBeenCalled();
        });

        it('should set employee', () => {
          component.submit();
          expect(component.employee.nom).toEqual('nom');
          expect(component.employee.prenom).toEqual('prenom');
          expect(component.employee.fonction).toEqual({id: 1, libelle: 'fonction'});
          expect(component.employee.dateArrivee).toEqual(new Date(2015, 10, 8));
          expect(component.employee.sexe).toEqual('M');
        });

        it('should call saveEmployee function', () => {
          const spySaveEmployee = jest.spyOn(fakeFirstService, 'saveEmployee');
          component.submit();
          expect(spySaveEmployee).toHaveBeenCalled();
        });

        it('should call add toaster message success', () => {
          const spyShowMsg = jest.spyOn(component, 'showMessage');
          component.submit();
          jest.useFakeTimers();
          expect(component.employee.prenom).toEqual('prenom');
          expect(spyShowMsg).toHaveBeenCalledWith('success', `L'employee prenom nom a été enregistré.`, false, 'success');
        });

        it('should navigate to liste', () => {
          const spyRouter = jest.spyOn(fakeRouter, 'navigate');
          component.submit();
          jest.useFakeTimers();
          expect(spyRouter).toHaveBeenCalledWith(['/first/liste']);
        });

        it('should show error message in case of error', () => {
          fakeFirstService.saveEmployee.mockReturnValue(throwError(Error));
          const spyShowMsg = jest.spyOn(component, 'showMessage');
          component.submit();
          jest.useFakeTimers();
          expect(spyShowMsg).toHaveBeenCalledWith(
            'error', `Une erreur est survenue lors de l'enregistrement de l'employée`, true, 'error');
        });
      });
    });
    describe('invalid form', () => {
      describe('submit', () => {
        it('should not valorize Employee', () => {
          component.empForm.get('sexe').setValue(undefined);
          component.submit();
          expect(component.empForm.status).toEqual('INVALID');
          component.submit();
          expect(fakeFirstService.saveEmployee).not.toHaveBeenCalled();
          expect(component.employee.nom).toBeUndefined();
        });
      });
    });
  });
});
