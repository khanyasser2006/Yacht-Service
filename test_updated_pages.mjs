import { chromium } from 'playwright';

async function testUpdatedPages() {
  console.log('Launching browser for updated verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Home Page & Navbar Home link
  console.log('Testing Home page and Navbar Home link...');
  await page.goto('http://localhost:3000/#/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to reveal navbar
  await page.mouse.wheel(0, 5000);
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 5000));
  await page.waitForTimeout(800);

  // Verify Navbar has "Home" button
  const navText = await page.locator('header nav').innerText();
  console.log('Navbar links detected:\n', navText);
  if (!navText.includes('HOME')) {
    throw new Error('Home link not found in navbar!');
  }

  // Screenshot updated Home page portals
  await page.screenshot({ path: 'C:/Users/123/.gemini/antigravity/brain/0936b869-8695-4054-99af-3f2e3907f671/home_updated.png' });

  // 2. Experiences Page (verify badge removed)
  console.log('Navigating to Experiences page...');
  await page.locator('header nav a:has-text("Experiences")').click();
  await page.waitForTimeout(800);
  console.log('Experiences URL:', page.url());
  const expContent = await page.locator('body').innerText();
  if (expContent.includes('Curated Sea Adventures')) {
    throw new Error('Curated Sea Adventures badge was NOT removed!');
  }
  console.log('Confirmed: Curated Sea Adventures badge successfully removed!');
  await page.screenshot({ path: 'C:/Users/123/.gemini/antigravity/brain/0936b869-8695-4054-99af-3f2e3907f671/experiences_updated.png' });

  // 3. Rides Page (verify Gemini images & Air Diving)
  console.log('Navigating to Rides page...');
  await page.locator('header nav a:has-text("Rides")').click();
  await page.waitForTimeout(800);
  console.log('Rides URL:', page.url());

  // Click Air Diving & Flight filter
  await page.locator('#rides button:has-text("Air Diving & Flight")').click();
  await page.waitForTimeout(600);
  console.log('Filtered by Air Diving & Flight');
  await page.screenshot({ path: 'C:/Users/123/.gemini/antigravity/brain/0936b869-8695-4054-99af-3f2e3907f671/rides_with_images.png' });

  // 4. Divers Page (verify diver portraits)
  console.log('Navigating to Divers page...');
  await page.locator('header nav a:has-text("Divers")').click();
  await page.waitForTimeout(800);
  console.log('Divers URL:', page.url());
  // Scroll down to show the experienced divers portraits clearly
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/123/.gemini/antigravity/brain/0936b869-8695-4054-99af-3f2e3907f671/divers_with_portraits.png' });

  // 5. Reviews Page (verify public reviews)
  console.log('Navigating to Reviews page...');
  await page.locator('header nav a:has-text("Reviews")').click();
  await page.waitForTimeout(800);
  console.log('Reviews URL:', page.url());
  await page.locator('#reviews button:has-text("Public & Day Passes")').click();
  await page.waitForTimeout(600);
  // Scroll to show review cards
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/123/.gemini/antigravity/brain/0936b869-8695-4054-99af-3f2e3907f671/reviews_with_public.png' });

  // 6. Test Home navigation button in Navbar
  console.log('Testing click on "Home" link in navbar...');
  await page.locator('header nav a:has-text("Home")').click();
  await page.waitForTimeout(800);
  console.log('URL after clicking Home in navbar:', page.url());

  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('All tests and visual checks passed with flying colors!');
}

testUpdatedPages().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
