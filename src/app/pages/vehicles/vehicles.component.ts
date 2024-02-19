import { Component } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { VehicleInterface, VEHICLES_DATA, VehicleStatus, VehicleType } from './utils/vehicles-data';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  protected vehicles$: Observable<VehicleInterface[]> = this.vehiclesService.vehicles$;
  protected isDialogVisible: boolean = false;
  protected selectedVehicle!: VehicleInterface | undefined;

  constructor(private vehiclesService: VehiclesService) {}

  protected addVehicle(): void {
    this.vehiclesService.addVehicle({
      brand: 'Fiat',
      model: 'Multipla',
      year: 2005,
      registrationNumber: 'ABC123',
      type: VehicleType.van,
      status: VehicleStatus.available,
    });
  }

  protected async updateVehicle(): Promise<void> {
    const vehicles = await firstValueFrom(this.vehiclesService.vehicles$);
    const vehicle = vehicles[0];
    this.vehiclesService.updateVehicle({
      id: vehicle.id,
      brand: 'Fiat - Edytowany',
      model: 'Multipla',
      year: 1999,
      registrationNumber: 'CBA321',
      type: VehicleType.van,
      status: VehicleStatus.inUse,
    });
  }

  protected async deleteVehicle(): Promise<void> {
    const vehicles = await firstValueFrom(this.vehiclesService.vehicles$);
    const vehicleId = vehicles[0].id;
    this.vehiclesService.deleteVehicle(vehicleId);
  }

  protected async getVehicleById(): Promise<void> {
    const vehicles = await firstValueFrom(this.vehiclesService.vehicles$);
    const vehicleId = vehicles[0].id;
    this.selectedVehicle = this.vehiclesService.getVehicleById(vehicleId)
    this.isDialogVisible = true;
  }
}
