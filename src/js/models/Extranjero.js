// Villain.js
import Persona from './Persona.js';

export default class Extranjero extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen) {
        super(id, nombre, apellido, fechaNacimiento);
        this.paisOrigen = paisOrigen;
    }

    toString() {
        return `${super.toString()}, país de origen: ${this.paisOrigen}`;
    }
}
