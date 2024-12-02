import { GoogleGenerativeAI } from "@google/generative-ai";
import yts from "yt-search"
import fetch from 'node-fetch'
import axios from 'axios'
import { blackbox } from '@shuddho11288/blackboxai-api'
import express from "express"
const router = express.Router()

//search
router.get('/yt-search', async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error" : "tidak di temukan query"})
        const result = await yts(query)
        res.json({
            status: "200",
            result: result
        })
    })

//NEWS
router.get('/news-cnn', async (req, res) => {
    const ll = await fetch(`https://news-api-zhirrr.vercel.app/v1/cnn-news`)
    const ress = await ll.json()
    const result = ress.data
    res.json({
        status: "200",
        result: result
    })
})
router.get('/news-cnbc', async (req, res) => {
    const ll = await fetch(`https://news-api-zhirrr.vercel.app/v1/cnbc-news`)
    const ress = await ll.json()
    const result = ress.data
    res.json({
        status: "200",
        result: result
    })
})
router.get('/news-replubika', async (req, res) => {
    const ll = await fetch(`https://news-api-zhirrr.vercel.app/v1/republika-news`)
    const ress = await ll.json()
    const result = ress.data
    res.json({
        status: "200",
        result: result
    })
})
router.get('/news-kumparan', async (req, res) => {
    const ll = await fetch(`https://news-api-zhirrr.vercel.app/v1/kumparan-news`)
    const ress = await ll.json()
    const result = ress.data
    res.json({
        status: "200",
        result: result
    })
})
//AI
router.get('/blackbox', async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error" : "tidak di temukan query"})
        const result = await blackbox(query)
        res.json({
            status: "200",
            result
        })
})
router.get('/lumin-ai', async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error" : "tidak di temukan query"})
        async function fetchContent(content) {
            try {
                const response = await axios.post('https://luminai.my.id/', { content });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        const result = await fetchContent(query)
        res.json({
            status: '200',
            result
        })
})
router.get("/openai", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error" : "tidak di temukan query"})
        const req_url = await fetch(`https://btch.us.kg/openai?text=${query}`)
    const final = await req_url.json()
    const masukkann = final.result
    res.json({
        status: "200",
        result: masukkann
    })
})
router.get("/gemini", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error" : "tidak di temukan query"})
        const req_url = await fetch(`https://btch.us.kg/gemini?text=${query}`)
    const final = await req_url.json()
    const masukkann = final.result
    res.json({
        status: "200",
        result: masukkann
    })
})
router.get("/tiktok", async (req, res) => {
    const url = req.query.url
    if (!url) return res.json({"error": "masukkan url!"})
        const urls = await fetch(`https://tikwm.com/api/?url=${url}`)
    const aloks = await urls.json()
    const final = aloks.data
res.json({
    status: '200',
    result: final
})
})

//Other
router.get("/covid-19", async (req, res, next) => {
    const alok = await fetch(`https://covid19-api-zhirrr.vercel.app/api/world`)
    const result = await alok.json()
    res.json({
        status: '200',
        result
    })
})
export default router