// app.js
import { setupEventListeners, displayData, setupColumnToggles, showAddForm } from './modules/uiManager.js';
import { getData } from './modules/dataManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const allData = getData();
    displayData(allData);
    setupEventListeners();
    setupColumnToggles();

    window.showAddForm = showAddForm;
});