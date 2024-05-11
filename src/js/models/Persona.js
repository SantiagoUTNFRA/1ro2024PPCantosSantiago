// Person.js
export default class Persona {
    constructor(id, nombre, apellido, fechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }

    toString() {
        return `${this.nombre} ${this.apellido}, fecha de nacimiento: ${this.fechaNacimiento}`;
    }
}
