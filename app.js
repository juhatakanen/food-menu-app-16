const express = require('express')
const app = express()

app.set('view engine', 'ejs')
const port = 8000


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


const puppeteer = require("puppeteer");
// const p = document.querySelector('.p')

app.get('/', (req, res) => {
(async () => {
        const browser = await puppeteer.launch({ 
                headless: false, 
                slowMo: 250 
            });
            const page = await browser.newPage();
            await page.goto("https://www.semma.fi/ravintolat2/muut/ravintola-rentukka/", {
                    waitUntil: 'networkidle0',
                  })
                await page.click("#coiConsentBannerBase > div.coi-consent-banner__consent-area > div.coi-button-group > button.coi-consent-banner__agree-button")
                await page.click("#menuContainer > div.default-box-shadow.bgc-white.restaurant-menu-content > div > div > div.text-left.menu-container-menu-content > div:nth-child(1) > div > div.clear-both.relative.overflow-hidden > div:nth-child(1) > div > div.xs-12.sm-6.menu-container-menu-left > div:nth-child(1) > div > div > div:nth-child(1) > div > span.meal-name.ng-binding")
                const ruokalista = await page.evaluate(() => {
                        const pgTag = document.querySelectorAll("#menuContainer > div.modal-window.bg-dark.modal-menu-recipe-container > div > div.padding-h-md.r-padding-v-sm-sm-padding-v-md.modal-window-content > div.menu-recipe-content > div:nth-child(2) > h5");
                        let lista = []
                        pgTag.forEach((tag) => {
                                lista.push(tag.innerText)
                            })
                            return lista
                        });
                    
                    
                        const ruoka_aineet = await page.evaluate(() => {
                                const pgTag = document.querySelectorAll("#menuContainer > div.modal-window.bg-dark.modal-menu-recipe-container > div > div.padding-h-md.r-padding-v-sm-sm-padding-v-md.modal-window-content > div.menu-recipe-content > div:nth-child(2) > div > div:nth-child(2)");
                                let lista = []
                                pgTag.forEach((tag) => {
                                        lista.push(tag.innerText)
                                    })
                                    return lista
                                });
                            
                                console.log(ruokalista)
                                console.log(ruoka_aineet)
                                // p.innerText = grabParagraph;
                                // await browser.close();
                            })()
                            
                             res.render("index", { text: "ruoka_aineet"});
                            })