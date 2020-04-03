import  {ElTenedorReviewsInPageScraper} from '../src/scrapers/ElTenedorReviewsInPageScraper'

require('dotenv').config();

describe('El tenedor new scraper', function () {
    describe('test scraper in a for a given new', function () {

        const date = new Date()
        const scraper = new ElTenedorReviewsInPageScraper();
        jest.setTimeout(999999)
        it('scraping results shoud be not null', async function () {
            const url = "https://www.eltenedor.es/restaurante/el-portalon-de-o-donnell-r347599"
            const result = await scraper.extractReviewsInUrl(url);
            console.log(result);
            expect(result).toHaveProperty("content")
        });
    });
});