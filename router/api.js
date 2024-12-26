
import yts from "yt-search"
import fetch from 'node-fetch'
import axios from 'axios'
import express from "express"
import { truncateSync } from "fs"
const router = express.Router()
import ai from '../lib/ai.js'
//FUNC
global.fetchJson = async(url) => {
    try {
     let res = await fetch(url)
        let json = await res.json()
        return json
    } catch (error) {
        console.log(error)
    }
}

async function pingSystem(url, timeout = 5000) {
  try {
    const startTime = Date.now();
    const response = await fetch(url, { timeout });
    const endTime = Date.now();

    const status = response.status;
    const responseTime = endTime - startTime;

    return {
      success: response.ok,
      status: status,
      responseTime: responseTime + "ms"
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
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
router.get("/renungan", async (req, res) => {
    const fruits = await fetchJson(`https://github.com/BochilTeam/database/raw/refs/heads/master/kata-kata/renungan.json`)
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    res.json({
        status: 200,
        result: randomFruit
    })
})
router.get("/truth", async (req, res) => {
    const fruits = await fetchJson(`https://github.com/BochilTeam/database/raw/refs/heads/master/kata-kata/truth.json`)
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    res.json({
        status: 200,
        result: randomFruit
    })
})
router.get("/dare", async (req, res) => {
    const fruits = await fetchJson(`https://github.com/BochilTeam/database/raw/refs/heads/master/kata-kata/dare.json`)
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    res.json({
        status: 200,
        result: randomFruit
    })
})
router.get("/bucin", async (req, res) => {
    const fruits = await fetchJson(`https://github.com/BochilTeam/database/raw/refs/heads/master/kata-kata/bucin.json`)
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    res.json({
        status: 200,
        result: randomFruit
    })
})
router.get("/asmaulhusna", async(req, res) => {
    let ress = await fetchJson(`https://github.com/BochilTeam/database/raw/refs/heads/master/religi/asmaulhusna.json`)
    res.json({
        status: 200,
        result: ress 
    })
})
//kurs
router.get("/kurs", async(req, res) => {
    const ress = await fetchJson(`https://raw.githubusercontent.com/BochilTeam/database/refs/heads/master/ekonomi/kurs.json`)
    res.json({
        status: 200,
        result: ress
    })
})
//search
router.get('/yt-search', async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error" : "tidak di temukan query"})
        const result = await yts(query)
        res.json({
            result
        })
    })

//NEWS
router.get('/ping', async (req, res) => {
    const result = await pingSystem('https://api.ndaadev.us.kg')
    res.json({
        status: 200,
        result: result 
    })
})
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
router.get("/openai-v2", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error":"tidak di temukan query"})
        const model = 'openai'
    const reqs = await ai(query, model)
    res.json({
        status: "200",
        result: reqs
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
router.get("/mistral-large", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error":"tidak di temukan query"})
        const model = 'mistral-large'
    const reqs = await ai(query, model)
    res.json({
        status: "200",
        result: reqs
    })
})
router.get("/mistral", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error":"tidak di temukan query"})
        const model = 'mistral'
    const reqs = await ai(query, model)
    res.json({
        status: "200",
        result: reqs
    })
})
router.get("/llama", async (req, res) => {
    const query = req.query.query
    if (!query) return res.json({"error":"tidak di temukan query"})
        const model = 'llama'
    const reqs = await ai(query, model)
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
router.get("/ytv", async (req, res) => {
    const url = req.query.url
    if (!url) return res.json({"error":"tidak di temukan url"})
    const resz = await fetchJson(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`)
    const { dl, title } = resz.data
    res.json({
        status: 200,
        result: {
            title: title,
            dl: dl,
        }
    })
})
router.get("/yta", async (req, res) => {
    const url = req.query.url
    if (!url) return res.json({"error":"tidak di temukan url"})
    const resz = await fetchJson(`https://api.siputzx.my.id/api/d/ytmp3?url=${url}`)
    const { dl, title } = resz.data
    res.json({
        status: 200,
        result: {
            title: title,
            dl: dl,
        }
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