import  {PuppeteerScraper} from './PuppeteerScraper'
import htmlToText from 'html-to-text'
import { ReviewScrapedDocument } from '../models/ReviewScraped';
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

export class ElTenedorReviewsInPageScraper extends PuppeteerScraper {
    public timeWaitStart: number
    public timeWaitClick: number
    constructor(configPath= "../config/scrapingConfig.json") {
        super(configPath);
        this.timeWaitStart = 1 * 1000;
        this.timeWaitClick = 500;
    }

    async extractReviewsInUrl(url: string): Promise<ReviewScrapedDocument[]> {
        // https://www.eltenedor.es/restaurante/el-portalon-de-o-donnell-r347599/opiniones
        
        url = url + "/opiniones"
        console.log("\n---");
        console.log("extracting reviews in url:")
        console.log(url);
        console.log("---");


        await this.initializePuppeteer();

        try {
            await this.page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
            await this.page.emulate(iPhonex);

            await this.page.goto(url, {waitUntil: 'load', timeout: 0});
            await this.page.waitFor(this.timeWaitStart);
            const results:ReviewScrapedDocument[] = []
            const lis = await this.page.$$('blockquote');
            await this.page.screenshot({ path: 'page.png' });


            for (const li of lis){
                const user = await li.$('cite')
                console.log(user)
                const result:ReviewScrapedDocument = {} as ReviewScrapedDocument

            }

           
           
            
            return results;

        } catch (err) {
            console.log(err);
            await this.page.screenshot({ path: 'error_extract_new.png' });
            await this.browser.close();
            return null;
        }
    }

    async extractBody(div: any){
        const html =  await (await div.getProperty('innerHTML')).jsonValue();
        const text = htmlToText.fromString(html, {
            wordwrap: 130
        });
        return text
    }
    async extractHeadline(div: any){
        const h1Headline = await div.$('h1');
        const headline = await (await h1Headline.getProperty('textContent')).jsonValue();
        return headline
    }
}
