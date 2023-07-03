export interface Welcome9 {
    Centralizador: Centralizador[];
  }
  
  export interface Centralizador {
    nom:  string;
    pasC: string;
    bat?:  number;
    rssi?: number;
    pMed: PMed[];
  }
  
  export interface PMed {
    id:   string;
    pas:  string;
    f:    string;
    bat?:  number;
    rssi?: number;
    daLo: DaLo[];
   }


export interface DaLo {
  daLo: any;
}

  
/*    export interface DaLo {  //Interface Data Logger
    // f?:  number;  //Fecha formato UNIX EPOCH
   A1: number;
    A2: number;
    A3: number;
    A4: number;
    A5: number;
    A6: number;
    A7: number;
    A8: number;
    A9: number; 
  }  */
 
  // Create a generic interface:
/* export interface DaLo<T> {
    date: Date;
    payload: T[];
  } */