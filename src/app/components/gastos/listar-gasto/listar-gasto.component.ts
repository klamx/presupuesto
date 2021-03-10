import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css'],
})
export class ListarGastoComponent implements OnInit, OnDestroy {
  susbscription: Subscription;
  presupuesto: number;
  restante: number;
  listGastos: any[] = [];

  constructor(private _presupuestoService: PresupuestoService) {
    this.susbscription = this._presupuestoService
      .getGastos()
      .subscribe((data) => {
        this.restante = this.restante - data.cantidad;
        this.listGastos = [...this.listGastos, data];
      });
    this.presupuesto = 0;
    this.restante = 0;
  }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

  ngOnDestroy(): void {
    this.susbscription.unsubscribe();
  }

  aplicarColor() {
    if (this.presupuesto / 4 > this.restante) {
      return 'alert-danger';
    } else if (this.presupuesto / 2 > this.restante) {
      return 'alert-warning';
    } else {
      return 'alert-secondary';
    }
  }
}
