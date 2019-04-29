import {QG_Engine} from "./Engine/QG_Engine";



const engine = new QG_Engine();

const http = require('http');


import {RG_Authentication as Authentication_v0} from './Events_Authentication_v0/RG_Authentication';
import {RG_Products as Products_v0} from "./Events_QuestGod_v0/RG_Products";

engine.RegisterRequestGroup(new Authentication_v0("auth",0));
engine.RegisterRequestGroup(new Products_v0("products",0));

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


const port = process.env.PORT || 8080;
const server = http.createServer(engine.app);

server.listen(port);
