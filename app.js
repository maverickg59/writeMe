
$("#citeButton").click(function() {
  var bookTitle = $('#title').val();
  var bookPub = $('#publisher').val();
  var bookCity = $('#city').val();
  var bookYear = $('#year').val();
  var bookAuthF = $('#authOne').val();
  var bookAuthM = $('#authTwo').val();
  var bookAuthL = $('#authThree').val();
  var citeType = $('.cites').val()
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
      "title": bookTitle, //needs to call var
      "publisher": bookPub,//needs to call var
      "city": bookCity,//needs to call var
      "year": bookYear//needs to call var
    },
    "contributors": [
      {
        "function": "author",
        "first": bookAuthF, //needs to call var first name letter
        "middle": bookAuthM, //needs to call var last name letter
        "last": bookAuthL//needs to call var last name
      }
    ]
  }
  ajaxRequest(book).then(function(data) {
  var obj = JSON.parse(data)
    $(".results").append('<h4>' + obj.data + '</h4>')
    console.log(data, obj)
  })
});
/*var website = {
"key": "0d73c64055db71b85f97611cef9b0df3",
"source": "website",
"style": "mla7",
"website": {
"title": "  " //needs to call var website title
},
"pubtype": {
"main": "pubonline"
},
"pubonline": {
"title": " ", //needs to call var webstite
"inst": "  ", //needs to call var website owner
"day": "  ", //needs to call var day published
"month": "  ", //needs to call var month published
"year": "  ", //needs to call var year published
"dayaccessed": "  ", //needs to call var day accessed
"monthaccessed": "  ", //needs to call var month accessed
"yearaccessed": "  " //needs to call var year accessed
},
"contributors": [
{
"function": "author",
"first": "  ", //needs to call var first name letter
"middle": "  ", //needs to call var last name letter
"last": "  " //needs to call var last name
}
]
}


var journal = {
"key": "[your api key]",
"source": "journal",
"style": "mla7",
"journal": {
"title": "Specific journal article title"
},
"pubtype": {
"main": "pubjournal"
},
"pubjournal": {
"title": "Title of journal",
"vol": "volume number",
"issue": "issue number",
"series": "series description",
"year": "2001",
"start": "89",
"end": "100",
"nonconsecutive": "0"
},
"contributors": [
{
"function": "author",
"first": "Firstname",
"middle": "Middlename",
"last": "Lastname"
}
]
}*/


function ajaxRequest(data) {
  return $.ajax({
    url: 'https://galvanize-cors-proxy.herokuapp.com/https://api.citation-api.com/2.1/rest/cite',
    method: 'PUT',
    data: JSON.stringify(data),
    contentType: 'application/json'
  });
}
