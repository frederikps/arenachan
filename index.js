const express = require('express')
const Arena = require("are.na");
const app = express()
const port = process.env.PORT || 3000
const arena = new Arena();

// "place-hyufowbjwka"

app.get('/', (req, res) => {
  res.redirect('/place-hyufowbjwka/1');
})

app.get('/:channel', (req, res) => {
  res.redirect(`/${req.params.channel}/1`);
})

app.get('/:channel/:page', (req, res) => {
  let contents = [];
  arena
    .channel(req.params.channel)
    .get({
      page: req.params.page, per: 34,
      direction: 'desc',
      sort: 'position'
    })
    .then(function (channel) {
      channel.contents.forEach(function (item) {
        if (item.image) {
          contents.push(`<img src="${item.image.display.url}">`);
        }
      })
      contents.unshift(`<main><a href="/${req.params.channel}/${parseInt(req.params.page) + 1}">`);
      contents.push(`</a></main>`)
      contents = contents.join("");
      res.send(contents)
    })
    .catch(function (error) {
      res.send(error)
    })
  })


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })