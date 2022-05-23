const express = require("express");
const Arena = require("are.na");
const eta = require("eta")
const app = express();
const port = process.env.PORT || 3000;
app.engine("eta", eta.renderFile)

app.set("view engine", "eta")

app.set("views", "./views")

// "place-hyufowbjwka"

app.get('/', (req, res) => {
  res.redirect('/place-hyufowbjwka/1');
});

app.get('/:channel', (req, res) => {
  res.redirect(`/${req.params.channel}/1`);
});

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
      contents = contents.join("");
      res.render("template", {
        body: contents,
        next: `/${req.params.channel}/${parseInt(req.params.page) + 1}`,
        previous: `/${req.params.channel}/${parseInt(req.params.page) - 1}`,
      });
    }).catch(function () {
      res.send("");
    });
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});