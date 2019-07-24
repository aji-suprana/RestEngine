import net from 'net';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer, {IInfluencer} from '../../../Events_Authentication_v0/Models/influencer';

import {ResponseHelper} from '../../../Engine/index';

export function TCP(req:Request, res: Response, next:NextFunction){
    const responseHelper = new ResponseHelper("TCPTest", res, req);
    responseHelper.JsonRequest_Succeded();

    const host = "127.0.0.1";
    const port = 8001;

    const client = new net.Socket();
    client.connect(port, host, function() {
        console.log('Client connected to :' + host + ':' + port);
        client.write('Client: hello');
    });

    client.on('data', function(data) {
        console.log('Server : ' + data);
        if (data.toString().endsWith('exit')) {
            client.destroy();
        }
    });

    client.on('close', function() {
        console.log('connection closed');
    })

    client.on('error', function(err) {
        console.log(err);
    })
}