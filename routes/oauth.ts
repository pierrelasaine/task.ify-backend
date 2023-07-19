import express, { Request, Response } from 'express';
import querystring from "querystring"
import {Buffer} from 'buffer'
import client_secret from "../utils/config"
import utils from "../utils/utils"
const client_id = 'd7527322ca104fe891303bb7837023e5';
const redirect_uri = 'http://localhost:8888/callback';

const app = express();

app.get('/login', function(req: Request, res: Response) {

  var state = utils.generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req: Request, res: Response) {

    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + ( Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
    }
  });
  