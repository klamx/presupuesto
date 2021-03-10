import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css'],
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textIncorrecto: string;

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = 'nombre gasto o cantidad incorrecta';
  }

  ngOnInit(): void {}

  agregarGasto(): void {
    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textIncorrecto =
        'La cantidad ingresada es mayor presupuesto restante';
      return;
    }
    // if (this.nombreGasto.trim() === '') {
    //   this.formularioIncorrecto = true;
    //   this.textIncorrecto = 'El gasto debe de teber un nombre';
    //   return;
    // }

    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'nombre gasto o cantidad incorrecta';
      return;
    } else {
      // crear objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad,
      };

      // enviar el objeto a los suscriptores via subjet
      this._presupuestoService.agregarGasto(GASTO);

      // resetear el formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
