const express = require('express')
const Arena = require("are.na");
const app = express()
const port = process.env.PORT || 3000
const arena = new Arena();



app.get('/', (req, res) => {
  let contents = [];
    arena
  .channel("place-hyufowbjwka")
  .get({ page: 1, per: 34,
    direction: 'desc',
    sort: 'position'
   })
  .then(function(channel){
    channel.contents.forEach(function(item) {
      if (item.image) {
        contents.push(`<img src="${item.image.display.url}">`);
       }
    })
    res.send(contents.join(""))
    });
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})