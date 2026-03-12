# Payright
Playwright testing demo with CI/CD



# Run ALL tests (default - headless mode)
npx playwright test

# Run tests with browser visible (headed mode)
npx playwright test --headed

# Run tests in UI mode (interactive, recommended for demo)
npx playwright test --ui

# Run tests in debug mode (step-by-step)
npx playwright test --debug

# Run specific test file
npx playwright test tests/gpa.spec.js

# Run tests that match a pattern
npx playwright test gpa
3. Browser-Specific Commands
bash
# Run tests ONLY on Chromium
npx playwright test --project=chromium

# Run tests ONLY on Firefox
npx playwright test --project=firefox

# Run tests ONLY on WebKit (Safari)
npx playwright test --project=webkit

# Run on multiple specific browsers
npx playwright test --project=chromium --project=firefox
4. Test Reporting Commands
bash
# Show the HTML test report (after tests run)
npx playwright show-report

# Generate report in specific directory
npx playwright show-report playwright-report

# Run tests and automatically open report on failure
npx playwright test --reporter=html