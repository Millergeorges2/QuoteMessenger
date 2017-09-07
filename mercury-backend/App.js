const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.post('/api/phone', function (req, res) {
    const accountSid = 'AC502880ef078caddb4a9f0b9943c22281';
    const authToken = '8ac714b4fc824e1a4167d1486cbf48b0';
    const client = require('twilio')(accountSid, authToken);
    const userNumber = req.body.phoneNumber;
    const quote = req.body.quote;



    function removehtml(html) {
        return html.replace(/<p>|<\/p>|\\n/g, '')
    }
    console.log(removehtml(quote))
    client.messages.create(
        {
            to: '+1' + userNumber,
            from: '+18588793018',
            body: removehtml(quote),
        },
        (err, message) => {
            console.log(err);
        }
    );

    //my twilio phone number (858) 879-3018
});

module.exports = app;