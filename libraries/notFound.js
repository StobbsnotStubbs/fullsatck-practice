"use strict";

function notFoundHandler(request, response) {
  response.status(404).send("not found");
}

module.exports = notFoundHandler;
