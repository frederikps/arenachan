const express = require("express");
const Arena = require("are.na");
const app = express();
const port = process.env.PORT || 3000;

// "place-hyufowbjwka"

app.get("/:channel/:page", function (req, res) {
  const arena = new Arena();
  let contents = [];
  arena
    .channel(req.params.channel)
    .get({
      direction: "desc",
      page: req.params.page, per: 34,
      sort: "position"
    })
    .then(function (channel) {
      channel.contents.forEach(function (item) {
        if (item.image) {
          contents.push(`<img src="${item.image.display.url}">`);
        }
      });
      contents.unshift(`<main><a href="/${req.params.channel}/${parseInt(req.params.page) + 1}">`);
      contents.push(`</a></main>`);
      contents = contents.join("");
      res.send(contents);
    })
    .catch(function (error) {
      res.send(error);
    });
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});