const express = require("express");
const Arena = require("are.na");
const eta = require("eta");
const app = express();
const port = process.env.PORT || 3000;

app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set("views", "./views");

app.get("/", function (req, res) {
  const arena = new Arena();
  let contents = [];
  arena.search()
    .channels({
      page: req.params.page, per: 34,
    })
    .then(function (channels) {
      channels.forEach(function (channel) {
        contents.push(`<a href="/${channel.slug}/1">${channel.title}</a>`);
      });
      contents = contents.join("");
      res.render("template", {
        body: contents,
        previous: ``,
        next: ``
      });
    })
    .catch(function () {
      res.send("");
    });
});

app.get("/:channel", function (req, res) {
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
        previous: `/${req.params.channel}/${parseInt(req.params.page) - 1}`,
        next: `/${req.params.channel}/${parseInt(req.params.page) + 1}`
      });
    }).catch(function () {
      arena
        .search(req.params.channel)
        .blocks({

          page: req.params.page, per: 34,

        })
        .then(function (channel) {
          channel.forEach(function (item) {
            if (item.image) {
              contents.push(`<img src="${item.image.display.url}">`);
            }
          });
          contents = contents.join("");
          res.render("template", {
            body: contents,
            previous: `/${req.params.channel}/${parseInt(req.params.page) - 1}`,
            next: `/${req.params.channel}/${parseInt(req.params.page) + 1}`
          });
        });
    })
    .catch(function () {
      res.send("");
    });
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});