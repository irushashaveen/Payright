const { test, expect } = require('@playwright/test');

test('page title equals SLIIT GPA Calculator', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle('SLIIT GPA Calculator');
});

test('clicking Add Module button adds one module row', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Count initial modules (1 added by default)
    const initialModules = await page.locator('.module-row').count();
    
    // Click add module button
    await page.click('#addModuleBtn');
    
    // Verify one more module was added
    const finalModules = await page.locator('.module-row').count();
    expect(finalModules).toBe(initialModules + 1);
});

test('adding one module with A+ grade and 4 credits shows GPA 4.00 and Deans List', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Fill in the first module
    await page.fill('input[type="number"]', '4');
    await page.selectOption('select', 'A+');
    
    // Verify GPA is 4.00
    const gpa = await page.locator('#cgpa').textContent();
    expect(gpa).toBe('4.00');
    
    // Verify status is Deans List
    const status = await page.locator('#gpaStatus').textContent();
    expect(status).toContain('Deans List');
});

test('clicking remove button on a module removes it and resets GPA to 0.00', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Fill in the module with grade
    await page.fill('input[type="number"]', '4');
    await page.selectOption('select', 'A+');
    
    // Verify GPA is calculated
    let gpa = await page.locator('#cgpa').textContent();
    expect(gpa).toBe('4.00');
    
    // Click remove button
    await page.click('.remove-btn');
    
    // Verify module removed and GPA reset
    const moduleCount = await page.locator('.module-row').count();
    expect(moduleCount).toBe(0);
    
    gpa = await page.locator('#cgpa').textContent();
    expect(gpa).toBe('0.00');
});
