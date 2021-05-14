const { Engine } = require("json-rules-engine");
const express = require("express");
const router = express.Router();

let engine = new Engine();
engine.addRule({
  conditions: {
    any: [
      {
        all: [
          {
            fact: "gameDuration",
            operator: "equal",
            value: 40,
          },
          {
            fact: "personalFoulCount",
            operator: "greaterThanInclusive",
            value: 5,
          },
        ],
      },
      {
        all: [
          {
            fact: "gameDuration",
            operator: "equal",
            value: 48,
          },
          {
            fact: "personalFoulCount",
            operator: "greaterThanInclusive",
            value: 6,
          },
        ],
      },
    ],
  },
  event: {
    type: "fouledOut",
    params: {
      message: "Player has fouled out!",
    },
  },
});
router.post("/", (req, res) => {
  const facts = req.body;
  engine.run(facts).then(({ events }) => {
    res.send(events.map((event) => event.params.message));
  });
});

module.exports = router;
