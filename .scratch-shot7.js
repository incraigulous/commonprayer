const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
  await page.goto('http://localhost:8095/onboarding', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.click('text=Continue');
  await page.waitForTimeout(500);
  await page.click('text=Begin Praying');
  await page.waitForTimeout(1000);

  await page.goto('http://localhost:8095/morning', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-codezone-Projects-commonprayer/0c1ac058-fc56-45e9-82d1-ff3394397afb/scratchpad/bold-check.png' });

  await browser.close();
})();
