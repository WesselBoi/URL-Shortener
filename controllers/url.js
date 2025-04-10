const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl (req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "Please provide a url"})
    const shortID = shortid.generate()
    await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        visitHistory : [],
        createdBy : req.user._id
    })

    // return res.json({id : shortID})
    return res.render("home" , {
        id: shortID
    })
} 


async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks : result.visitHistory.length})
}

module.exports = {handleGenerateNewShortUrl , handleGetAnalytics}