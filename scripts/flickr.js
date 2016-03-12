var flickrAPIKey = "API KEY"
var flickrBaseUrl = "https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&per_page=3&api_key=" + flickrAPIKey
// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e172b2bc3cad4dd79c5816dcf08594e7&tags=flower&format=json
var flickrMethod = {  search: "flickr.photos.search",
                getPhoto: "flickr.photos.getinfo"
              }


function createFlickrUrl(method, data) {
  if (method === flickrMethod.search) {
    return flickrBaseUrl + "&method=" + method + "&tags=" + encodeURIComponent(data.replace(' ', ''))

  } else if (method === flickrMethod.getPhoto) {
    return flickrBaseUrl + "&method=" + method + "&photo_id=" + encodeURIComponent(data.replace(' ', ''))
  }
}

var url = createFlickrUrl(flickrMethod.search, 'flowers, honey')

d3.json(url, function(error, response) {
  if (!error) {
    d3.select('#searchAPIUrl').node().innerHTML = 'URL: ' + url
    d3.select('#searchAPIResponse').node().innerHTML = JSON.stringify(response, null, 4)

    var photosArray = response.photos.photo

    // get first photo
    var photo = photosArray[0]

    url = createFlickrUrl(flickrMethod.getPhoto, photo.id)
    d3.json(url, function(error, response) {
      if (!error) {
        d3.select('#infoAPIUrl').node().innerHTML = 'URL: ' + url
        d3.select('#infoAPIResponse').node().innerHTML = JSON.stringify(response, null, 4)
      }
    })
  }
})
