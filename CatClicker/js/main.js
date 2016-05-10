/*$(document).ready(function(){
	var clickCount1 = 0;
	var clickCount2 = 0;
	$('#zule').click(function(){
		console.log("cat clicked");

		clickCount1 ++;
		console.log(clickCount1);
		$('.counter1').html("You clicked on Zule " + clickCount1 + " time(s)!");

	});
	$('#grumpy').click(function(){
		console.log("grumpy cat clicked");

		clickCount2 ++;
		console.log(clickCount2);
		$('.counter2').html("You clicked on Grumpy " + clickCount2 + " time(s)!");

	});
})*/


$(document).ready(function(){
	$('#catInfo').hide();
	var clickCount1 = [];
	var clickCount2 = [];

	var name = document.getElementsByTagName("li");

	/*for (var i=0, il=name.length; i<il; i++){
		name[i].click(function(){
			console.log("Cat clicked" + name);
		})
	}*/

	for (var i=0, il=name.length; i<il; i++){
		name[i].addEventListener("click", showCat);
	}

	function showCat(e){
		var name = e.target.attributes.id.value;
		console.log(name);
		var newImg = 'images/'+ name + '.jpg';
		console.log(newImg);
		$('#cat-img').attr('src', newImg);
		$('#catInfo').replaceWith();
		console.log("Cat clicked" + e.target.attributes.id.value);
		var name = e.target.attributes.id.value;
		$('#catInfo').replaceWith(name);
	}

});