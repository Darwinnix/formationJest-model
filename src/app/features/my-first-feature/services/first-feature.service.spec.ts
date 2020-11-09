import {FirstFeatureService} from './first-feature.service';
import {environment} from '../../../../environments/environment';
import {of} from 'rxjs';

describe('FirstFeatureService', () => {
  let service: FirstFeatureService;
  let fakeHttpClient;

  beforeEach(() => {
    fakeHttpClient = {
      get: jest.fn(),
      post: jest.fn()
    };

    service = new FirstFeatureService(fakeHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intialize url variables', () => {
    expect(service.employeeURL).toEqual(environment.employees);
    expect(service.fonctionsURL).toEqual(environment.fonctions);
  });

  describe('findAllFonctions', () => {
    beforeEach(() => {
      const fakeFonctions = [
        {
          id: 1,
          libelle: 'fonction1'
        },
        {
          id: 2,
          libelle: 'fonction2'
        }
      ];
      fakeHttpClient.get.mockReturnValue(of(fakeFonctions));
    });
    it('should return all Fonctions', () => {
      service.findAllFonctions().subscribe(res => {
        expect(fakeHttpClient.get).toHaveBeenCalledWith(service.fonctionsURL);
        expect(res.length).toEqual(2);
        expect(res[0].libelle).toEqual('fonction1');
      });
    });
  });

  describe('findAllEmployees', () => {
    beforeEach(() => {
      const fakeEmployees = [
        {
          id: 1,
          nom: 'nom1',
          prenom: 'prenom1',
          sexe: 'sexe1',
          dateArrivee: new Date(2015, 10, 5),
          dateDepart: undefined,
          fonction: {
            id: 1,
            libelle: 'fonction1'
          }
        },
        {
          id: 2,
          nom: 'nom2',
          prenom: 'prenom2',
          sexe: 'sexe2',
          dateArrivee: new Date(2016, 11, 6),
          dateDepart: undefined,
          fonction: {
            id: 2,
            libelle: 'fonction2'
          }
        }
      ];
      fakeHttpClient.get.mockReturnValue(of(fakeEmployees));
    });
    it('should return all Employees', () => {
      service.findAllEmployees().subscribe(res => {
        expect(fakeHttpClient.get).toHaveBeenCalledWith(service.employeeURL);
        expect(res.length).toEqual(2);
        expect(res[1].prenom).toEqual('prenom2');
      });
    });
  });

  describe('saveEmployee', () => {
    beforeEach(() => {
      const fakeEmployee = {
        id: 42,
        nom: 'nom1',
        prenom: 'prenom1',
        sexe: 'sexe1',
        dateArrivee: new Date(2015, 10, 5),
        dateDepart: undefined,
        fonction: {
          id: 1,
          libelle: 'fonction1'
        }
      };
      fakeHttpClient.post.mockReturnValue(of(fakeEmployee));
    });

    it('should return created employee', () => {
      const fakeEmployee = {
        id: undefined,
        nom: 'nom1',
        prenom: 'prenom1',
        sexe: 'sexe1',
        dateArrivee: new Date(2015, 10, 5),
        dateDepart: undefined,
        fonction: {
          id: 1,
          libelle: 'fonction1'
        }
      };
      service.saveEmployee(fakeEmployee).subscribe(res => {
        expect(fakeHttpClient.post).toHaveBeenCalledWith(service.employeeURL);
        expect(res.id).toEqual(42);
      });
    });
  });

});
