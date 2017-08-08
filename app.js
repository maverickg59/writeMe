$(document).ready(function() {
  var sourceType = $('.theSource').val();
  $('.webCitation').hide();
  $('.theSource').change(function() {
    var sourceType = $('.theSource').val();
    if (sourceType === "book") {
      $('.webCitation').hide();
      $('.bookCitation').show();
    } else {
      $('.bookCitation').hide();
      $('.webCitation').show();
    }
  })
});

$("#citeButton").click(function(event) {
event.preventDefault();
  var citeType = $('.cites').val();
  var sourceType = $('.theSource').val();

  var bookTitle = $('#title').val();
  var bookPub = $('#publisher').val();
  var bookCity = $('#city').val();
  var bookYear = $('#year').val();
  var bookAuthF = $('#authOne').val();
  var bookAuthM = $('#authTwo').val();
  var bookAuthL = $('#authThree').val();
  var book = {
    "key":"0d73c64055db71b85f97611cef9b0df3",
    "source": "book",
    "style": citeType,
    "book": {
    },
    "pubtype": {
      "main": "pubnonperiodical"
    },
    "pubnonperiodical": {
      "title": bookTitle,
      "publisher": bookPub,
      "city": bookCity,
      "year": bookYear
    },
    "contributors": [
      {
        "function": "author",
        "first": bookAuthF,
        "middle": bookAuthM,
        "last": bookAuthL
      }
    ]
  }

  var webTitle = $('#webTitle').val();
  var webOwner = $('#owner').val();
  var webPublished = $('#webDate').val();
  var webPublishedDay = webPublished.split(' ')[0];
  var webPublishedMonth = webPublished.split(' ')[1];
  var webPublishedYear = webPublished.split(' ')[2];
  var webAccessed = $('#accessDate').val();
  var webAccessedDay = webAccessed.split(' ')[0];
  var webAccessedMonth = webAccessed.split(' ')[1];
  var webAccessedYear = webAccessed.split(' ')[2];
  var webAuthF = $('#webAuthOne').val();
  var webAuthM = $('#webAuthOne').val();
  var webAuthL = $('#webAuthThree').val();
  var website = {
    "key": "0d73c64055db71b85f97611cef9b0df3",
    "source": "website",
    "style": citeType,
    "website": {
      "title": webTitle
    },
    "pubtype": {
      "main": "pubonline"
    },
    "pubonline": {
      "title": webTitle,
      "inst": webOwner,
      "day": webPublishedDay,
      "month": webPublishedMonth,
      "year": webPublishedYear,
      "dayaccessed": webAccessedDay,
      "monthaccessed": webAccessedMonth,
      "yearaccessed": webAccessedYear
    },
    "contributors": [
      {
        "function": "author",
        "first": webAuthF,
        "middle": webAuthM,
        "last": webAuthL
      }
    ]
  }
  if (sourceType === "book") {
    ajaxRequest(book).then(function(data) {
      var obj = JSON.parse(data)
      $(".results").append('<h4>' + obj.data + '</h4>')
    })
  }  else {
    ajaxRequest(website).then(function(data) {
      var obj = JSON.parse(data)
      $(".results").append('<h4>' + obj.data + '</h4>')
    })
  }
});

function ajaxRequest(data) {
  return $.ajax({
    url: 'https://galvanize-cors-proxy.herokuapp.com/https://api.citation-api.com/2.1/rest/cite',
    method: 'PUT',
    data: JSON.stringify(data),
    contentType: 'application/json'
  });
}
