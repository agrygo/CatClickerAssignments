
function loadData() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street  + ", " + city;
    $greeting.text("So you want to live at " + address + '?');

    var GMkey = "AIzaSyDeuJxQadxyoLBAhtLXC3pMkv1SBm-NzMU";
    var NYTkey = "ea4301fe2fe24633a9e74d20caf10896"
    var GMurl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=' + GMkey + '';
    $body.append('<img class="bgimg" src="'+ GMurl +'">');

    //NY Times
    var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&sort=newest&api-key=" + NYTkey + "";
    $.getJSON(NYTurl, function(data){

        //set header text
        $nytHeaderElem.text('New York Times Articles About ' + city);
        var articles = data.response.docs;
        for (var i=0, il=articles.length; i < il; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+
                    '</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };

    }).error(function(e){
        $nytHeaderElem.text('NY Times articles not available at this time');
    });

    //Wikipedia with JSONP
    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json";
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Wiki fail");
    }, 3000);

    //use .ajax to make call
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        //jsonp: "callback",  //not needed as this is the default
        //type: 'GET',  //default? yes - in jQuery docs http://api.jquery.com/jquery.ajax/
    }).done(function( response ) {
            var articleList = response[1];

            for (var i=0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = "http://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');

            };

            clearTimeout(wikiRequestTimeout);
        }
    );



    //loop through response and append results to page



    return false;
};

$('#form-container').submit(loadData);
