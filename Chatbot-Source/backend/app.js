const express = require('express');
const cors = require('cors');
const fs = require('fs');
const locatorQA = require('./data/locator_chatbot.json');
const realEstateManagementQA = require('./data/real-estate-management_chatbot.json');
const valueTrackQA = require('./data/value-track_chatbot.json');

const app = express();
const port = 5000;

app.use(cors());
app.options('*',cors());
app.use(express.urlencoded());
app.use(express.json());

// get() methods
app.get('/',(req,res)=>{
    res.status(200).send("Chatbot server functionalities are working properly.");
});

// to get all QA for particular app
app.get('/chatbotqa/',(req,res)=>{
    let queryObj = req.query;
    let appName = queryObj.appname;
    if (appName === 'locator'){
        fs.readFile('data/locator_chatbot.json','utf-8',(err,data)=>{
            res.status(200).send(JSON.parse(data));
            if (err) console.log(err);
        });
    }
    else if (appName === 'real-estate-management'){
        fs.readFile('data/real-estate-management_chatbot.json','utf-8',(err,data)=>{
            res.status(200).send(JSON.parse(data));
            if (err) console.log(err);
        });
    }
    else if (appName === 'value-track'){
        fs.readFile('data/value-track_chatbot.json','utf-8',(err,data)=>{
            res.status(200).send(JSON.parse(data));
            if (err) console.log(err);
        });
    }
});

// to save a QA
app.post('/chatbotqa/',(req,res)=>{
    let queryObj = req.query;
    let appName = queryObj.appname;
    let qa = req.body;
    let quesArr = qa.ques;
    let ans = qa.ans;
    if (appName === 'locator'){
        quesArr.forEach(ques => {
            locatorQA["QA"][ques] = ans;
        });
        fs.writeFileSync('data/locator_chatbot.json',JSON.stringify(locatorQA));
        res.status(200).send({
            "status": "success",
            "msg": "Keyword and answer saved successfully in 'Locator' database"
        });
    }
    else if (appName === 'real-estate-management'){
        quesArr.forEach(ques => {
            realEstateManagementQA['QA'][ques] = ans;
        });
        fs.writeFileSync('data/real-estate-management_chatbot.json',JSON.stringify(realEstateManagementQA));
        res.status(200).send({
            "status": "success",
            "msg": "Keyword and answer saved successfully in 'Real Estate Management' database"
        });
    }
    else if (appName === 'value-track'){
        quesArr.forEach(ques => {
            valueTrackQA['QA'][ques] = ans;
        });
        fs.writeFileSync('data/value-track_chatbot.json',JSON.stringify(valueTrackQA));
        res.status(200).send({
            "status": "success",
            "msg": "Keyword and answer saved successfully in 'Value-Track' database"
        });
    }
});

// to delete targeted qa
app.delete('/chatbotqa/',(req,res)=>{
    let queryObj = req.query;
    let appName = queryObj.appname;
    let keyword = queryObj.keyword;
    if (appName === 'locator'){
        delete locatorQA['QA'][keyword];
        fs.writeFileSync('data/locator_chatbot.json',JSON.stringify(locatorQA));
        res.status(200).send({
            "status": "success",
            "msg": `Keyword-Answer pair deleted successfully for keyword "${keyword}" from "${appName}" database.`
        });
    }
    else if (appName === 'real-estate-management'){
        delete realEstateManagementQA['QA'][keyword];
        fs.writeFileSync('data/real-estate-management_chatbot.json',JSON.stringify(realEstateManagementQA));
        res.status(200).send({
            "status": "success",
            "msg": `Keyword-Answer pair deleted successfully for keyword "${keyword}" from "${appName}" database.`
        });
    }
    else if (appName === 'value-track'){
        delete valueTrackQA['QA'][keyword];
        fs.writeFileSync('data/value-track_chatbot.json',JSON.stringify(valueTrackQA));
        res.status(200).send({
            "status": "success",
            "msg": `Keyword-Answer pair deleted successfully for keyword "${keyword}" from "${appName}" database.`
        });
    }
});

// listen the server
app.listen(port,()=>{
    console.log(`Server successfully running at http://localhost:${port}/`);
});