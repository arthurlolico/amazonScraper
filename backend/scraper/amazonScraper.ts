import axios from 'axios';
import { JSDOM } from 'jsdom';

const fetchDatafromAmazonbyKeyword = async (keyword : string) => {
    return axios.get(`https://www.amazon.com/s?k=${keyword}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
}});
}

const parseProducts = async (keyword: string) => {
    try {
        const rawAmazonData = await fetchDatafromAmazonbyKeyword(keyword);
        const amazonData = new JSDOM(rawAmazonData.data);
        const arrayProductsInfo = Array.from(amazonData.window.document.querySelectorAll('div[id].s-result-item:not(.AdHolder)'));
        return arrayProductsInfo;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.error("Axios error:",error);
        }
        else if (error instanceof Error){
            console.error("Generic error:",error);
        }
    }
}


const processedDataAmazon = (productInfo: any) => {
    const titleProduct = productInfo.querySelector('div[data-cy="title-recipe"]');
    const ratingsProduct = productInfo.querySelector('i.a-icon-star-small');
    const numberOfReviewProduct = productInfo.querySelector('span[data-component-type="s-client-side-analytics"]');
    const imgSrcProduct = productInfo.querySelector('img');
    return {
        titleProduct: titleProduct?.textContent,
        ratingsProduct: ratingsProduct?.textContent ?? "N/A",
        numberOfReviewProduct: numberOfReviewProduct?.textContent ?? "N/A",
        imgSrcProduct: imgSrcProduct?.getAttribute('src'),
    }
}

const extractItemData = async (keyword: string) => {
    try {
        const arrayProductsInfo = await parseProducts(keyword);
        
        if (arrayProductsInfo != null) {
            const finalArray = arrayProductsInfo.map(productInfo => {
                return processedDataAmazon(productInfo);
            }
        )
        return finalArray;
    }} catch (error) {
        if(error instanceof Error) {
            console.error("Error extracting item data: ", error);
        }
    }
} 

export { extractItemData };