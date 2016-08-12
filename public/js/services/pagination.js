angular.module('myServices').factory('paginationService', function ($http) {

  function paginate(objects, objectsPerPage) {
    var array = [];

    angular.forEach(objects, function(object, index) {
      if(index == 0 || index % objectsPerPage == 0) {
        array.push([object]);
      } else {
        array[array.length - 1].push(object);
      }
    });

    return array;
  };

  function getTracksPagination(tracks, page) {
    var totalPages = tracks.length;
    var startingPage, endingPage;

    if (totalPages <= 10) {
      startingPage = 1;
      endingPage = totalPages;
    } else {
      if (page <= 6) {
        startingPage = 1;
        endingPage = 10;
      } else if (page + 4 >= totalPages) {
        startingPage = totalPages - 9;
        endingPage = totalPages;
      } else {
        startingPage = page - 5;
        endingPage = page + 4;
      }
    }

    return {
      tracks: tracks[page - 1],
      pages: _.range(startingPage, endingPage + 1),
      page: page,
      totalPages: totalPages
    };
  };

  function getAlbumsPagination(albums, page) {
    var totalPages = albums.length;
    var startingPage, endingPage;

    if (totalPages <= 10) {
      startingPage = 1;
      endingPage = totalPages;
    } else {
      if (page <= 6) {
        startingPage = 1;
        endingPage = 10;
      } else if (page + 4 >= totalPages) {
        startingPage = totalPages - 9;
        endingPage = totalPages;
      } else {
        startingPage = page - 5;
        endingPage = page + 4;
      }
    }

    return {
      albums: albums[page - 1],
      pages: _.range(startingPage, endingPage + 1),
      page: page,
      totalPages: totalPages
    };
  };

  function getArtistsPagination(artists, page) {
    var totalPages = artists.length;
    var startingPage, endingPage;

    if (totalPages <= 10) {
      startingPage = 1;
      endingPage = totalPages;
    } else {
      if (page <= 6) {
        startingPage = 1;
        endingPage = 10;
      } else if (page + 4 >= totalPages) {
        startingPage = totalPages - 9;
        endingPage = totalPages;
      } else {
        startingPage = page - 5;
        endingPage = page + 4;
      }
    }

    return {
      artists: artists[page - 1],
      pages: _.range(startingPage, endingPage + 1),
      page: page,
      totalPages: totalPages
    };
  };

  return {
    paginate: paginate,
    getTracksPagination: getTracksPagination,
    getAlbumsPagination: getAlbumsPagination,
    getArtistsPagination: getArtistsPagination
  };

});
