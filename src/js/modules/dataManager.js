import { jsonData } from './data.js';

let data = jsonData;

export const getData = () => data;

// dataManager.js
export const filterData = (type, allData) => {
    return allData.filter(item => {
        if (type === 'persona') return true;
        if (type === 'ciudadano' && item.dni) return true;
        if (type === 'extranjero' && item.paisOrigen) return true;
        return false;
    });
};

function calculateAge(birthDate) {
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

export const calculateAverageAge = (type) => {
    const filteredData = filterData(type, getData());
    const totalAge = filteredData.reduce((sum, item) => {
        const age = calculateAge(item.fechaNacimiento);
        return sum + age;
    }, 0);
    const averageAge = filteredData.length > 0 ? totalAge / filteredData.length : 0;
    return averageAge;
};

export const updateData = (person) => {

    const exists = data.some(item => item.id === parseInt(person.id));
    if (exists) {
        const index = data.findIndex(item => item.id === parseInt(person.id));
        data[index] = { ...data[index], ...person };
        console.log("Datos actualizados:", data[index]);
    } else {
        console.log("ID no encontrado");
    }

    alert(person.id + "dataManager");

};

export const addData = (newPerson) => {
    data.push(newPerson);
};

export const deleteData = (id) => {
    const exists = data.some(item => item.id === parseInt(id));
    if (exists) {
        data = data.filter(item => item.id !== parseInt(id));
    } else {
        console.log("ID no encontrado");
    }
};

