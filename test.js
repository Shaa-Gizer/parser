// const puppeteer = require('puppeteer');
// const fs = require('fs');
//
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//
//     // Navigate to the URL you want to scrape
//     await page.goto('https://example.com');
//
//     // Extract data from the page using Puppeteer functions
//     const data = await page.evaluate(() => {
//         // Sample scraping logic - replace this with your own
//         const title = document.querySelector('h1').innerText;
//         const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText);
//
//         return {
//             title,
//             paragraphs
//         };
//     });
//
//     // Close the browser
//     await browser.close();
//
//     // Save the extracted data to a JSON file
//     fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
//
//     // Optionally, you can generate an HTML document to display the data
//     const htmlContent = `
//     <html>
//       <head>
//         <title>Scraped Data</title>
//       </head>
//       <body>
//         <h1>${data.title}</h1>
//         <ul>
//           ${data.paragraphs.map(p => `<li>${p}</li>`).join('')}
//         </ul>
//       </body>
//     </html>
//   `;
//
//     fs.writeFileSync('output.html', htmlContent);
//
//     console.log('Data extracted and saved successfully!');
// })();