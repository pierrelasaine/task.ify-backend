import express, { Request, Response } from 'express';
import querystring from "querystring"
import {Buffer} from 'buffer'
import config from "../utils/config"
import utils from "../utils/utils"
const redirect_uri = 'http://localhost:3001/oauth/callback';

const oAuthRoute = express();

oAuthRoute.get('/login', function(req: Request, res: Response) {

  var state = utils.generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: config.client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

oAuthRoute.get('/callback', function(req: Request, res: Response) {

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
          'Authorization': 'Basic ' + ( Buffer.from(config.client_id + ':' + config.client_secret).toString('base64'))
        },
        json: true
      };
    }
  });
  
export default oAuthRoute;