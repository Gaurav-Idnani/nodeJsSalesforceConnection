const nforce = require('nforce');
const faye = require('faye');
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

const org = nforce.createConnection({
  clientId: '3MVG9n_HvETGhr3CXKcewZvv46PhBBxpJGl._Seozd7bCpRdVbDuRVkcX1A3ljqYTol2evYnIx4axFnRlXAqo',
  clientSecret: '17994F4E41BD36CC1D877EF89499A3AF3CD28D9C7DF354AEBF2C4C0C21BDB524',
  redirectUri: 'http://localhost:3000/',
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});

console.log ('org=',JSON.stringify(org,null,2));
let response;
org.authenticate({ username: 'gidnani1401@resilient-bear-mjupyb.com', password: 'KTM250Adv!',securityToken: '4f57ijdJYKlWF20eO4c0T9LZ'}, (err, resp)=>{
    // the oauth object was stored in the connection object
    if(!err) {
        response = resp;
        console.log (JSON.stringify(resp,null,2));
        subscribeToPlatformEvents();
    }
        //console.log('Cached Token: ' + org.oauth.access_token);
    else console.log (JSON.stringify(err,null,2));
  });

// Subscribe to Platform Events
let subscribeToPlatformEvents = () => {
    var client = new faye.Client(response.instance_url + '/cometd/40.0/');
    client.setHeader('Authorization', 'OAuth ' + response.access_token);
    client.subscribe('/event/Order_Event__e', function(message) {
        // Send message to all connected Socket.io clients
        // io.of('/').emit('Order_Event', {
        //     mixId: message.payload.Mix_Id__c,
        //     mixName: message.payload.Mix_Name__c,
        //     account: message.payload.Account__c
        // });
        console.log ('recieved message=',JSON.stringify(message,null,2));
    });
};