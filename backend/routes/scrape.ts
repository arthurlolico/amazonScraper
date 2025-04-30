import express, { Router } from 'express';
import { extractItemData } from '../scraper/amazonScraper';

const router = Router();

router.get('/api/scrape',async (req,res) => {
    const keyword = req.query.keyword;
    if(typeof keyword == 'string') {
        try {
            const listItems = await extractItemData(keyword);
        } catch (error) {
            res.status(503).json({error: 'Failed to scrape data'});
        }
    }
})

export { router };
