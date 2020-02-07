const fetch = require('node-fetch');

const url = 'https://memegen.link/examples';

fetch(url)
  .then(function(response) {
    // response.text ~ verb
    response.text().then(function(html) {
      // html.match = extracts globally image urls
      const imageUrls = html.match(/<img[^>]+src="([^">]+)/g);
      // imageUrls.slice = extracts only the first 10 urls
      const firstTenImageUrls = imageUrls.slice(0, 10);
      // forEach = repeats an action chronologically for the first 10 images
      firstTenImageUrls.forEach(function(image, count) {
        // add https remove img
        // download images in a folder
        // replace the useless part of the string with the start of the url
        const url = image
          // to replace a part of the string use single quote and comma
          .replace('<img class="meme-img" src="', 'https://memegen.link')
          // to replace symbols of a string you may need to use slash and or double quotes insted of single quotes
          .replace(/&#39;/g, "'");
        // to rename the files of the images add plus count
        const localPath = './memes/images' + count + '.jpg';
        // saves images to the local folder
        saveImageToDisk(url, localPath);
      });
    });
  })
  .catch(function(err) {
    console.log(err);
  });

var fs = require('fs');
var https = require('https');

function saveImageToDisk(url, localPath) {
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function(response) {
    response.pipe(file);
  });
}

// exports.saveImage(req, res) {
//   let image_path='./memes'+Date.now()+'.jpg';
//   fetchImage(req.body.profile_pic_url,image_path);
//   }
