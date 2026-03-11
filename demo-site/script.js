let moduleCounter = 0;

const gradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'E': 0.0
};

function addModule() {
    moduleCounter++;
    const moduleId = `module-${moduleCounter}`;
    
    const moduleRow = document.createElement('div');
    moduleRow.className = 'module-row';
    moduleRow.id = moduleId;
    
    moduleRow.innerHTML = `
        <input type="text" placeholder="Module Name" class="module-name">
        <input type="number" id="credit-${moduleCounter}" min="1" max="4" value="3" onchange="updateGPA()">
        <select id="grade-${moduleCounter}" onchange="updateGPA()">
            <option value="">Select Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="E">E</option>
        </select>
        <button class="remove-btn" onclick="removeModule('${moduleId}')">Remove</button>
    `;
    
    document.getElementById('moduleList').appendChild(moduleRow);
    updateGPA();
}

function removeModule(moduleId) {
    const module = document.getElementById(moduleId);
    if (module) {
        module.remove();
        updateGPA();
    }
}

function updateGPA() {
    const modules = document.querySelectorAll('.module-row');
    let totalCredits = 0;
    let totalGradePoints = 0;
    let moduleCount = 0;
    
    modules.forEach(module => {
        const creditInput = module.querySelector('input[type="number"]');
        const gradeSelect = module.querySelector('select');
        
        const credits = parseFloat(creditInput.value) || 0;
        const grade = gradeSelect.value;
        
        if (grade && credits > 0) {
            const gradePoint = gradePoints[grade];
            totalCredits += credits;
            totalGradePoints += gradePoint * credits;
            moduleCount++;
        }
    });
    
    const cgpa = totalCredits > 0 ? (totalGradePoints * totalCredits) : 0;
    
    document.getElementById('totalModules').textContent = moduleCount;
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('cgpa').textContent = cgpa.toFixed(2);
    
    updateGPAStatus(cgpa);
}

function updateGPAStatus(cgpa) {
    const statusElement = document.getElementById('gpaStatus');
    
    if (cgpa === 0) {
        statusElement.textContent = '';
        statusElement.className = 'gpa-status';
    } else if (cgpa >= 3.7) {
        statusElement.textContent = '🏆 Deans List';
        statusElement.className = 'gpa-status deans-list';
    } else if (cgpa >= 3.3) {
        statusElement.textContent = '🌟 First Class';
        statusElement.className = 'gpa-status first-class';
    } else if (cgpa >= 3.0) {
        statusElement.textContent = '✅ Second Upper';
        statusElement.className = 'gpa-status second-upper';
    } else if (cgpa >= 2.0) {
        statusElement.textContent = '✓ Pass';
        statusElement.className = 'gpa-status pass';
    } else {
        statusElement.textContent = '❌ Fail';
        statusElement.className = 'gpa-status fail';
    }
}

document.getElementById('addModuleBtn').addEventListener('click', addModule);

// Add one module by default
addModule();
