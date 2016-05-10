$(document).ready(function(){
	var clickCount = 0;
	$('#cat').click(function(){
		console.log("cat clicked");

		clickCount ++;
		console.log(clickCount);
		$('.counter').html("You clicked on the cat " + clickCount + " time(s)!");

	})
})