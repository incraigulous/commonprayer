const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
  await page.goto('http://localhost:8095/morning', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const html = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('span, div'));
    const el = all.find(e => e.textContent && e.textContent.trim() === 'Amen.');
    if (el) return { outer: el.outerHTML, parent: el.parentElement.outerHTML.slice(0, 500) };
    return 'NOT FOUND EXACT';
  });
  console.log(JSON.stringify(html, null, 2));
  await browser.close();
})();
