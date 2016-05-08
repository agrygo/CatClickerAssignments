
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
    console.log(address);
    $greeting.text("So you want to live at " + address + '?');

    var GMkey = "AIzaSyDeuJxQadxyoLBAhtLXC3pMkv1SBm-NzMU";
    var NYTkey = "ea4301fe2fe24633a9e74d20caf10896"
    var url = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=' + GMkey + '';
    console.log(url);
    $body.append('<img class="bgimg" src="'+ url +'">');

    //NY Times
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&sort=newest&api-key=" + NYTkey;
    console.log(url);
    $.getJSON(url, function(data){

        //set header text
        $nytHeaderElem.text('New York Times Articles About' + city);
        var articles = data.response.docs;
        console.log(articles);


    })



    return false;
};

$('#form-container').submit(loadData);
