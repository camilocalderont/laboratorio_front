export interface IEstudio {
    pacienteId: number;
    porcentajeAzucar: number;
    porcentajeGrasa: number;
    porcentajeOxigeno: number;
    nivelRiesgo?: string; // este campo se calcula posteriormente en función de los porcentajes.
  }
  