document.getElementById('formCreator').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formName = document.getElementById('formName').value;
    createForm(formName);
    document.getElementById('formName').value = '';
});

function createForm(name) {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form');
    
    const form = document.createElement('form');
    form.innerHTML = `
        <h2>${name}</h2>
        <label for="inputField">Введите данные:</label>
        <input type="text" id="inputField" required>
        <button type="submit">Отправить</button>
    `;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const inputData = document.getElementById('inputField').value;
        saveFormData(name, inputData);
        displayFormData(name);
        document.getElementById('inputField').value = '';
    });
    
    formContainer.appendChild(form);
    document.getElementById('formsContainer').appendChild(formContainer);
}

function saveFormData(formName, data) {
    const existingData = JSON.parse(localStorage.getItem(formName)) || [];
    existingData.push(data);
    localStorage.setItem(formName, JSON.stringify(existingData));
}

function displayFormData(formName) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; // Очистить предыдущие данные

    const savedData = JSON.parse(localStorage.getItem(formName)) || [];
    if (savedData.length > 0) {
        const formDataDiv = document.createElement('div');
        formDataDiv.classList.add('data');
        formDataDiv.innerHTML = `<h3>Данные для формы "${formName}":</h3>`;
        
        savedData.forEach((data, index) => {
            formDataDiv.innerHTML += `<p>${index + 1}: ${data}</p>`;
        });

        dataContainer.appendChild(formDataDiv);
    }
}
