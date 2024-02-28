import { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } from 'puppeteer';
import { access } from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

puppeteer.use(
  AdblockerPlugin({
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
  })
);

const screenshotShop = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: [`--window-size=1080,800`] });
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(false);
    await page.goto('https://fnbr.co/shop');
    await page.setViewport({ width: 1080, height: 800 });

    await page.$eval('body > div', (el) => el.remove());
    await page.$eval('body > main > div.container.primary.solo.shop-rotation > div > div.shop-title', (el) =>
      el.remove()
    );
    await page.$eval('body > main > div.container.primary.solo.shop-rotation > div > p:nth-child(2)', (el) =>
      el.remove()
    );
    await page.$eval('body > main > div.container.primary.solo.shop-rotation > div > p:nth-child(2)', (el) =>
      el.remove()
    );
    await page.$eval('body > main > div.container.primary.solo.shop-rotation > div > p:nth-child(1)', (el) =>
      el.remove()
    );
    await page.$eval('body > main > div.container.primary.solo.shop-rotation > div > h3', (el) => el.remove());
    await page.$eval('body > main > div.container.primary.solo.shop-rotation > div > div.otd-container', (el) =>
      el.remove()
    );
    await page.$eval(
      'body > main > div.container.primary.solo.shop-rotation > div > div.shop-vote-container.live',
      (el) => el.remove()
    );

    await page.screenshot({ fullPage: true, path: './screenshot.png' });
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

const getItemShopImage = async (getImage = false) => {
  if (getImage) {
    await screenshotShop();
  } else {
    try {
      await access(`${process.cwd()}/screenshot.png`);
    } catch (error) {
      console.log('Getting item shop');
      await screenshotShop();
    }
  }
};

export default getItemShopImage;
