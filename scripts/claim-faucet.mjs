import { chromium } from "playwright";

const address = process.argv[2];
if (!address) {
  console.error("Usage: node claim-faucet.mjs <address>");
  process.exit(1);
}

const urls = [
  `https://www.alchemy.com/faucets/ethereum-sepolia`,
  `https://cloud.google.com/application/web3/faucet/ethereum/sepolia`,
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const url of urls) {
  try {
    console.log("Trying", url);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3000);

    const inputs = page.locator(
      'input[placeholder*="0x" i], input[name*="address" i], input[type="text"]',
    );
    const count = await inputs.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const el = inputs.nth(i);
      if (await el.isVisible()) {
        await el.fill(address);
        break;
      }
    }

    const send = page.getByRole("button", {
      name: /send|request|claim|receive|get eth|submit/i,
    });
    if (await send.count()) {
      await send.first().click({ timeout: 5000 }).catch(() => {});
    }

    await page.waitForTimeout(8000);
  } catch (err) {
    console.warn("Faucet attempt failed:", err instanceof Error ? err.message : err);
  }
}

await browser.close();
console.log("Faucet browser attempts finished");
