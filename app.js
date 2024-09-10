// Data structure
const data = {
    "corporate-entity": ["P&G", "Unilever"],
    "regions": ["USA"],
    "brands": {
        "P&G": ["Gillette", "Pampers"],
        "Unilever": ["Dove", "Comfort"]
    },
    "brand-versions": ["V1", "V2", "V3"],
    "products": {
        "Gillette": ["Gillette X", "Gillette Y"],
        "Pampers": ["Pampers X", "Pampers Y"],
        "Dove": ["Dove X", "Dove Y"],
        "Comfort": ["Comfort X", "Comfort Y"]
    },
    "product-versions": ["V1", "V2", "V3"]
};

const propertyOptions = [
    "Top feature customers look for while buying product",
    "Top paintpoint solved by product in general",
    "Feature of company's product",
    "Benefit of company's product",
    "FeBe of company's product",
    "Ad reference",
    "Product Media"
];

const angleProperties = [
    "Feature focused",
    "Painpoint addressed",
    "Angle approach",
    "Angle tone",
    "Emotion/ Effect to evoke"
];

const scriptPropertyTypes = [
    "Hook", "Discredit", "Solution", "Results", "Social Proof", "CTA", "Outro"
];

const scriptPropertyTypeDetails = [
    "Time Stamp", "On-screen visual", "Voice over", "On-screen text"
];

const variantPropertyOptions = {
    "Region": ["North America", "Europe", "Asia", "Africa", "South America"],
    "Platform": ["Facebook", "Instagram", "YouTube", "TikTok", "Twitter"],
    "Language": ["English", "Spanish", "French", "German", "Chinese"],
    "Device Type": ["Mobile", "Desktop", "Tablet", "Smart TV"],
    "Season/Occasion": ["Spring", "Summer", "Fall", "Winter", "Holiday"]
};

function populateDropdown(id, options) {
    const select = document.getElementById(id);
    if (!select) {
        console.error(`Element with id "${id}" not found`);
        return;
    }
    
    // Clear existing options
    select.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `Select ${id.replace('-', ' ')}`;
    select.appendChild(defaultOption);
    
    // Add provided options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    
    // Add "Add new version" option
    if (id === 'brand-version' || id === 'product-version') {
        const newVersionOption = document.createElement('option');
        newVersionOption.value = 'new';
        newVersionOption.textContent = 'Add new version';
        select.appendChild(newVersionOption);
    }
}

function createCheckboxes(container, options, label) {
    if (!container) {
        console.error('Container not found');
        return;
    }
    container.innerHTML = `<h5>${label}</h5>`;
    options.forEach(option => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'checkbox-container';
        checkboxDiv.innerHTML = `
            <input type="checkbox" id="${option}" name="${container.id}" value="${option}">
            <label for="${option}">${option}</label>
        `;
        container.appendChild(checkboxDiv);
    });
}

function createDropdown(container, options, label) {
    const select = document.createElement('select');
    select.innerHTML = `<option value="">Select ${label}</option>`;
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.appendChild(select);
    container.appendChild(labelElement);
}

function updatePropertyInputs() {
    const propertyInputsContainer = document.getElementById('property-inputs');
    propertyInputsContainer.innerHTML = '';

    const checkedProperties = document.querySelectorAll('#property-checkboxes input:checked');
    checkedProperties.forEach(checkbox => {
        const propertyBox = document.createElement('div');
        propertyBox.className = 'property-box';
        propertyBox.innerHTML = `<h3>${checkbox.value}</h3>`;
        addPropertyInput(checkbox.value, 1, propertyBox);
        propertyInputsContainer.appendChild(propertyBox);
    });
}

function addPropertyInput(property, count, container) {
    const inputDiv = document.createElement('div');
    inputDiv.className = 'property-input';
    inputDiv.innerHTML = `
        <div class="property-header">
            <h4>${property}</h4>
            <span class="add-more" data-property="${property}" data-count="${count}">Add more</span>
        </div>
        <div class="input-group">
            <input type="text" id="${property.replace(/\s+/g, '-').toLowerCase()}-${count}" name="${property}-${count}">
        </div>
    `;
    container.appendChild(inputDiv);

    inputDiv.querySelector('.add-more').addEventListener('click', (event) => {
        const newCount = parseInt(event.target.dataset.count) + 1;
        const newInputGroup = document.createElement('div');
        newInputGroup.className = 'input-group';
        newInputGroup.innerHTML = `
            <input type="text" id="${property.replace(/\s+/g, '-').toLowerCase()}-${newCount}" name="${property}-${newCount}">
        `;
        inputDiv.appendChild(newInputGroup);
        event.target.dataset.count = newCount;
    });
}

function generateAngles() {
    // Clear existing scripts and variants
    clearScriptsAndVariants();

    const angleElements = [
        "Feature focused",
        "Painpoint addressed",
        "Angle approach",
        "Angle tone",
        "Emotion/ Effect to evoke"
    ];

    const popupContent = `
        <div id="angle-popup">
            <h3>Select angle elements</h3>
            ${angleElements.map(element => `
                <div>
                    <input type="checkbox" id="${element.replace(/\s+/g, '-').toLowerCase()}" name="angle-element" value="${element}">
                    <label for="${element.replace(/\s+/g, '-').toLowerCase()}">${element}</label>
                </div>
            `).join('')}
            <button id="generate-angles-confirm">Generate</button>
        </div>
    `;

    const popup = $('<div>').html(popupContent).dialog({
        modal: true,
        width: 400,
        close: function() {
            $(this).dialog('destroy').remove();
        }
    });

    $('#generate-angles-confirm').on('click', function() {
        const selectedElements = $('input[name="angle-element"]:checked').map(function() {
            return this.value;
        }).get();

        console.log("Selected angle elements:", selectedElements);
        popup.dialog('close');
        
        // Clear existing angles before generating new ones
        const anglesContainer = document.getElementById('angles');
        const boxContent = anglesContainer.querySelector('.box-content');
        boxContent.innerHTML = '';
        
        generateAnglesContent(selectedElements);
        
        // Show the "Generate More" button after generating angles
        document.getElementById('generate-more-angles').style.display = 'inline-block';
    });
}

function generateAnglesContent(selectedElements) {
    const anglesContainer = document.getElementById('angles');
    const boxContent = anglesContainer.querySelector('.box-content');
    boxContent.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        addAngle(boxContent, i, selectedElements);
    }
}

function addAngle(container, number, selectedElements) {
    const angleDiv = document.createElement('div');
    angleDiv.className = 'angle';
    angleDiv.innerHTML = `
        <h3>
            Angle ${number} 
            <span class="info-box">
                <span class="info-text">0 scripts 0 variants</span>
                <i class="fas fa-project-diagram"></i>
            </span>
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="angle-content" style="display: none;">
            ${selectedElements.map(element => `
                <div class="angle-element">
                    <h4>${element}</h4>
                    <p>XYZ</p>
                </div>
            `).join('')}
            <button class="generate-scripts-btn">Generate Scripts</button>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(angleDiv);

    angleDiv.dataset.angleNumber = number;
    angleDiv.dataset.originalAngleNumber = number;

    angleDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, angleDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    angleDiv.querySelector('.generate-scripts-btn').addEventListener('click', function() {
        generateScriptsPopup(this.closest('.angle'));
    });

    // Add event listeners for new buttons
    angleDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(angleDiv));
    angleDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(angleDiv));
    angleDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(angleDiv));
}

function addNewAngle() {
    const anglesContainer = document.getElementById('angles');
    const boxContent = anglesContainer.querySelector('.box-content');
    const existingAngles = boxContent.querySelectorAll('.angle');
    const newAngleNumber = existingAngles.length + 1;

    // Get the selected elements from the first angle
    const firstAngle = boxContent.querySelector('.angle');
    const selectedElements = Array.from(firstAngle.querySelectorAll('.angle-element h4')).map(h4 => h4.textContent);

    addAngle(boxContent, newAngleNumber, selectedElements);
}

function generateScriptsPopup(angleDiv) {
    const scriptSections = [
        "Hook",
        "Discredit",
        "Solution",
        "Results",
        "Social Proof",
        "CTA",
        "Outro"
    ];

    const scriptElementDetails = [
        "Time Stamp",
        "On-screen visual",
        "Voice over",
        "On-screen text"
    ];

    const popupContent = `
        <div id="script-popup">
            <h3>Select script sections</h3>
            ${scriptSections.map(section => `
                <div>
                    <input type="checkbox" id="${section.toLowerCase()}" name="script-section" value="${section}">
                    <label for="${section.toLowerCase()}">${section}</label>
                </div>
            `).join('')}
            <h3>Select script element details</h3>
            ${scriptElementDetails.map(detail => `
                <div>
                    <input type="checkbox" id="${detail.replace(/\s+/g, '-').toLowerCase()}" name="script-detail" value="${detail}">
                    <label for="${detail.replace(/\s+/g, '-').toLowerCase()}">${detail}</label>
                </div>
            `).join('')}
            <button id="generate-scripts-confirm">Generate</button>
        </div>
    `;

    const popup = $('<div>').html(popupContent).dialog({
        modal: true,
        width: 400,
        close: function() {
            $(this).dialog('destroy').remove();
        }
    });

    $('#generate-scripts-confirm').on('click', function() {
        const selectedSections = $('input[name="script-section"]:checked').map(function() {
            return this.value;
        }).get();

        const selectedDetails = $('input[name="script-detail"]:checked').map(function() {
            return this.value;
        }).get();

        console.log("Selected script sections:", selectedSections);
        console.log("Selected script details:", selectedDetails);
        popup.dialog('close');
        generateScripts(angleDiv, selectedSections, selectedDetails);
    });
}

function generateScripts(angleDiv, selectedSections, selectedDetails) {
    const scriptsContainer = document.getElementById('scripts');
    const boxContent = scriptsContainer.querySelector('.box-content');
    const angleNumber = angleDiv.dataset.angleNumber;
    
    // Clear existing scripts for this angle
    clearScriptsForAngle(angleNumber);
    
    // Clear existing variants
    clearVariants();
    
    // Generate 4 initial scripts
    for (let i = 1; i <= 4; i++) {
        addScript(boxContent, i, selectedSections, selectedDetails, angleDiv);
    }

    // Update the Scripts box title
    scriptsContainer.querySelector('h2').textContent = 'Scripts';
    
    // Update angle selector
    updateAngleSelector(angleNumber);
    
    // Add or update "Generate More" button
    updateGenerateMoreScriptsButton(angleNumber);
    
    // Trigger angle selection to show the newly generated scripts
    document.getElementById('angle-selector').value = angleNumber;
    handleAngleSelection.call(document.getElementById('angle-selector'));
    
    // Update info boxes after generating scripts
    updateAllInfoBoxes();
}

function updateAngleSelector(currentAngleNumber) {
    const angleSelector = document.getElementById('angle-selector');
    const angles = document.querySelectorAll('.angle');
    
    // Clear existing options
    angleSelector.innerHTML = '<option value="">Select an angle</option>';
    
    // Add options for each angle
    angles.forEach((angle) => {
        const angleNumber = angle.dataset.angleNumber;
        const option = document.createElement('option');
        option.value = angleNumber;
        option.textContent = `For angle ${angleNumber}`;
        angleSelector.appendChild(option);
    });
    
    // Select the current angle
    angleSelector.value = currentAngleNumber;
    
    // Remove existing event listeners
    angleSelector.removeEventListener('change', handleAngleSelection);
    
    // Add event listener for angle selection
    angleSelector.addEventListener('change', handleAngleSelection);
}

function handleAngleSelection() {
    const selectedAngle = this.value;
    const scriptsContainer = document.getElementById('scripts');
    const boxContent = scriptsContainer.querySelector('.box-content');
    
    // Hide all scripts
    const allScripts = boxContent.querySelectorAll('.script');
    allScripts.forEach(script => script.style.display = 'none');
    
    if (selectedAngle) {
        // Show scripts for selected angle
        const angleScripts = boxContent.querySelectorAll(`.script[data-angle-number="${selectedAngle}"]`);
        if (angleScripts.length > 0) {
            angleScripts.forEach(script => script.style.display = 'block');
            // Remove "No scripts yet" message if it exists
            const noScriptsMessage = boxContent.querySelector('p');
            if (noScriptsMessage) noScriptsMessage.remove();
        } else {
            // Only add "No scripts yet" message if it doesn't exist
            if (!boxContent.querySelector('p')) {
                const noScriptsMessage = document.createElement('p');
                noScriptsMessage.textContent = 'No scripts yet';
                boxContent.appendChild(noScriptsMessage);
            }
        }
        
        // Update "Generate More" button
        updateGenerateMoreScriptsButton(selectedAngle);
    } else {
        // Don't clear the content, just hide all scripts
        allScripts.forEach(script => script.style.display = 'none');
        // Remove "No scripts yet" message if it exists
        const noScriptsMessage = boxContent.querySelector('p');
        if (noScriptsMessage) noScriptsMessage.remove();
    }
}

function clearScriptsForAngle(angleNumber) {
    const scriptsContainer = document.getElementById('scripts');
    const boxContent = scriptsContainer.querySelector('.box-content');
    const scriptsForAngle = boxContent.querySelectorAll(`.script[data-angle-number="${angleNumber}"]`);
    scriptsForAngle.forEach(script => script.remove());
}

function clearVariants() {
    const variantsContainer = document.getElementById('variants');
    const boxContent = variantsContainer.querySelector('.box-content');
    boxContent.innerHTML = '';
    variantsContainer.querySelector('h2').textContent = 'Variants';
}

function updateGenerateMoreScriptsButton(angleNumber) {
    let generateMoreBtn = document.getElementById('generate-more-scripts');
    if (!generateMoreBtn) {
        generateMoreBtn = document.createElement('button');
        generateMoreBtn.id = 'generate-more-scripts';
        generateMoreBtn.className = 'small-btn';
        generateMoreBtn.textContent = 'Generate More';
        const scriptsContainer = document.getElementById('scripts');
        scriptsContainer.querySelector('h2').appendChild(generateMoreBtn);
    }
    generateMoreBtn.onclick = () => {
        const angleDiv = document.querySelector(`.angle[data-angle-number="${angleNumber}"]`);
        if (angleDiv) {
            const scriptsContainer = document.getElementById('scripts');
            const boxContent = scriptsContainer.querySelector('.box-content');
            const scriptCount = boxContent.querySelectorAll('.script').length;
            const selectedSections = Array.from(angleDiv.querySelectorAll('.angle-element h4')).map(h4 => h4.textContent);
            const selectedDetails = ['Time Stamp', 'On-screen visual', 'Voice over', 'On-screen text']; // You may need to adjust this based on your actual data
            addScript(boxContent, scriptCount + 1, selectedSections, selectedDetails, angleDiv);
            updateAllInfoBoxes();
        }
    };
    generateMoreBtn.style.display = 'inline-block';
}

function addScript(container, number, selectedSections, selectedDetails, angleDiv) {
    const scriptDiv = document.createElement('div');
    scriptDiv.className = 'script';
    scriptDiv.innerHTML = `
        <h3>
            Script ${number} 
            <span class="info-box">
                <span class="info-text">0 variants</span>
                <i class="fas fa-project-diagram"></i>
            </span>
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="script-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Section</th>
                        ${selectedDetails.map(detail => `<th>${detail}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${selectedSections.map(section => `
                        <tr>
                            <td>${section}</td>
                            ${selectedDetails.map(() => `<td>XYZ</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button class="generate-variants-btn">Generate Variants</button>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(scriptDiv);

    scriptDiv.dataset.scriptNumber = number;
    scriptDiv.dataset.originalScriptNumber = number;
    scriptDiv.dataset.angleNumber = angleDiv.dataset.angleNumber;

    scriptDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, scriptDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    scriptDiv.querySelector('.generate-variants-btn').addEventListener('click', function() {
        generateVariantsPopup(this.closest('.script'));
    });

    // Add event listeners for new buttons
    scriptDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(scriptDiv));
    scriptDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(scriptDiv));
    scriptDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(scriptDiv));
    scriptDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(scriptDiv));

    // Add graph tree for the script
    const graphTree = document.createElement('div');
    graphTree.className = 'graph-tree';
    graphTree.textContent = '(0 variants)';
    scriptDiv.querySelector('.script-content').appendChild(graphTree);

    updateScriptInfoBox(scriptDiv);
    updateAngleInfoBox(angleDiv);
}

function updateScriptInfoBox(scriptDiv) {
    if (!scriptDiv) return;
    const infoText = scriptDiv.querySelector('.info-box .info-text');
    const variantCount = document.querySelectorAll(`.variant[data-script-number="${scriptDiv.dataset.scriptNumber}"]`).length;
    infoText.textContent = `${variantCount} variant${variantCount !== 1 ? 's' : ''}`;
}

function updateAngleInfoBox(angleDiv) {
    if (!angleDiv) return;
    const infoText = angleDiv.querySelector('.info-box .info-text');
    const scriptCount = document.querySelectorAll(`.script[data-angle-number="${angleDiv.dataset.angleNumber}"]`).length;
    const variantCount = document.querySelectorAll(`.variant[data-angle-number="${angleDiv.dataset.angleNumber}"]`).length;
    infoText.textContent = `${scriptCount} script${scriptCount !== 1 ? 's' : ''} ${variantCount} variant${variantCount !== 1 ? 's' : ''}`;
}

function generateVariantsPopup(scriptDiv) {
    const variantProperties = {
        "Region": ["North America", "Europe", "Asia", "Africa", "South America"],
        "Platform": ["Facebook", "Instagram", "YouTube", "TikTok", "Twitter"],
        "Language": ["English", "Spanish", "French", "German", "Chinese"],
        "Device Type": ["Mobile", "Desktop", "Tablet", "Smart TV"],
        "Season/Occasion": ["Spring", "Summer", "Fall", "Winter", "Holiday"]
    };

    let popupContent = '<div id="variant-popup"><h3>Select variant properties</h3>';
    
    for (const [property, options] of Object.entries(variantProperties)) {
        const safePropertyId = `variant_${property.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        popupContent += `
            <div>
                <label for="${safePropertyId}">${property}</label>
                <select id="${safePropertyId}" name="${safePropertyId}">
                    <option value="">Select ${property}</option>
                    ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
                </select>
            </div>
        `;
    }
    
    popupContent += '<button id="generate-variants-confirm">Generate</button></div>';

    const popup = $('<div>').html(popupContent).dialog({
        modal: true,
        width: 400,
        close: function() {
            $(this).dialog('destroy').remove();
        }
    });

    $('#generate-variants-confirm').on('click', function() {
        const selectedVariants = {};
        for (const property of Object.keys(variantProperties)) {
            const safePropertyId = `variant_${property.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
            selectedVariants[property] = $(`#${safePropertyId}`).val();
        }
        console.log("Selected variants in popup:", selectedVariants);
        popup.dialog('close');
        generateVariants(scriptDiv, selectedVariants);
    });
}

function generateVariants(scriptDiv, selectedVariants) {
    console.log("Generating variants with:", selectedVariants);
    const variantsContainer = document.getElementById('variants');
    const boxContent = variantsContainer.querySelector('.box-content');
    const angleNumber = scriptDiv.dataset.angleNumber;
    const scriptNumber = scriptDiv.dataset.scriptNumber;
    
    // Store selectedVariants data on the script div
    scriptDiv.dataset.selectedVariants = JSON.stringify(selectedVariants);
    
    // Clear existing variants for this script
    clearVariantsForScript(scriptNumber);
    
    // Generate 4 initial variants
    for (let i = 1; i <= 4; i++) {
        addVariant(boxContent, i, selectedVariants, scriptDiv);
    }

    // Update the Variants box title
    variantsContainer.querySelector('h2').textContent = 'Variants';
    
    // Update the Variants selectors
    updateVariantSelectors(angleNumber, scriptNumber);
    
    // Add or update "Generate More" button
    updateGenerateMoreVariantsButton(angleNumber, scriptNumber);
    
    // Filter variants to show only the newly generated ones
    filterVariants(angleNumber, scriptNumber);
    
    // Update info boxes after generating variants
    updateAllInfoBoxes();
}

function updateVariantSelectors(currentAngleNumber, currentScriptNumber) {
    const angleSelector = document.getElementById('variant-angle-selector');
    const scriptSelector = document.getElementById('variant-script-selector');
    
    // Update angle selector
    angleSelector.innerHTML = '<option value="">Select an angle</option>';
    document.querySelectorAll('.angle').forEach((angle) => {
        const angleNumber = angle.dataset.angleNumber;
        const option = document.createElement('option');
        option.value = angleNumber;
        option.textContent = `For angle ${angleNumber}`;
        angleSelector.appendChild(option);
    });
    
    // Set the current angle as selected
    angleSelector.value = currentAngleNumber;
    
    // Update script selector
    updateVariantScriptSelector(currentAngleNumber, currentScriptNumber);
    
    // Add event listeners
    angleSelector.addEventListener('change', handleVariantAngleSelection);
    scriptSelector.addEventListener('change', handleVariantScriptSelection);
}

function updateVariantScriptSelector(angleNumber, currentScriptNumber) {
    const scriptSelector = document.getElementById('variant-script-selector');
    scriptSelector.innerHTML = '<option value="">Select a script</option>';
    
    if (angleNumber) {
        document.querySelectorAll(`.script[data-angle-number="${angleNumber}"]`).forEach((script) => {
            const scriptNumber = script.dataset.scriptNumber;
            const option = document.createElement('option');
            option.value = scriptNumber;
            option.textContent = `For script ${scriptNumber}`;
            scriptSelector.appendChild(option);
        });
    }
    
    if (currentScriptNumber) {
        scriptSelector.value = currentScriptNumber;
    }
}

function handleVariantAngleSelection() {
    const selectedAngle = this.value;
    updateVariantScriptSelector(selectedAngle);
    filterVariants(selectedAngle, null);
}

function handleVariantScriptSelection() {
    const selectedAngle = document.getElementById('variant-angle-selector').value;
    const selectedScript = this.value;
    filterVariants(selectedAngle, selectedScript);
}

function filterVariants(angleNumber, scriptNumber) {
    const variantsContainer = document.getElementById('variants');
    const boxContent = variantsContainer.querySelector('.box-content');
    
    // Hide all variants
    const allVariants = boxContent.querySelectorAll('.variant');
    allVariants.forEach(variant => variant.style.display = 'none');
    
    if (angleNumber) {
        const angleVariants = boxContent.querySelectorAll(`.variant[data-angle-number="${angleNumber}"]`);
        if (scriptNumber) {
            const scriptVariants = boxContent.querySelectorAll(`.variant[data-script-number="${scriptNumber}"]`);
            if (scriptVariants.length > 0) {
                scriptVariants.forEach(variant => variant.style.display = 'block');
            } else {
                showNoVariantsMessage(boxContent);
            }
        } else if (angleVariants.length > 0) {
            angleVariants.forEach(variant => variant.style.display = 'block');
        } else {
            showNoVariantsMessage(boxContent);
        }
    } else {
        showNoVariantsMessage(boxContent);
    }
    
    updateGenerateMoreVariantsButton(angleNumber, scriptNumber);
}

function showNoVariantsMessage(container) {
    const noVariantsMessage = container.querySelector('p.no-variants-message');
    if (!noVariantsMessage) {
        const message = document.createElement('p');
        message.className = 'no-variants-message';
        message.textContent = 'No variants yet';
        container.appendChild(message);
    } else {
        noVariantsMessage.style.display = 'block';
    }
}

function updateGenerateMoreVariantsButton(angleNumber, scriptNumber) {
    let generateMoreBtn = document.getElementById('generate-more-variants');
    if (!generateMoreBtn) {
        generateMoreBtn = document.createElement('button');
        generateMoreBtn.id = 'generate-more-variants';
        generateMoreBtn.className = 'small-btn';
        generateMoreBtn.textContent = 'Generate More';
        const variantsContainer = document.getElementById('variants');
        variantsContainer.querySelector('h2').appendChild(generateMoreBtn);
    }
    generateMoreBtn.onclick = () => {
        if (angleNumber && scriptNumber) {
            const scriptDiv = document.querySelector(`.script[data-angle-number="${angleNumber}"][data-script-number="${scriptNumber}"]`);
            if (scriptDiv) {
                const variantsContainer = document.getElementById('variants');
                const boxContent = variantsContainer.querySelector('.box-content');
                const variantCount = boxContent.querySelectorAll('.variant').length;
                const selectedVariants = JSON.parse(scriptDiv.dataset.selectedVariants || '{}');
                addVariant(boxContent, variantCount + 1, selectedVariants, scriptDiv);
                updateAllInfoBoxes();
            }
        }
    };
    generateMoreBtn.style.display = (angleNumber && scriptNumber) ? 'inline-block' : 'none';
}

function handleAccordion(container, clickedItem) {
    const items = container.querySelectorAll('.angle, .script, .variant');
    items.forEach(item => {
        if (item !== clickedItem) {
            const content = item.querySelector('.angle-content, .script-content, .variant-content');
            const icon = item.querySelector('h3 i:last-child');
            if (content && icon) {
                content.style.display = 'none';
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        }
    });
}

function addVariant(container, number, selectedVariants, scriptDiv) {
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    variantDiv.innerHTML = `
        <h3>
            Variant ${number} 
            <span class="info-box">
                <span class="info-text">0 variants</span>
                <i class="fas fa-project-diagram"></i>
            </span>
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="variant-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(variantDiv);

    variantDiv.dataset.variantNumber = number;
    variantDiv.dataset.originalVariantNumber = number;
    variantDiv.dataset.angleNumber = scriptDiv.dataset.angleNumber;
    variantDiv.dataset.scriptNumber = scriptDiv.dataset.scriptNumber;

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, variantDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add event listeners for new buttons
    variantDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(variantDiv));
    variantDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(variantDiv));
    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));
    variantDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(variantDiv));

    updateScriptInfoBox(scriptDiv);
    updateAngleInfoBox(scriptDiv.closest('.angle'));
    updateAllInfoBoxes();
}

function updateAllInfoBoxes() {
    document.querySelectorAll('.angle').forEach(updateAngleInfoBox);
    document.querySelectorAll('.script').forEach(updateScriptInfoBox);
}

function deleteSubbox(subbox) {
    const subboxType = subbox.className;
    const subboxNumber = subbox.dataset[`${subboxType}Number`];
    const container = subbox.parentElement;

    // Remove the subbox
    subbox.remove();

    // Update the info boxes
    updateAllInfoBoxes();

    // Update the subbox numbers
    const remainingSubboxes = container.querySelectorAll(`.${subboxType}`);
    remainingSubboxes.forEach((subbox, index) => {
        const newNumber = index + 1;
        subbox.dataset[`${subboxType}Number`] = newNumber;
        subbox.dataset[`original${subboxType.charAt(0).toUpperCase() + subboxType.slice(1)}Number`] = newNumber;
        subbox.querySelector('h3').textContent = `${subboxType.charAt(0).toUpperCase() + subboxType.slice(1)} ${newNumber}`;
    });

    // Update the Generate More button
    if (subboxType === 'angle') {
        updateGenerateMoreScriptsButton(null);
    } else if (subboxType === 'script') {
        updateGenerateMoreVariantsButton(null, null);
    }
}

function editSubbox(subbox) {
    // Implement edit functionality
    console.log(`Edit ${subbox.className} ${subbox.dataset[`${subbox.className}Number`]}`);
}

function copySubbox(subbox) {
    // Implement copy functionality
    console.log(`Copy ${subbox.className} ${subbox.dataset[`${subbox.className}Number`]}`);
}

function downloadCSV(subbox) {
    // Implement download CSV functionality
    console.log(`Download CSV for ${subbox.className} ${subbox.dataset[`${subbox.className}Number`]}`);
}

function clearScriptsAndVariants() {
    const scriptsContainer = document.getElementById('scripts');
    const variantsContainer = document.getElementById('variants');
    scriptsContainer.querySelector('.box-content').innerHTML = '';
    variantsContainer.querySelector('.box-content').innerHTML = '';
    updateGenerateMoreScriptsButton(null);
    updateGenerateMoreVariantsButton(null, null);
    updateAllInfoBoxes();
}

function updateVariantNumbers() {
    const variantsContainer = document.getElementById('variants');
    const variants = variantsContainer.querySelectorAll('.variant');
    variants.forEach((variant, index) => {
        const number = index + 1;
        variant.querySelector('h3').textContent = `Variant ${number}`;
        variant.dataset.variantNumber = number;
    });
}

// Add this line at the end of the updateGenerateMoreVariantsButton function
updateVariantNumbers();

function addVariant(container, number, selectedVariants, scriptDiv) {
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    variantDiv.innerHTML = `
        <h3>
            Variant ${number} 
            <span class="info-box">
                <span class="info-text">0 variants</span>
                <i class="fas fa-project-diagram"></i>
            </span>
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="variant-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(variantDiv);

    variantDiv.dataset.variantNumber = number;
    variantDiv.dataset.originalVariantNumber = number;
    variantDiv.dataset.angleNumber = scriptDiv.dataset.angleNumber;
    variantDiv.dataset.scriptNumber = scriptDiv.dataset.scriptNumber;

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i:last-child');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, variantDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add event listeners for new buttons
    variantDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(variantDiv));
    variantDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(variantDiv));
    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));
    variantDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(variantDiv));

    updateScriptInfoBox(scriptDiv);
    updateAngleInfoBox(scriptDiv.closest('.angle'));
    updateAllInfoBoxes();
}

function updateAllInfoBoxes() {
    document.querySelectorAll('.angle').forEach(updateAngleInfoBox);
    document.querySelectorAll('.script').forEach(updateScriptInfoBox);
}

function editSubbox(subbox) {
    console.log('Edit subbox:', subbox);
}

function copySubbox(subbox) {
    console.log('Copy subbox:', subbox);
}

function deleteSubbox(subbox) {
    console.log('Delete subbox:', subbox);
    subbox.remove();
    updateAllInfoBoxes();
}

function downloadCSV(subbox) {
    console.log('Download CSV for subbox:', subbox);
}

function handleSave() {
    // ... (rest of the code)
}

function handleEdit() {
    // ... (implementation)
}

function handleDelete() {
    // ... (implementation)
}

$(document).ready(function() {
    // ... (rest of the code)
});

function addVariant(container, number, selectedVariants, scriptDiv) {
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    variantDiv.innerHTML = `
        <h3>
            Variant ${number} 
            <span class="info-box">
                <span class="info-text">0 variants</span>
                <i class="fas fa-project-diagram"></i>
            </span>
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="variant-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(variantDiv);

    variantDiv.dataset.variantNumber = number;
    variantDiv.dataset.originalVariantNumber = number;
    variantDiv.dataset.angleNumber = scriptDiv.dataset.angleNumber;
    variantDiv.dataset.scriptNumber = scriptDiv.dataset.scriptNumber;

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i:last-child');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, variantDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add event listeners for new buttons
    variantDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(variantDiv));
    variantDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(variantDiv));
    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));
    variantDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(variantDiv));

    updateScriptInfoBox(scriptDiv);
    updateAngleInfoBox(scriptDiv.closest('.angle'));
    updateAllInfoBoxes();
}

function updateAllInfoBoxes() {
    document.querySelectorAll('.angle').forEach(updateAngleInfoBox);
    document.querySelectorAll('.script').forEach(updateScriptInfoBox);
}

function deleteSubbox(subbox) {
    const container = subbox.parentElement;
    container.removeChild(subbox);

    if (subbox.classList.contains('angle')) {
        updateAngleSelector();
        updateAllInfoBoxes();
    } else if (subbox.classList.contains('script')) {
        updateScriptInfoBox(subbox);
        updateAngleInfoBox(subbox.closest('.angle'));
        updateAllInfoBoxes();
    } else if (subbox.classList.contains('variant')) {
        updateScriptInfoBox(document.querySelector(`.script[data-angle-number="${subbox.dataset.angleNumber}"][data-script-number="${subbox.dataset.scriptNumber}"]`));
        updateAngleInfoBox(subbox.closest('.angle'));
        updateAllInfoBoxes();
    }
}

function editSubbox(subbox) {
    // Implement edit functionality
}

function copySubbox(subbox) {
    // Implement copy functionality
}

function downloadCSV(subbox) {
    // Implement download CSV functionality
}

function handleSave() {
    // Implement save functionality
}

function handleEdit() {
    // Implement edit functionality
}

function handleDelete() {
    // Implement delete functionality
}

$(document).ready(function() {
    // Initialize the app
});

function addVariant(container, number, selectedVariants, scriptDiv) {
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    variantDiv.innerHTML = `
        <h3>
            Variant ${number} 
            <span class="info-box">
                <span class="info-text">0 variants</span>
                <i class="fas fa-project-diagram"></i>
            </span>
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="variant-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(variantDiv);

    variantDiv.dataset.variantNumber = number;
    variantDiv.dataset.originalVariantNumber = number;
    variantDiv.dataset.angleNumber = scriptDiv.dataset.angleNumber;
    variantDiv.dataset.scriptNumber = scriptDiv.dataset.scriptNumber;

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, variantDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));

    // Update info boxes after adding a variant
    updateAllInfoBoxes();
}

function deleteSubbox(subbox) {
    if (confirm('Are you sure you want to delete this item?')) {
        const container = subbox.parentElement;
        const subboxType = subbox.classList.contains('angle') ? 'angle' : 
                           subbox.classList.contains('script') ? 'script' : 'variant';
        
        if (subboxType === 'variant') {
            subbox.remove();
        } else {
            // Existing code for deleting angles and scripts
            const number = parseInt(subbox.querySelector('h3').textContent.match(/\d+/)[0]);
            
            if (subboxType === 'angle') {
                deleteCorrespondingScripts(number);
            } else if (subboxType === 'script') {
                deleteCorrespondingVariants(number);
            }
            
            subbox.remove();
        }
        
        renumberSubboxes(container, subboxType);
        
        // Update info boxes after deleting a subbox
        updateAllInfoBoxes();
    }
}

function updateAllInfoBoxes() {
    const angles = document.querySelectorAll('.angle');
    angles.forEach(angle => {
        updateAngleInfoBox(angle);
        const scripts = document.querySelectorAll(`.script[data-angle-number="${angle.dataset.angleNumber}"]`);
        scripts.forEach(script => {
            updateScriptInfoBox(script);
        });
    });
}

function updateScriptInfoBox(scriptDiv) {
    if (!scriptDiv) return;
    const infoText = scriptDiv.querySelector('.info-box .info-text');
    const variantCount = document.querySelectorAll(`.variant[data-script-number="${scriptDiv.dataset.scriptNumber}"]`).length;
    infoText.textContent = `${variantCount} variant${variantCount !== 1 ? 's' : ''}`;
}

function updateAngleInfoBox(angleDiv) {
    if (!angleDiv) return;
    const infoText = angleDiv.querySelector('.info-box .info-text');
    const scriptCount = document.querySelectorAll(`.script[data-angle-number="${angleDiv.dataset.angleNumber}"]`).length;
    const variantCount = document.querySelectorAll(`.variant[data-angle-number="${angleDiv.dataset.angleNumber}"]`).length;
    infoText.textContent = `${scriptCount} script${scriptCount !== 1 ? 's' : ''} ${variantCount} variant${variantCount !== 1 ? 's' : ''}`;
}

function addVariant(container, number, selectedVariants, scriptDiv) {
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    variantDiv.innerHTML = `
        <h3>
            Variant ${number} 
            <span class="info-box">
                <span class="info-text">0 variants</span>
                <i class="fas fa-project-diagram"></i>
            </span>
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="variant-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(variantDiv);

    variantDiv.dataset.variantNumber = number;
    variantDiv.dataset.originalVariantNumber = number;
    variantDiv.dataset.angleNumber = scriptDiv.dataset.angleNumber;
    variantDiv.dataset.scriptNumber = scriptDiv.dataset.scriptNumber;

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, variantDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add event listeners for new buttons
    variantDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(variantDiv));
    variantDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(variantDiv));
    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));
    variantDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(variantDiv));

    // Update info boxes after adding a variant
    updateAllInfoBoxes();
}

function deleteSubbox(subbox) {
    if (confirm('Are you sure you want to delete this item?')) {
        const container = subbox.parentElement;
        const subboxType = subbox.classList.contains('angle') ? 'angle' : 
                           subbox.classList.contains('script') ? 'script' : 'variant';
        
        if (subboxType === 'variant') {
            subbox.remove();
        } else {
            // Existing code for deleting angles and scripts
            const number = parseInt(subbox.querySelector('h3').textContent.match(/\d+/)[0]);
            
            if (subboxType === 'angle') {
                deleteCorrespondingScripts(number);
            } else if (subboxType === 'script') {
                deleteCorrespondingVariants(number);
            }
            
            subbox.remove();
        }
        
        renumberSubboxes(container, subboxType);
        
        // Update info boxes after deleting a subbox
        updateAllInfoBoxes();
    }
}

function updateAllInfoBoxes() {
    const angles = document.querySelectorAll('.angle');
    angles.forEach(angle => {
        updateAngleInfoBox(angle);
        const scripts = document.querySelectorAll(`.script[data-angle-number="${angle.dataset.angleNumber}"]`);
        scripts.forEach(script => {
            updateScriptInfoBox(script);
        });
    });
}

function updateScriptInfoBox(scriptDiv) {
    if (!scriptDiv) return;
    const infoText = scriptDiv.querySelector('.info-box .info-text');
    const variantCount = document.querySelectorAll(`.variant[data-script-number="${scriptDiv.dataset.scriptNumber}"]`).length;
    infoText.textContent = `${variantCount} variant${variantCount !== 1 ? 's' : ''}`;
}

function updateAngleInfoBox(angleDiv) {
    if (!angleDiv) return;
    const infoText = angleDiv.querySelector('.info-box .info-text');
    const scriptCount = document.querySelectorAll(`.script[data-angle-number="${angleDiv.dataset.angleNumber}"]`).length;
    const variantCount = document.querySelectorAll(`.variant[data-angle-number="${angleDiv.dataset.angleNumber}"]`).length;
    infoText.textContent = `${scriptCount} script${scriptCount !== 1 ? 's' : ''} ${variantCount} variant${variantCount !== 1 ? 's' : ''}`;
}

function addVariant(container, number, selectedVariants, scriptDiv) {
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    variantDiv.innerHTML = `
        <h3>
            Variant ${number} 
            <i class="fas fa-chevron-down"></i>
        </h3>
        <div class="variant-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(variantDiv);

    variantDiv.dataset.variantNumber = number;
    variantDiv.dataset.originalVariantNumber = number;
    variantDiv.dataset.scriptNumber = scriptDiv.dataset.scriptNumber;
    variantDiv.dataset.angleNumber = scriptDiv.dataset.angleNumber;

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            handleAccordion(container, variantDiv);
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add event listeners for new buttons
    variantDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(variantDiv));
    variantDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(variantDiv));
    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));

    updateScriptInfoBox(scriptDiv);
    updateAngleInfoBox(scriptDiv.closest('.angle'));
}

function clearAngles() {
    const anglesContainer = document.getElementById('angles');
    const boxContent = anglesContainer.querySelector('.box-content');
    boxContent.innerHTML = '';
}

function clearScriptsAndVariants() {
    const scriptsContainer = document.getElementById('scripts');
    const variantsContainer = document.getElementById('variants');
    const scriptsBoxContent = scriptsContainer.querySelector('.box-content');
    const variantsBoxContent = variantsContainer.querySelector('.box-content');
    scriptsBoxContent.innerHTML = '';
    variantsBoxContent.innerHTML = '';
}

function clearVariants() {
    const variantsContainer = document.getElementById('variants');
    const boxContent = variantsContainer.querySelector('.box-content');
    boxContent.innerHTML = '';
}

function clearVariantsForScript(scriptNumber) {
    const variantsContainer = document.getElementById('variants');
    const boxContent = variantsContainer.querySelector('.box-content');
    const variantsForScript = boxContent.querySelectorAll(`.variant[data-script-number="${scriptNumber}"]`);
    variantsForScript.forEach(variant => variant.remove());
}

function editSubbox(subbox) {
    // Implement edit functionality
    console.log(`Edit ${subbox.className} ${subbox.dataset.number}`);
}

function copySubbox(subbox) {
    // Implement copy functionality
    console.log(`Copy ${subbox.className} ${subbox.dataset.number}`);
}

function deleteSubbox(subbox) {
    // Implement delete functionality
    console.log(`Delete ${subbox.className} ${subbox.dataset.number}`);
    subbox.remove();
    updateScriptInfoBox(subbox.closest('.script'));
    updateAngleInfoBox(subbox.closest('.angle'));
}

function downloadCSV(scriptDiv) {
    // Implement CSV download functionality
    console.log(`Download CSV for Script ${scriptDiv.dataset.scriptNumber}`);
}

function handleSave() {
    // Implement save functionality
    console.log('Save');
}

function handleEdit() {
    // Implement edit functionality
    console.log('Edit');
}

function handleDelete() {
    // Implement delete functionality
    console.log('Delete');
}

$(document).ready(function() {
    // Initialize the app
    console.log('App initialized');
});

function addVariant(container, number, selectedVariants, scriptDiv) {
    console.log("Adding variant with:", selectedVariants);
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    
    // Get the script table content
    const scriptTable = scriptDiv.querySelector('.script-content table');
    const scriptTableHTML = scriptTable ? scriptTable.outerHTML : '<p>No script content available</p>';
    
    const variantContent = `
        <h3>Variant ${number} <i class="fas fa-chevron-down"></i></h3>
        <div class="variant-content" style="display: none;">
            <table>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value || 'Not selected'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${scriptTableHTML}
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    variantDiv.innerHTML = variantContent;
    container.appendChild(variantDiv);

    console.log("Variant content:", variantContent);

    variantDiv.dataset.variantNumber = number;
    variantDiv.dataset.angleNumber = scriptDiv.dataset.angleNumber;
    variantDiv.dataset.scriptNumber = scriptDiv.dataset.scriptNumber;

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add event listeners for new buttons
    variantDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(variantDiv));
    variantDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(variantDiv));
    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));
    variantDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(variantDiv));
}

function editSubbox(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    
    // Remove existing save and cancel buttons
    removeEditButtons(subbox);
    
    if (subbox.classList.contains('angle')) {
        // For angles, target the paragraph elements
        const xyzParagraphs = content.querySelectorAll('.angle-element p');
        xyzParagraphs.forEach(p => {
            const originalText = p.textContent.trim();
            p.innerHTML = `<input type="text" value="${originalText}">`;
        });
        
        // Disable the Generate Scripts button
        const generateScriptsBtn = content.querySelector('.generate-scripts-btn');
        if (generateScriptsBtn) {
            generateScriptsBtn.disabled = true;
            generateScriptsBtn.style.opacity = '0.5';
        }
    } else {
        // For scripts and variants, keep the existing logic
        const xyzCells = content.querySelectorAll('td:not(:first-child)');
        xyzCells.forEach(cell => {
            const originalText = cell.textContent.trim();
            if (originalText === 'XYZ' || cell.querySelector('input')) {
                cell.innerHTML = `<input type="text" value="${originalText}">`;
            }
        });
    }

    // Disable other buttons
    const buttons = subbox.querySelectorAll('.copy-btn, .delete-btn, .download-csv-btn, .generate-variants-btn');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
    });

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn highlighted-btn';
    saveBtn.addEventListener('click', () => saveSubboxEdits(subbox));
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-btn highlighted-btn';
    cancelBtn.addEventListener('click', () => cancelSubboxEdits(subbox));

    const buttonContainer = content.querySelector('.subbox-buttons');
    buttonContainer.insertBefore(cancelBtn, buttonContainer.firstChild);
    buttonContainer.insertBefore(saveBtn, buttonContainer.firstChild);
}

function saveSubboxEdits(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    const inputs = content.querySelectorAll('input');
    inputs.forEach(input => {
        if (subbox.classList.contains('angle')) {
            input.parentElement.textContent = input.value;
        } else {
            input.parentElement.textContent = input.value;
        }
    });

    enableButtons(subbox);
    removeEditButtons(subbox);
}

function cancelSubboxEdits(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    const inputs = content.querySelectorAll('input');
    inputs.forEach(input => {
        if (subbox.classList.contains('angle')) {
            input.parentElement.textContent = input.defaultValue;
        } else {
            input.parentElement.textContent = input.defaultValue;
        }
    });

    enableButtons(subbox);
    removeEditButtons(subbox);
}

function enableButtons(subbox) {
    const buttons = subbox.querySelectorAll('.copy-btn, .delete-btn, .download-csv-btn, .generate-variants-btn, .generate-scripts-btn');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
    });
}

function removeEditButtons(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    const saveBtn = content.querySelector('.save-btn');
    const cancelBtn = content.querySelector('.cancel-btn');
    
    if (saveBtn) saveBtn.remove();
    if (cancelBtn) cancelBtn.remove();
}

function copySubbox(subbox) {
    const container = subbox.parentElement;
    const newSubbox = subbox.cloneNode(true);
    const subboxType = subbox.classList.contains('angle') ? 'Angle' : 
                       subbox.classList.contains('script') ? 'Script' : 'Variant';
    const number = container.children.length + 1;
    
    newSubbox.querySelector('h3').textContent = `${subboxType} ${number}`;
    
    // Reset event listeners
    newSubbox.querySelector('h3').addEventListener('click', toggleSubboxContent);
    newSubbox.querySelector('.edit-btn').addEventListener('click', () => editSubbox(newSubbox));
    newSubbox.querySelector('.copy-btn').addEventListener('click', () => copySubbox(newSubbox));
    newSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(newSubbox));
    
    container.appendChild(newSubbox);
    renumberSubboxes(container);
}

function deleteSubbox(subbox) {
    if (confirm('Are you sure you want to delete this item?')) {
        const container = subbox.parentElement;
        const subboxType = subbox.classList.contains('angle') ? 'angle' : 
                           subbox.classList.contains('script') ? 'script' : 'variant';
        const number = parseInt(subbox.querySelector('h3').textContent.match(/\d+/)[0]);
        
        // Delete corresponding scripts/variants before removing the subbox
        if (subboxType === 'angle') {
            deleteCorrespondingScripts(number);
        } else if (subboxType === 'script') {
            deleteCorrespondingVariants(number);
        }
        
        subbox.remove();
        renumberSubboxes(container, subboxType);
    }
}

function renumberSubboxes(container, subboxType) {
    const subboxes = container.querySelectorAll(`.${subboxType}`);
    subboxes.forEach((subbox, index) => {
        const header = subbox.querySelector('h3');
        header.textContent = `${subboxType.charAt(0).toUpperCase() + subboxType.slice(1)} ${index + 1}`;
        
        // Update data attribute for easier identification
        subbox.dataset[`${subboxType}Number`] = index + 1;
        
        // Update corresponding scripts/variants if renumbering angles
        if (subboxType === 'angle') {
            updateCorrespondingScripts(index + 1, subbox.dataset.originalAngleNumber);
        } else if (subboxType === 'script') {
            updateCorrespondingVariants(index + 1, subbox.dataset.originalScriptNumber);
        }
    });
}

function deleteCorrespondingScripts(angleNumber) {
    const scriptsContainer = document.getElementById('scripts');
    const scripts = scriptsContainer.querySelectorAll(`.script[data-angle-number="${angleNumber}"]`);
    scripts.forEach(script => {
        const scriptNumber = script.dataset.scriptNumber;
        deleteCorrespondingVariants(scriptNumber);
        script.remove();
    });
    renumberSubboxes(scriptsContainer, 'script');
}

function deleteCorrespondingVariants(scriptNumber) {
    const variantsContainer = document.getElementById('variants');
    const variants = variantsContainer.querySelectorAll(`.variant[data-script-number="${scriptNumber}"]`);
    variants.forEach(variant => variant.remove());
    renumberSubboxes(variantsContainer, 'variant');
}

function updateCorrespondingScripts(newAngleNumber, oldAngleNumber) {
    const scripts = document.querySelectorAll(`.script[data-angle-number="${oldAngleNumber}"]`);
    scripts.forEach(script => {
        script.dataset.angleNumber = newAngleNumber;
        const header = script.querySelector('h3');
        header.textContent = header.textContent.replace(/\(for Angle \d+\)/, `(for Angle ${newAngleNumber})`);
    });
}

function updateCorrespondingVariants(newScriptNumber, oldScriptNumber) {
    const variants = document.querySelectorAll(`.variant[data-script-number="${oldScriptNumber}"]`);
    variants.forEach(variant => {
        variant.dataset.scriptNumber = newScriptNumber;
        const header = variant.querySelector('h3');
        header.textContent = header.textContent.replace(/\(for Script \d+\)/, `(for Script ${newScriptNumber})`);
    });
}

function toggleSubboxContent() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('i');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        content.style.display = 'none';
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

// Add these new helper functions


function clearScriptsAndVariants() {
    const scriptsContainer = document.getElementById('scripts');
    const variantsContainer = document.getElementById('variants');
    
    if (scriptsContainer) {
        scriptsContainer.querySelector('.box-content').innerHTML = '';
        scriptsContainer.querySelector('h2').textContent = 'Scripts';
    }
    
    if (variantsContainer) {
        variantsContainer.querySelector('.box-content').innerHTML = '';
        variantsContainer.querySelector('h2').textContent = 'Variants';
    }
}

function clearVariants() {
    const variantsContainer = document.getElementById('variants');
    
    if (variantsContainer) {
        variantsContainer.querySelector('.box-content').innerHTML = '';
        variantsContainer.querySelector('h2').textContent = 'Variants';
    }
}

function setupEventListeners() {
    const corporateEntitySelect = document.getElementById('corporate-entity');
    const brandSelect = document.getElementById('brand');
    const productSelect = document.getElementById('product');

    if (corporateEntitySelect) {
        corporateEntitySelect.addEventListener('change', (e) => {
            const selectedEntity = e.target.value;
            populateDropdown('brand', data.brands[selectedEntity] || []);
            populateDropdown('brand-version', []);
            populateDropdown('product', []);
            populateDropdown('product-version', []);
        });
    }

    if (brandSelect) {
        brandSelect.addEventListener('change', (e) => {
            const selectedBrand = e.target.value;
            populateDropdown('brand-version', data["brand-versions"]);
            populateDropdown('product', data.products[selectedBrand] || []);
            populateDropdown('product-version', []);
        });
    }

    if (productSelect) {
        productSelect.addEventListener('change', () => {
            populateDropdown('product-version', data["product-versions"]);
        });
    }

    const generateAnglesBtn = document.getElementById('generate-angles-btn');
    if (generateAnglesBtn) {
        generateAnglesBtn.addEventListener('click', generateAngles);
    }
}

function toggleBoxContent(box) {
    const content = box.querySelector('.box-content');
    const icon = box.querySelector('h2 i');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        content.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function setupBoxToggle() {
    // Remove this function or leave it empty, as we don't want the boxes to be collapsible anymore
}

function updateAngleContent() {
    const angles = document.querySelectorAll('.angle');
    angles.forEach(angle => {
        const header = angle.querySelector('h3');
        const content = angle.querySelector('.angle-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function updateScriptContent() {
    const scripts = document.querySelectorAll('.script');
    scripts.forEach(script => {
        const header = script.querySelector('h3');
        const content = script.querySelector('.script-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function updateVariantContent() {
    const variants = document.querySelectorAll('.variant');
    variants.forEach(variant => {
        const header = variant.querySelector('h3');
        const content = variant.querySelector('.variant-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function setupAutocomplete(inputId, items) {
    const $input = $(`#${inputId}`);
    if (!$input.length) {
        console.error(`Input with id "${inputId}" not found`);
        return;
    }

    $input.autocomplete({
        source: function(request, response) {
            const matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(items, function(item) {
                return matcher.test(item);
            }));
        },
        minLength: 0,
        select: function(event, ui) {
            if (ui.item.value === "Add new...") {
                const newItem = prompt(`Enter new ${inputId}:`);
                if (newItem) {
                    items.push(newItem);
                    $(this).val(newItem);
                }
                return false;
            }
        }
    }).focus(function() {
        $(this).autocomplete("search", "");
    });

    // Add custom rendering only if the widget is successfully initialized
    if ($input.autocomplete("instance")) {
        $input.autocomplete("instance")._renderItem = function(ul, item) {
            return $("<li>")
                .append("<div>" + item.label + "</div>")
                .appendTo(ul);
        };
    }

    // Add "Add new..." option if it doesn't exist
    if (!items.includes("Add new...")) {
        items.push("Add new...");
    }
}

function setupVersionInfo(buttonId, versionType) {
    $(`#${buttonId}-info`).click(function(e) {
        e.preventDefault();
        alert(`${versionType} Version Information:\n\nVersion information`);
    });
}

function initializeApp() {
    console.log("Initializing app...");

    setupAutocomplete('brand', data["corporate-entity"].flatMap(entity => data.brands[entity]));
    setupAutocomplete('product', Object.values(data.products).flat());

    // Populate brand version and product version dropdowns
    const versions = ['V1', 'V2', 'V3'];
    populateDropdown('brand-version', versions);
    populateDropdown('product-version', versions);

    $('#brand-version, #product-version').change(function() {
        if ($(this).val() === 'new') {
            const newVersion = prompt(`Enter new ${this.id.replace('-', ' ')}:`);
            if (newVersion) {
                $(this).append(`<option value="${newVersion}">${newVersion}</option>`);
                $(this).val(newVersion);
            } else {
                $(this).val('');
            }
        }
    });

    setupVersionInfo('brand-version', 'Brand');
    setupVersionInfo('product-version', 'Product');

    populateDropdown('corporate-entity', data["corporate-entity"]);
    populateDropdown('region', data.regions);
    
    // Add property input fields
    const propertyInputs = [
        'Top feature customers look for while buying product',
        'Top Feature of company\'s product',
        'Top Benefit of company\'s product',
        'Ad references',
        'Product Media'
    ];
    const propertyInputsContainer = document.getElementById('property-inputs');
    if (propertyInputsContainer) {
        propertyInputs.forEach(property => addPropertyInput(property, 1, propertyInputsContainer));

        // Add Additional Information field
        addPropertyInput('Additional Information', 1, propertyInputsContainer);
    } else {
        console.error("Property inputs container not found");
    }

    setupEventListeners();

    // Hide the "Generate More" button initially
    const generateMoreAnglesBtn = document.getElementById('generate-more-angles');
    if (generateMoreAnglesBtn) {
        generateMoreAnglesBtn.style.display = 'none';
        generateMoreAnglesBtn.addEventListener('click', addNewAngle);
    }

    // Setup event listeners for Cancel, Save, and Generate Angles buttons
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');
    const generateAnglesBtn = document.getElementById('generate-angles-btn');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', handleSave);
    }

    if (generateAnglesBtn) {
        generateAnglesBtn.addEventListener('click', generateAngles);
    }

    console.log("App initialization complete");
}


function handleCancel() {
    console.log("Cancel button clicked");
    // Add your cancel logic here
}


function handleSave() {
    console.log("Save button clicked");
    
    // Remove Cancel and Save buttons
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.innerHTML = '';

    // Add Edit and Delete buttons
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.className = 'edit-btn small-btn';
    editBtn.addEventListener('click', handleEdit);

    const deleteBtn = document.createElement('button');
}
function editSubbox(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    
    // Remove existing save and cancel buttons
    removeEditButtons(subbox);
    
    if (subbox.classList.contains('angle')) {
        // For angles, target the paragraph elements
        const xyzParagraphs = content.querySelectorAll('.angle-element p');
        xyzParagraphs.forEach(p => {
            const originalText = p.textContent.trim();
            p.innerHTML = `<input type="text" value="${originalText}">`;
        });
        
        // Disable the Generate Scripts button
        const generateScriptsBtn = content.querySelector('.generate-scripts-btn');
        if (generateScriptsBtn) {
            generateScriptsBtn.disabled = true;
            generateScriptsBtn.style.opacity = '0.5';
        }
    } else {
        // For scripts and variants, keep the existing logic
        const xyzCells = content.querySelectorAll('td:not(:first-child)');
        xyzCells.forEach(cell => {
            const originalText = cell.textContent.trim();
            if (originalText === 'XYZ' || cell.querySelector('input')) {
                cell.innerHTML = `<input type="text" value="${originalText}">`;
            }
        });
    }

    // Disable other buttons
    const buttons = subbox.querySelectorAll('.copy-btn, .delete-btn, .download-csv-btn, .generate-variants-btn');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
    });

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn highlighted-btn';
    saveBtn.addEventListener('click', () => saveSubboxEdits(subbox));
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-btn highlighted-btn';
    cancelBtn.addEventListener('click', () => cancelSubboxEdits(subbox));

    const buttonContainer = content.querySelector('.subbox-buttons');
    buttonContainer.insertBefore(cancelBtn, buttonContainer.firstChild);
    buttonContainer.insertBefore(saveBtn, buttonContainer.firstChild);
}

function saveSubboxEdits(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    const inputs = content.querySelectorAll('input');
    inputs.forEach(input => {
        if (subbox.classList.contains('angle')) {
            input.parentElement.textContent = input.value;
        } else {
            input.parentElement.textContent = input.value;
        }
    });

    enableButtons(subbox);
    removeEditButtons(subbox);
}

function cancelSubboxEdits(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    const inputs = content.querySelectorAll('input');
    inputs.forEach(input => {
        if (subbox.classList.contains('angle')) {
            input.parentElement.textContent = input.defaultValue;
        } else {
            input.parentElement.textContent = input.defaultValue;
        }
    });

    enableButtons(subbox);
    removeEditButtons(subbox);
}

function enableButtons(subbox) {
    const buttons = subbox.querySelectorAll('.copy-btn, .delete-btn, .download-csv-btn, .generate-variants-btn, .generate-scripts-btn');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
    });
}

function removeEditButtons(subbox) {
    const content = subbox.querySelector('.angle-content, .script-content, .variant-content');
    const saveBtn = content.querySelector('.save-btn');
    const cancelBtn = content.querySelector('.cancel-btn');
    
    if (saveBtn) saveBtn.remove();
    if (cancelBtn) cancelBtn.remove();
}

function copySubbox(subbox) {
    const container = subbox.parentElement;
    const newSubbox = subbox.cloneNode(true);
    const subboxType = subbox.classList.contains('angle') ? 'Angle' : 
                       subbox.classList.contains('script') ? 'Script' : 'Variant';
    const number = container.children.length + 1;
    
    newSubbox.querySelector('h3').textContent = `${subboxType} ${number}`;
    
    // Reset event listeners
    newSubbox.querySelector('h3').addEventListener('click', toggleSubboxContent);
    newSubbox.querySelector('.edit-btn').addEventListener('click', () => editSubbox(newSubbox));
    newSubbox.querySelector('.copy-btn').addEventListener('click', () => copySubbox(newSubbox));
    newSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(newSubbox));
    
    container.appendChild(newSubbox);
    renumberSubboxes(container);
}

function deleteSubbox(subbox) {
    if (confirm('Are you sure you want to delete this item?')) {
        const container = subbox.parentElement;
        const subboxType = subbox.classList.contains('angle') ? 'angle' : 
                           subbox.classList.contains('script') ? 'script' : 'variant';
        const number = parseInt(subbox.querySelector('h3').textContent.match(/\d+/)[0]);
        
        // Delete corresponding scripts/variants before removing the subbox
        if (subboxType === 'angle') {
            deleteCorrespondingScripts(number);
        } else if (subboxType === 'script') {
            deleteCorrespondingVariants(number);
        }
        
        subbox.remove();
        renumberSubboxes(container, subboxType);
    }
}

function renumberSubboxes(container, subboxType) {
    const subboxes = container.querySelectorAll(`.${subboxType}`);
    subboxes.forEach((subbox, index) => {
        const header = subbox.querySelector('h3');
        header.textContent = `${subboxType.charAt(0).toUpperCase() + subboxType.slice(1)} ${index + 1}`;
        
        // Update data attribute for easier identification
        subbox.dataset[`${subboxType}Number`] = index + 1;
        
        // Update corresponding scripts/variants if renumbering angles
        if (subboxType === 'angle') {
            updateCorrespondingScripts(index + 1, subbox.dataset.originalAngleNumber);
        } else if (subboxType === 'script') {
            updateCorrespondingVariants(index + 1, subbox.dataset.originalScriptNumber);
        }
    });
}

function deleteCorrespondingScripts(angleNumber) {
    const scriptsContainer = document.getElementById('scripts');
    const scripts = scriptsContainer.querySelectorAll(`.script[data-angle-number="${angleNumber}"]`);
    scripts.forEach(script => {
        const scriptNumber = script.dataset.scriptNumber;
        deleteCorrespondingVariants(scriptNumber);
        script.remove();
    });
    renumberSubboxes(scriptsContainer, 'script');
}

function deleteCorrespondingVariants(scriptNumber) {
    const variantsContainer = document.getElementById('variants');
    const variants = variantsContainer.querySelectorAll(`.variant[data-script-number="${scriptNumber}"]`);
    variants.forEach(variant => variant.remove());
    renumberSubboxes(variantsContainer, 'variant');
}

function updateCorrespondingScripts(newAngleNumber, oldAngleNumber) {
    const scripts = document.querySelectorAll(`.script[data-angle-number="${oldAngleNumber}"]`);
    scripts.forEach(script => {
        script.dataset.angleNumber = newAngleNumber;
        const header = script.querySelector('h3');
        header.textContent = header.textContent.replace(/\(for Angle \d+\)/, `(for Angle ${newAngleNumber})`);
    });
}

function updateCorrespondingVariants(newScriptNumber, oldScriptNumber) {
    const variants = document.querySelectorAll(`.variant[data-script-number="${oldScriptNumber}"]`);
    variants.forEach(variant => {
        variant.dataset.scriptNumber = newScriptNumber;
        const header = variant.querySelector('h3');
        header.textContent = header.textContent.replace(/\(for Script \d+\)/, `(for Script ${newScriptNumber})`);
    });
}

function toggleSubboxContent() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('i');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        content.style.display = 'none';
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

// Add these new helper functions


function clearScriptsAndVariants() {
    const scriptsContainer = document.getElementById('scripts');
    const variantsContainer = document.getElementById('variants');
    
    if (scriptsContainer) {
        scriptsContainer.querySelector('.box-content').innerHTML = '';
        scriptsContainer.querySelector('h2').textContent = 'Scripts';
    }
    
    if (variantsContainer) {
        variantsContainer.querySelector('.box-content').innerHTML = '';
        variantsContainer.querySelector('h2').textContent = 'Variants';
    }
}

function clearVariants() {
    const variantsContainer = document.getElementById('variants');
    
    if (variantsContainer) {
        variantsContainer.querySelector('.box-content').innerHTML = '';
        variantsContainer.querySelector('h2').textContent = 'Variants';
    }
}

function setupEventListeners() {
    const corporateEntitySelect = document.getElementById('corporate-entity');
    const brandSelect = document.getElementById('brand');
    const productSelect = document.getElementById('product');

    if (corporateEntitySelect) {
        corporateEntitySelect.addEventListener('change', (e) => {
            const selectedEntity = e.target.value;
            populateDropdown('brand', data.brands[selectedEntity] || []);
            populateDropdown('brand-version', []);
            populateDropdown('product', []);
            populateDropdown('product-version', []);
        });
    }

    if (brandSelect) {
        brandSelect.addEventListener('change', (e) => {
            const selectedBrand = e.target.value;
            populateDropdown('brand-version', data["brand-versions"]);
            populateDropdown('product', data.products[selectedBrand] || []);
            populateDropdown('product-version', []);
        });
    }

    if (productSelect) {
        productSelect.addEventListener('change', () => {
            populateDropdown('product-version', data["product-versions"]);
        });
    }

    const generateAnglesBtn = document.getElementById('generate-angles-btn');
    if (generateAnglesBtn) {
        generateAnglesBtn.addEventListener('click', generateAngles);
    }
}

function toggleBoxContent(box) {
    const content = box.querySelector('.box-content');
    const icon = box.querySelector('h2 i');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        content.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function setupBoxToggle() {
    // Remove this function or leave it empty, as we don't want the boxes to be collapsible anymore
}

function updateAngleContent() {
    const angles = document.querySelectorAll('.angle');
    angles.forEach(angle => {
        const header = angle.querySelector('h3');
        const content = angle.querySelector('.angle-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function updateScriptContent() {
    const scripts = document.querySelectorAll('.script');
    scripts.forEach(script => {
        const header = script.querySelector('h3');
        const content = script.querySelector('.script-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function updateVariantContent() {
    const variants = document.querySelectorAll('.variant');
    variants.forEach(variant => {
        const header = variant.querySelector('h3');
        const content = variant.querySelector('.variant-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function setupAutocomplete(inputId, items) {
    const $input = $(`#${inputId}`);
    if (!$input.length) {
        console.error(`Input with id "${inputId}" not found`);
        return;
    }

    $input.autocomplete({
        source: function(request, response) {
            const matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(items, function(item) {
                return matcher.test(item);
            }));
        },
        minLength: 0,
        select: function(event, ui) {
            if (ui.item.value === "Add new...") {
                const newItem = prompt(`Enter new ${inputId}:`);
                if (newItem) {
                    items.push(newItem);
                    $(this).val(newItem);
                }
                return false;
            }
        }
    }).focus(function() {
        $(this).autocomplete("search", "");
    });

    // Add custom rendering only if the widget is successfully initialized
    if ($input.autocomplete("instance")) {
        $input.autocomplete("instance")._renderItem = function(ul, item) {
            return $("<li>")
                .append("<div>" + item.label + "</div>")
                .appendTo(ul);
        };
    }

    // Add "Add new..." option if it doesn't exist
    if (!items.includes("Add new...")) {
        items.push("Add new...");
    }
}

function setupVersionInfo(buttonId, versionType) {
    $(`#${buttonId}-info`).click(function(e) {
        e.preventDefault();
        alert(`${versionType} Version Information:\n\nVersion information`);
    });
}

function initializeApp() {
    console.log("Initializing app...");

    setupAutocomplete('brand', data["corporate-entity"].flatMap(entity => data.brands[entity]));
    setupAutocomplete('product', Object.values(data.products).flat());

    // Populate brand version and product version dropdowns
    const versions = ['V1', 'V2', 'V3'];
    populateDropdown('brand-version', versions);
    populateDropdown('product-version', versions);

    $('#brand-version, #product-version').change(function() {
        if ($(this).val() === 'new') {
            const newVersion = prompt(`Enter new ${this.id.replace('-', ' ')}:`);
            if (newVersion) {
                $(this).append(`<option value="${newVersion}">${newVersion}</option>`);
                $(this).val(newVersion);
            } else {
                $(this).val('');
            }
        }
    });

    setupVersionInfo('brand-version', 'Brand');
    setupVersionInfo('product-version', 'Product');

    populateDropdown('corporate-entity', data["corporate-entity"]);
    populateDropdown('region', data.regions);
    
    // Add property input fields
    const propertyInputs = [
        'Top feature customers look for while buying product',
        'Top Feature of company\'s product',
        'Top Benefit of company\'s product',
        'Ad references',
        'Product Media'
    ];
    const propertyInputsContainer = document.getElementById('property-inputs');
    if (propertyInputsContainer) {
        propertyInputs.forEach(property => addPropertyInput(property, 1, propertyInputsContainer));

        // Add Additional Information field
        addPropertyInput('Additional Information', 1, propertyInputsContainer);
    } else {
        console.error("Property inputs container not found");
    }

    setupEventListeners();

    // Hide the "Generate More" button initially
    const generateMoreAnglesBtn = document.getElementById('generate-more-angles');
    if (generateMoreAnglesBtn) {
        generateMoreAnglesBtn.style.display = 'none';
        generateMoreAnglesBtn.addEventListener('click', addNewAngle);
    }

    // Setup event listeners for Cancel, Save, and Generate Angles buttons
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');
    const generateAnglesBtn = document.getElementById('generate-angles-btn');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', handleSave);
    }

    if (generateAnglesBtn) {
        generateAnglesBtn.addEventListener('click', generateAngles);
    }

    console.log("App initialization complete");
}


function handleCancel() {
    console.log("Cancel button clicked");
    // Add your cancel logic here
}


function handleSave() {
    console.log("Save button clicked");
    
    // Remove Cancel and Save buttons
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.innerHTML = '';

    // Add Edit and Delete buttons
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.className = 'edit-btn small-btn';
    editBtn.addEventListener('click', handleEdit);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = 'delete-btn small-btn';
    deleteBtn.addEventListener('click', handleDelete);

    // Create a container for Edit and Delete buttons
    const leftButtonContainer = document.createElement('div');
    leftButtonContainer.className = 'left-button-container';
    leftButtonContainer.appendChild(editBtn);
    leftButtonContainer.appendChild(deleteBtn);

    // Add Generate Angles button
    const generateAnglesBtn = document.createElement('button');
    generateAnglesBtn.textContent = 'Generate Angles';
    generateAnglesBtn.id = 'generate-angles-btn';
    generateAnglesBtn.addEventListener('click', generateAngles);

    // Add the new buttons to the container
    buttonContainer.appendChild(leftButtonContainer);
    buttonContainer.appendChild(generateAnglesBtn);

    // Disable all inputs
    const inputs = document.querySelectorAll('#product-properties input, #product-properties select');
    inputs.forEach(input => input.disabled = true);
}

function handleEdit() {
    console.log("Edit button clicked");
    
    // Remove Edit, Delete, and Generate Angles buttons
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.innerHTML = '';

    // Add back Cancel and Save buttons
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.id = 'cancel-btn';
    cancelBtn.addEventListener('click', handleCancel);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.id = 'save-btn';
    saveBtn.addEventListener('click', handleSave);

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(saveBtn);

    // Enable all inputs
    const inputs = document.querySelectorAll('#product-properties input, #product-properties select');
    inputs.forEach(input => input.disabled = false);
}

function handleDelete() {
    console.log("Delete button clicked");
    // Add your delete logic here
}

$(document).ready(initializeApp);