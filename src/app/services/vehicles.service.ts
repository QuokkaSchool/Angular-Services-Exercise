import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VehicleInterface, VEHICLES_DATA } from '../pages/vehicles/utils/vehicles-data';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  public vehicles: BehaviorSubject<VehicleInterface[]> = new BehaviorSubject<VehicleInterface[]>(VEHICLES_DATA);

  public get vehicles$(): Observable<VehicleInterface[]> {
    return this.vehicles.asObservable();
  }

  public addVehicle(vehicle: Omit<VehicleInterface, 'id'>): void {
    const newVehicle = {
      id: uuidv4(),
      ...vehicle,
    }
    this.vehicles.next([...this.vehicles.getValue(), newVehicle]);
  }

  public updateVehicle(updatedVehicle: VehicleInterface): void {
    const updatedVehicles = this.vehicles.getValue()
      .map(vehicle =>
        vehicle.id === updatedVehicle.id
          ? updatedVehicle
          : vehicle
      );
    this.vehicles.next(updatedVehicles);
  }

  public deleteVehicle(vehicleId: string): void {
    const updatedVehicles = this.vehicles.getValue().filter(vehicle => vehicle.id !== vehicleId);
    this.vehicles.next(updatedVehicles);
  }

  public getVehicleById(vehicleId: string): VehicleInterface | undefined {
    return this.vehicles.getValue().find(vehicle => vehicle.id === vehicleId);
  }
}
