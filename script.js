const puppeteer = require('puppeteer');
const fs = require('fs')

async function parseData () {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://l-rus.ru/liebherr/wine-cabinets/vstraivaemye-vinnye-shkafy/vinnyy-konditsionnyy-shkaf-liebherr-wkegb-582-grandcru.html');

    const productData = {
        name: '',
        price: '',
        desc: '',
        chars: []
    };

    let productName = await page.evaluate(() => document.querySelector('.page-title').innerText);

    let productPrice = await page.evaluate(() => document.querySelector('.big-price__price').innerText);

    let productDesc = await page.evaluate(() => {
        const paragraphs = Array.from(document.querySelectorAll('.product-description__text > p'), el => el.innerText);
        paragraphs.pop();
        return paragraphs
    });

    // let charTitles = await page.evaluate(() => {
    //     return Array.from(document.querySelectorAll('.characteristics__title-text'), el => el.innerText)
    // });

    let charNames = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.characteristics__name'), el => el.innerText)
    });

    let charProperties = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.characteristics__property'), el => el.innerText)
    });

    const chars = {}
    charNames.map((el, index) => chars[el] = charProperties[index]);

    productData.name = productName;
    productData.price = productPrice;
    productData.desc = productDesc.join('\n');

    for (let i = 0; i < charNames.length; i++) {
        let obj = {};
        obj[charNames[i]] = charProperties[i];
        productData.chars.push(obj);
    }

    console.log(productData)

    fs.writeFileSync('data.json', JSON.stringify(productData, null, 2));

    await browser.close();
}

parseData();