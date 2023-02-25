"use strict";

const axios = require("axios"); // npm i axios
const superagent = require("superagent"); // npm i superagent



// http://localhost:3000/randomImage
async function randomImageHandler(request, response) {
  
  const url = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}`;
  try {
    let imgData = await superagent.get(url);
    console.log(imgData);
    let randomImg = await new Photo(imgData.body)
    response.status(200).send(randomImg);
  } catch {
    response.status(500).send("something went wrong");
  }
}


// http://localhost:3000/searchImage?comicNumber=614
function searchImageHandler(request, response) {
  const comicNumber = request.query.comicNumber;
   const url = `https://xkcd.com/${comicNumber}/info.0.json`;
  axios
    .get(url)
    .then((imgData) => {
      console.log(imgData.data);
      const xComic = imgData.data.results.map((data) => new Photo(data));
      response.status(200).send(xComic);
    })
    .catch((err) => {
      response.status(500).send("something went wrong", err);
    });
}


class Photo {
  constructor(data) {
    this.name= data.user.name;
    this.imageUrl= data.urls.raw;
    this.description=data.alt_description;
  }
}

module.exports = { searchImageHandler, randomImageHandler };
