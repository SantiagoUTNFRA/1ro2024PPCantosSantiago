// Hero.js
import Persona from './Persona.js';

export default class Ciudadano extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, dni) {
        super(id, nombre, apellido, edad, ciudad);
        this.dni = dni;
    }

    toString() {
        return `${super.toString()}, dni: ${this.dni}`;
    }
}
