const express = require('express');
const QG_Engine = require("./build/Engine/QG_Engine").QG_Engine;
const engine = new QG_Engine();
const app = express();

const Authentication = require('./build/Events_Authentication/_RG_Authentication').Authentication;

engine.RegisterRequestGroup(new Authentication("authentication"));
engine.Initialize();

const mongoose = require('mongoose');
mongoose.connect(
    //"mongodb+srv://quest_god:QuestGod1@questgod-ftvdm.mongodb.net/test?retryWrites=true"
    //"mongodb+srv://quest_god:QuestGod1@questgod-ftvdm.mongodb.net/test?retryWrites=true",
    //"mongodb+srv://quest_god:QuestGod1@questgod-ftvdm.mongodb.net/test?retryWrites=true",
   " mongodb://localhost:27017/questgod",
    {
       useNewUrlParser: true
    }
).catch(err => { // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

//mongodb+srv://quest_god:<password>@questgod-ftvdm.mongodb.net/test?retryWrites=true

module.exports = engine.app;