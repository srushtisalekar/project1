// Pre-populated in-memory storage for city population data
let prePopulatedCityPopulations = [
    { id: 1, cityName: 'Ahmedabad', countryName: 'India', year: 2001, population: 3520085 },
    { id: 2, cityName: 'Ajmer', countryName: 'India', year: 2001, population: 485575 },
    { id: 3, cityName: 'Bihar', countryName: 'India', year: 2003, population: 8982000 },
    { id: 4, cityName: 'Bilaspur', countryName: 'India', year: 2002, population: 4562000 },
];

let cityPopulations = [];
let cityIdCounter = 1; // ID counter starts from 1

// Function to render pre-populated city population data in table format
function renderPrePopulatedCityPopulations() {
    const prePopulatedCityPopulationBody = document.getElementById('prePopulatedCityPopulationBody');
    prePopulatedCityPopulationBody.innerHTML = ''; // Clear previous table body
    prePopulatedCityPopulations.forEach(city => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${city.id}</td>
            <td>${city.cityName}</td>
            <td>${city.countryName}</td>
            <td>${city.year}</td>
            <td>${city.population}</td>
             
        `;
        prePopulatedCityPopulationBody.appendChild(tr);
    });
}

// Function to initialize city populations from local storage
function initializeCityPopulations() {
    const storedCityPopulations = localStorage.getItem('cityPopulations');
    if (storedCityPopulations) {
        cityPopulations = JSON.parse(storedCityPopulations);
        cityIdCounter = cityPopulations.length ? Math.max(...cityPopulations.map(city => city.id)) + 1 : 1;
    }
}

// Function to render New-added city population data in table format
function renderCityPopulations() {
    const cityPopulationBody = document.getElementById('cityPopulationBody');
    cityPopulationBody.innerHTML = ''; // Clear previous table body
    cityPopulations.forEach(city => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${city.id}</td>
            <td>${city.cityName}</td>
            <td>${city.countryName}</td>
            <td>${city.year}</td>
            <td>${city.population}</td>
            <td>
                <button onclick="editCityPopulation(${city.id}, '${city.cityName}', '${city.countryName}', ${city.year}, ${city.population})">Edit</button>
                <button onclick="deleteCityPopulationById(${city.id})">Delete</button>
            </td>
        `;
        cityPopulationBody.appendChild(tr);
    });
}

// Function to create new city population entry
function createCityPopulation() {
    const cityName = document.getElementById('cityName').value;
    const countryName = document.getElementById('countryName').value;
    const year = parseInt(document.getElementById('year').value);
    const population = parseInt(document.getElementById('population').value);

    if (cityName && countryName && year && population) {
        const newCity = {
            id: cityIdCounter++,
            cityName,
            countryName,
            year,
            population
        };

        cityPopulations.push(newCity);
        saveCityPopulations(); // Save city populations to local storage
        document.getElementById('cityName').value = '';
        document.getElementById('countryName').value = '';
        document.getElementById('year').value = '';
        document.getElementById('population').value = '';
        alert('City population added successfully!');
        renderCityPopulations(); // Re-render city populations
    } else {
        alert('Please fill in all fields');
    }
}

// Function to update city population entry
function updateCityPopulation() {
    const id = parseInt(document.getElementById('updateId').value);
    const cityName = document.getElementById('updateCityName').value;
    const countryName = document.getElementById('updateCountryName').value;
    const year = parseInt(document.getElementById('updateYear').value);
    const population = parseInt(document.getElementById('updatePopulation').value);

    const city = cityPopulations.find(city => city.id === id);

    if (city && cityName && countryName && year && population) {
        city.cityName = cityName;
        city.countryName = countryName;
        city.year = year;
        city.population = population;

        saveCityPopulations(); // Save city populations to local storage
        document.getElementById('updateId').value = '';
        document.getElementById('updateCityName').value = '';
        document.getElementById('updateCountryName').value = '';
        document.getElementById('updateYear').value = '';
        document.getElementById('updatePopulation').value = '';
        alert('City population updated successfully!');
        renderCityPopulations(); // Re-render city populations
    } else {
        alert('Please enter valid data');
    }
}

// Function to save city populations to local storage
function saveCityPopulations() {
    localStorage.setItem('cityPopulations', JSON.stringify(cityPopulations));
}

// Function to delete city population entry by ID
function deleteCityPopulationById(id) {
    const index = cityPopulations.findIndex(city => city.id === id);

    if (index !== -1) {
        cityPopulations.splice(index, 1);
        saveCityPopulations(); // Save city populations to local storage
        alert('City population deleted successfully!');
        renderCityPopulations(); // Re-render city populations
    } else {
        alert('City population not found');
    }
}

// Function to edit city population entry (populate update form)
function editCityPopulation(id, cityName, countryName, year, population) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateCityName').value = cityName;
    document.getElementById('updateCountryName').value = countryName;
    document.getElementById('updateYear').value = year;
    document.getElementById('updatePopulation').value = population;
}

// Function to render filtered city populations based on search input
function searchCities() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPrePopulatedCities = prePopulatedCityPopulations.filter(city => city.cityName.toLowerCase().includes(searchInput));
    const filteredUserAddedCities = cityPopulations.filter(city => city.cityName.toLowerCase().includes(searchInput));
    renderFilteredPrePopulatedCities(filteredPrePopulatedCities);
    renderFilteredCities(filteredUserAddedCities);
}

// Function to render filtered pre-populated city populations
function renderFilteredPrePopulatedCities(filteredCities) {
    const prePopulatedCityPopulationBody = document.getElementById('prePopulatedCityPopulationBody');
    prePopulatedCityPopulationBody.innerHTML = ''; // Clear previous table body
    filteredCities.forEach(city => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${city.id}</td>
            <td>${city.cityName}</td>
            <td>${city.countryName}</td>
            <td>${city.year}</td>
            <td>${city.population}</td>
        `;
        prePopulatedCityPopulationBody.appendChild(tr);
    });
}

// Function to render filtered user-added city populations
function renderFilteredCities(filteredCities) {
    const cityPopulationBody = document.getElementById('cityPopulationBody');
    cityPopulationBody.innerHTML = ''; // Clear previous table body
    filteredCities.forEach(city => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${city.id}</td>
            <td>${city.cityName}</td>
            <td>${city.countryName}</td>
            <td>${city.year}</td>
            <td>${city.population}</td>
            <td>
                <button onclick="editCityPopulation(${city.id}, '${city.cityName}', '${city.countryName}', ${city.year}, ${city.population})">Edit</button>
                <button onclick="deleteCityPopulationById(${city.id})">Delete</button>
            </td>
        `;
        cityPopulationBody.appendChild(tr);
    });
}

// Initial rendering of city populations on page load
window.onload = function() {
    initializeCityPopulations();
    renderPrePopulatedCityPopulations(); // Render pre-populated city populations
    renderCityPopulations(); // Render user-added city populations
}
