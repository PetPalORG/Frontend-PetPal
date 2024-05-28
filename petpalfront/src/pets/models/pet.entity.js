export class Pet {
    constructor(id = "", nombre = "", especie = "", raza = "", edad = "", peso = "", comidaFavorita = "", imagen = "", descripcion = "" ) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.edad = edad;
        this.peso = peso;
        this.comidaFavorita = comidaFavorita;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
}