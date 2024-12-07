
import yts from "yt-search"
import fetch from 'node-fetch'
import axios from 'axios'
import express from "express"
import chokidar from 'chokidar';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router()

//FUNC
async function fetchWithModel(content, model) {
    try {
      const response = await axios.post('https://luminai.my.id/', {
        content: content,
        model: model
      })

      return response.data.result
    } catch (error) {
      return error
    }
  }

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
        const model = 'gpt-4o'
    const reqs = await fetchWithModel(query, model)
    res.json({
        status: "200",
        result: reqs
    })
})
router.get("/claude", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error":"tidak di temukan query"})
        const model = 'claude-sonnet-3.5'
    const reqs = await fetchWithModel(query, model)
    res.json({
        status: "200",
        result: reqs
    })
})
router.get("/gemini", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error" : "tidak di temukan query"})
        const model = 'gemini-pro'
    const reqs = await fetchWithModel(query, model)
    res.json({
        status: "200",
        result: reqs
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

chokidar.watch(__dirname).on('change', (path) => {
  console.log(`File ${path} modificato. Riavvio...`);
  process.exit(0); // Riavvia automaticamente
});

export default router