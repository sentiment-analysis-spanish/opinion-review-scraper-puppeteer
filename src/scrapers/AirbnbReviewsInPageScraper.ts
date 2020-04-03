import  {PuppeteerScraper} from './PuppeteerScraper'
import htmlToText from 'html-to-text'
import { ReviewScrapedDocument } from '../models/ReviewScraped';
const devices = require('puppeteer/DeviceDescriptors');

export class ElTenedorReviewsInPageScraper extends PuppeteerScraper {
    public timeWaitStart: number
    public timeWaitClick: number
    constructor(configPath= "../config/scrapingConfig.json") {
        super(configPath);
        this.timeWaitStart = 1 * 1000;
        this.timeWaitClick = 500;
    }

    async extractReviewsInUrl(url: string): Promise<ReviewScrapedDocument[]> {
        // https://www.airbnb.es/rooms/9940790?location=madrid&check_in=2020-01-10&check_out=2020-01-11&source_impression_id=p3_1585926093_KfFwH%2BuJOZ3acJiF
        
        console.log("\n---");
        console.log("extracting reviews in url:")
        console.log(url);
        console.log("---");


        await this.initializePuppeteer();

        try {
            

            await this.page.goto(url, {waitUntil: 'load', timeout: 0});
            await this.page.waitFor(this.timeWaitStart);
            const results:ReviewScrapedDocument[] = []

            const divs = await this.page.$$('div[style="margin-top: 16px;"]');
            await this.page.screenshot({ path: 'page.png' });


           
           
            
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
