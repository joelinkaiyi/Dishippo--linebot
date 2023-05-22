    const line=require('@line/bot-sdk');
    const express=require('express');
    const dotenv=require('dotenv')
    dotenv.config();
    const app=express();
    const config={
        channelSecret:process.env.CHANNEL_SECRET,
        channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN
    }
        function handleEvent(event) {
            if (event.type !== 'message' || event.message.type !== 'text') {
            return Promise.resolve(null);
            }
            const echo = { type: 'text', text: event.message.text };
            return client.replyMessage(event.replyToken, echo);
        }
    app.post('/callback', line.middleware(config), (req, res) => {
        console.log(req, res)
      Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        });
    });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});