import { mapEmployeeSummaryFromApiToVm, mapEmployeeSummaryListFromApiToVm, mapProjectFromApiToVm } from './project.mapper';
import * as viewModel from './project.vm';
import type { EmployeeSummary as ApiEmployee, Project as ApiProject } from './api/project.api-model';

describe('project.mapper – mapEmployeeSummaryFromApiToVm', () => {
  it('debería transformar un EmployeeSummary de API a VM correctamente', () => {
    // Arrange: objeto de ejemplo de la API
    const apiEmployee: ApiEmployee = {
      id: 'e1',
      employeeName: 'María Pérez',
      isAssigned: true,
    };

    // Act: mapeamos a VM
    const vmEmployee = mapEmployeeSummaryFromApiToVm(apiEmployee);

    // Assert: debe coincidir con el objeto spread
    expect(vmEmployee).toEqual({
      id: 'e1',
      employeeName: 'María Pérez',
      isAssigned: true,
    });
  });
});

describe('project.mapper – mapEmployeeSummaryListFromApiToVm', () => {
  it('debería devolver array vacío si la lista de API está vacía', () => {
    const apiList: ApiEmployee[] = [];

    const vmList = mapEmployeeSummaryListFromApiToVm(apiList);

    expect(vmList).toEqual([]);
  });

  it('debería mapear cada elemento de la lista correctamente', () => {
    const apiList: ApiEmployee[] = [
      { id: 'e1', employeeName: 'Ana', isAssigned: true },
      { id: 'e2', employeeName: 'Luis', isAssigned: false },
    ];

    const vmList = mapEmployeeSummaryListFromApiToVm(apiList);

    expect(vmList).toEqual([
      { id: 'e1', employeeName: 'Ana', isAssigned: true },
      { id: 'e2', employeeName: 'Luis', isAssigned: false },
    ]);
  });
});

describe('project.mapper – mapProjectFromApiToVm', () => {
  it('debería devolver createEmptyProject() si el input es falsy', () => {
    const apiProject: ApiProject | null = null;

    const vmProject = mapProjectFromApiToVm(apiProject as any);

    expect(vmProject).toEqual(viewModel.createEmptyProject());
  });

  it('debería mapear un proyecto con empleados correctamente', () => {
    const apiProject: ApiProject = {
      id: 'p1',
      name: 'Proyecto X',
      externalId: 'EXT-001',
      comments: 'Notas',
      isActive: true,
      employees: [
        { id: 'e1', employeeName: 'Ana', isAssigned: true },
        { id: 'e2', employeeName: 'Luis', isAssigned: false },
      ],
    };

    const vmProject = mapProjectFromApiToVm(apiProject);

    expect(vmProject).toEqual({
      id: 'p1',
      name: 'Proyecto X',
      externalId: 'EXT-001',
      comments: 'Notas',
      isActive: true,
      employees: [
        { id: 'e1', employeeName: 'Ana', isAssigned: true },
        { id: 'e2', employeeName: 'Luis', isAssigned: false },
      ],
    });
  });
});
