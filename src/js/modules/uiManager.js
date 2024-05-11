// uiManager.js
import { toggleForm } from './utils.js';
import { calculateAverageAge, filterData, addData, updateData, deleteData, getData } from './dataManager.js';

const table = document.getElementById('datosTable');

const id = document.getElementById('id');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const fechaNacimiento = document.getElementById('fechaNacimiento');
const tipo = document.getElementById('tipo');
const dni = document.getElementById('dni');
const paisOrigen = document.getElementById('paisOrigen');

const formABM = document.getElementById('formABM');
const abmForm = document.getElementById('abmForm');

export const setupEventListeners = () => {
    document.getElementById('filterType').addEventListener('change', filterAndDisplayData);
    document.getElementById('addNewPersonBtn').addEventListener('click', showAddForm);
    document.getElementById('addButton').addEventListener('click', addPerson);
    document.getElementById('updateButton').addEventListener('click', updatePerson);
    document.getElementById('deleteButton').addEventListener('click', deletePerson);
    document.getElementById('cancelButton').addEventListener('click', cancelOperation);
    document.getElementById('calcularEdadPromedio').addEventListener('click', calcularEdadPromedio);
    handleTypeChange();
};

export const displayData = (dataToShow) => {
    table.innerHTML = '';
    const headerRow = table.insertRow();
    const headers = ["ID", "Nombre", "Apellido", "Fecha Nacimiento", "DNI", "Pais Origen", "Editar", "Eliminar"];
    headers.forEach(text => {
        const headerCell = document.createElement("th");
        headerCell.textContent = text;
        headerRow.appendChild(headerCell);
    });

    dataToShow.forEach(person => {
        const row = table.insertRow();
        row.insertCell(0).innerText = person.id;
        row.insertCell(1).innerText = person.nombre;
        row.insertCell(2).innerText = person.apellido;
        row.insertCell(3).innerText = new Date(person.fechaNacimiento).getFullYear();
        row.insertCell(4).innerText = person.dni || 'N/A';
        row.insertCell(5).innerText = person.paisOrigen || 'N/A';

        const editCell = row.insertCell();
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => goFormEdit(person);

        const removeCell = row.insertCell();
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeBtn.onclick = () => goFormRemove(person);

        editCell.appendChild(editBtn);
        removeCell.appendChild(removeBtn);
    });
};

export const filterAndDisplayData = () => {
    const filterType = document.getElementById('filterType').value;
    const filteredData = filterData(filterType, getData());
    displayData(filteredData);
};

export const calcularEdadPromedio = () => {
    const filterType = document.getElementById('filterType').value;
    const averageAge = calculateAverageAge(filterType);
    document.getElementById('edadPromedio').value = averageAge.toFixed(2);
    alert(`La edad promedio de los ${filterType} es de ${averageAge.toFixed(2)} años`);
};


export const setupColumnToggles = () => {
    const toggles = document.querySelectorAll('#columnToggles input[type="checkbox"]');
    toggles.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const column = this.dataset.column;
            const cells = document.querySelectorAll(`td:nth-child(${parseInt(column) + 1}), th:nth-child(${parseInt(column) + 1})`); // +1 porque nth-child es basado en 1 no en 0
            cells.forEach(cell => {
                cell.style.display = this.checked ? '' : 'none';
            });
        });
    });
};

export const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
        id: generateUniqueId(),
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,  // Almacena la cadena de fecha directamente
        tipo: document.getElementById('tipo').value,
        dni: document.getElementById('dni').value,
        paisOrigen: document.getElementById('paisOrigen').value
    };
    addData(newPerson);
    displayData(getData());
    toggleForm(formABM);
};


export const updatePerson = (event) => {
    event.preventDefault();

    const personToUpdate = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fechaNacimiento: parseInt(document.getElementById('fechaNacimiento').value),
        tipo: document.getElementById('tipo').value,
        dni: document.getElementById('dni').value,
        paisOrigen: document.getElementById('paisOrigen').value
    };

    updateData(personToUpdate);
    displayData(getData());
    toggleForm(formABM);
};

export const deletePerson = (event) => {
    event.preventDefault();

    const exists = getData().some(item => item.id === parseInt(id.value));
    if (exists) {
        deleteData(id.value);
        displayData(getData());
        alert("Registro eliminado correctamente");
    } else {
        alert("ID no encontrado");
    }
    clearFormFields();
    toggleForm(formABM);
};

export const cancelOperation = () => {
    toggleForm(formABM);
    clearFormFields();
};

export const clearFormFields = () => {
    abmForm.reset();
};

export const showAddForm = () => {
    clearFormFields();
    id.value = '';
    id.disabled = true;

    if (tipo.value === 'ciudadano') {
        paisOrigen.value = '';
        paisOrigen.disabled = true;
        dni.disabled = false;
    } else if (tipo.value === 'extranjero') {
        dni.value = '';
        dni.disabled = true;
        paisOrigen.disabled = false;
    }

    addButton.style.display = 'inline';
    updateButton.style.display = 'none';
    deleteButton.style.display = 'none';

    toggleForm(formABM);
};


export const goFormEdit = (person) => {
    configureForm(person);
    id.disabled = true;
    addButton.style.display = 'none';
    deleteButton.style.display = 'none';
    updateButton.style.display = 'inline';
    toggleForm(formABM);
};

export const goFormRemove = (person) => {
    configureForm(person);
    disableAllFields();
    addButton.style.display = 'none';
    updateButton.style.display = 'none';
    deleteButton.style.display = 'inline';
    toggleForm(formABM);
};


const handleTypeChange = () => {
    tipo.addEventListener('change', () => {
        if (tipo.value === 'ciudadano') {
            paisOrigen.value = '';
            paisOrigen.disabled = true;
            dni.disabled = false;
        } else if (tipo.value === 'extranjero') {
            dni.value = '';
            dni.disabled = true;
            paisOrigen.disabled = false;
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    handleTypeChange();
    setupEventListeners();
});


const configureForm = (person) => {
    id.value = person.id;
    nombre.value = person.nombre;
    apellido.value = person.apellido;
    fechaNacimiento.value = new Date(person.fechaNacimiento).toISOString().split('T')[0];
    tipo.value = person.tipo;
    dni.value = person.dni || '';
    paisOrigen.value = person.paisOrigen || '';

    if (person.dni) {
        tipo.value = 'ciudadano';
        paisOrigen.disabled = true;
        dni.disabled = false;
    } else {
        tipo.value = 'extranjero';
        dni.disabled = true;
        paisOrigen.disabled = false;
    }

    handleTypeChange();
};

const disableAllFields = () => {
    id.disabled = true;
    nombre.disabled = true;
    apellido.disabled = true;
    fechaNacimiento.disabled = true;
    tipo.disabled = true;
    dni.disabled = true;
    paisOrigen.disabled = true;
};

function generateUniqueId() {
    const idsExistentes = getData().map(item => item.id);
    const maxId = Math.max(...idsExistentes, 0);
    return maxId + 1;
}