const express = require('express')
const Arena = require("are.na");
const app = express()
const port = 3000
const arena = new Arena();



app.get('/', (req, res) => {
  let contents = [];
    arena
  .channel("place-hyufowbjwka")
  .get({ page: 1, per: 20,
    direction: 'desc',
    sort: 'position'
   })
  .then(function(channel){
    channel.contents.forEach(function(x) {
      if (x.image) {
        contents.push(`<img src="${x.image.display.url}">`);
       }
    })
    res.send(contents.join(""))
    });
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})