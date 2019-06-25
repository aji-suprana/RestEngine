import {QG_Engine} from "./Engine/QG_Engine";



const engine = new QG_Engine();

const http = require('http');


import {RG_Authentication as Authentication_v0} from './Events_Authentication_v0/RG_Authentication';
import {RG_Products as Products_v0} from "./Events_QuestGod_v0/RG_Products";
import {RG_Users as Users_v0} from "./Events_QuestGod_v0/RG_Users";
import {RG_Influencers as Influencers_v0} from "./Events_QuestGod_v0/RG_Influencers";

engine.RegisterRequestGroup(new Authentication_v0("auth",0));
engine.RegisterRequestGroup(new Products_v0("products",0));
engine.RegisterRequestGroup(new Users_v0("users", 0));
engine.RegisterRequestGroup(new Influencers_v0("influencers", 0));

engine.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type,Accept,Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

engine.Initialize();

const mongoose = require('mongoose');

console.log("");
console.log("process.env.PORT : " + process.env.PORT);
console.log("process.env.DATABASEURI : " + process.env.DATABASEURI);
console.log("");

mongoose.connect(
    process.env.DATABASEURI,
    {
       useNewUrlParser: true
    }
).catch(function (err:any) { // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

//mongodb+srv://quest_god:<password>@questgod-ftvdm.mongodb.net/test?retryWrites=true
// import cors = require('cors');
// import express = require('express');

// const app = express();
// app.use(cors({credentials: true, origin: true}));
const port = process.env.PORT || 8080;
const server = http.createServer(engine.app);

server.listen(port);
