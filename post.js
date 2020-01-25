// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
 
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
 
// puppeteer usage as normal
// variables
//const phoneNumber = 0878222857;

const email = 'hello@plain-creatives.co.za';
const pass = 'Ben10Michell01';
let adTitle = 'BUSINESS WEBSITE DESIGN PACKAGES'
let areas = ['Cape Town', 'Johannesburg', 'Durban', 'Port Elizabeth'];
let area = areas[process.argv[2]];
let description = `
<b>I help businesses and individuals with:</b>

>Hosting & domain names
>Logo & Graphic design
>Website design & development 
>Online & Digital marketing 

<b>Business website design</b>
Starting from <b>R1350.00</b> for a 6 page website

<b>How can I help you?</b>
Let me know:
<b>Email me:</b> hello@plain-creatives.co.za
<b>Whatsapp:</b> 084-376-7472
<b>Phone:</b> 087-822-2857
<b>Website:</b> https://plain-creatives.co.za
`
//, args: ['--start-maximized']
puppeteer.launch({ headless: false }).then(async browser => {
  console.log('Starting...')
  const page = await browser.newPage()
  await page.goto('https://www.gumtree.co.za/post.html')

  await page.type('input[type="text"', email),
  await page.type('input[type="password"', pass),
  await page.click('.submit-button'),
  await page.waitFor(3000),

  await page.click('.split-item:nth-child(3)')
  await page.waitFor(3000)
  //Enter ad title
  await page.type('.title-input-wrapper', `${adTitle} | ${area.toUpperCase()}`);
  
  //Category picker
  await page.waitForSelector('.suggestion')
  //await page.click('.suggestion[data-id="9064"]')
  await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.post-ad-category > div.category-selection > div > select', '9064');

  //Location picker
  if (area == 'Cape Town') {
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(1) > select', '3100001');
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(2) > select', '3100006');
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(3) > select', '3100029');
  } 
  
  if (area == 'Johannesburg') {
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(1) > select', '3100003');
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(2) > select', '3100090');
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(3) > select', '3100346');
  } 

  if (area == 'Durban') {
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(1) > select', '3100002');
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(2) > select', '3100149');
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(3) > select', '3100151');
  } 
  
  if (area == 'Port Elizabeth') {
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(1) > select', '3100197');
    await page.select('#wrapper > div.postad-content > div:nth-child(6) > div.postad-location > div.location-content > div:nth-child(2) > select', '3100306');
  } 
  
  //press tab 5x
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
  }
  //Enter ad description
  await page.keyboard.type(description);
  await page.waitFor(3000)
  //upload photos
  const fileInput = await page.$('input[type=file]');
  await fileInput.uploadFile('./images/Advertising-flyer.jpg', './images/Website-mockup.png');
  await page.waitFor(10000)

  //Enter phone number  
  //await page.type('input.phone-input', phoneNumber),

  //click post button
  await page.click('.post-button')

  await page.waitFor(15000)
  //await page.screenshot({ path: 'testresult.png', fullPage: true })
  await browser.close()
  console.log(`All done! ✨`)
})
