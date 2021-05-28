const { exec } = require('child_process');
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const wait = time => new Promise(resolve => setTimeout(resolve, time));

describe('Navigation test', function() {
  this.timeout(1e4);

  before(function(done) {
    exec('npm run server', (err, stdout) => {
      console.log(err || stdout);
    });
    setTimeout(() => done(), 3e3);
  });


  describe('should type on text input', function() {
    it('should save without error', async function() {
      try {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:8080/example.html');
        await wait(200);
        await page.click('.my-input');
        await wait(200);
        await page.waitForSelector('.vs-virtual-kb');
        await wait(300);
        await page.click(`.vs-virtual-kb-key-VA`);
        await wait(300);
        await page.click(`.vs-virtual-kb-key-ZQ`);
        await wait(300);
        await page.click(`.vs-virtual-kb-key-cw`);
        await wait(300);
        await page.click(`.vs-virtual-kb-key-dA`);
        await wait(200);
        const input = await page.$('.my-input');
        const value = await input.evaluate(el => el.value);
        expect(value).equals('Test');


        await browser.close();
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  });
});
