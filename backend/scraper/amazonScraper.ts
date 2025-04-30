import axios from 'axios';
import { JSDOM } from 'jsdom';

const fetchDatafromAmazonbyKeyword = async (keyword : string) => {
    return axios.get(`https://www.amazon.com/s?k=${keyword}`);
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
    const productTitle = productInfo.querySelector('div[data-cy="title-recipe"]');
    const productRatings = productInfo.querySelector('i.a-icon-star-small');
    const productNumberReview = productInfo.querySelector('span[data-component-type="s-client-side-analytics"]');
    const productImageSource = productInfo.querySelector('img');
    return {
        titleProduct: productTitle?.textContent,
        ratingsProduct: productRatings?.textContent ?? "N/A",
        numberOfReviewProduct: productNumberReview?.textContent ?? "N/A",
        imgSrcProduct: productImageSource?.getAttribute('src'),
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
    }
    } catch (error) {
        if(error instanceof Error) {
            console.error("Error extracting item data: ", error);
        }
    }
}