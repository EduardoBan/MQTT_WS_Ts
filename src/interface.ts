export interface Welcome9 {
    Centralizador: Centralizador[];
  }
  
  export interface Centralizador {
    nom:  string;
    pasC: string;
    bat:  number;
    rssi: number;
    pMed: PMed[];
  }
  
  export interface PMed {
    id:   string;
    pas:  string;
    f:    string;
    bat:  number;
    rssi: number;
    daLo: DaLo[];
  }
  
  export interface DaLo {
   // f:  number;
   
    // A1: number;
    // A2: number;
    // A4: number;
    // A9: number;
  }

  // Create a generic interface:
export interface DatosNuevo<T> {
    date: Date;
    payload: T[];
  }