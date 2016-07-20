/****Model****/
//object literal(comma separated list of key:value pairs)of cats with their properties
var model = {
	catCurrent: null,
	cats: [
		{
			name: 'Blacky',
			catCurrentClicks: 0,
			imgSrc: "images/Blacky.jpg"
		},
		{
			name: 'Fluffy',
			catCurrentClicks: 0,
			imgSrc: "images/Fluffy.jpg"
		},
		{
			name: 'Lazy',
			catCurrentClicks: 0,
			imgSrc: "images/Lazy.jpg"
		},
		{
			name: 'Tabby',
			catCurrentClicks: 0,
			imgSrc: "images/Tabby.jpg"
		},
		{
			name: 'Zule',
			catCurrentClicks: 0,
			imgSrc: "images/Zule.jpg"
		}
	],
	adminView: false,


};

/****View****/
//Two views; init fxn store connections to DOM & call render fxn, render fxn
//
var catListView = {
	init: function(){
		//DOM element for cat name
		this.catListElem = document.getElementById('catList');  //use vs JQuery to get actual DOM object vs. JQuery object

		//update cat list in DOM with cat names
		this.render()

	},

	render: function(){
		var cats = controller.getCats();
		var cat, elem, i;
		console.log (cats);

		//empty cat list
		this.catListElem.innerHTML = "";

		//loop over cats and populate list
		for (i=0; i<cats.length; i++){
			//current cat
			cat = cats[i];

			//make new cat list item and set text = to current cat name
			elem = document.createElement('li');
			elem.textContent = cat.name;

			//when cat name is clicked, set the catCurrent name, clicks, and image
			//closure-in-a-loop to connect value of cat var to click event fxn
			elem.addEventListener('click', (function(catInfo){
				return function() {
					controller.setCurrentCat(catInfo);
					catImgView.render();
				};
			})(cat));


            // finally, add the element to the list
            this.catListElem.appendChild(elem);

		}
	}
};

var catImgView = {
	init: function(){
		//DOM element for cat image
		this.catElem = document.getElementById('cat');
		this.catImgElem = document.getElementById('catImg');
		this.catCurrentElem = document.getElementById('catName');
		this.catCurrentClicks = document.getElementById('catClicks');

		//increment current cat counter on click
		this.catImgElem.addEventListener('click', function(){
			controller.incrementCounter();
		})

		//update cat img in DOM
		this.render()
	},

	render: function() {
		//update cat information about current cat
		var currentCat = controller.getCurrentCat();
		console.log("current cat" + currentCat);
		this.catCurrentClicks.textContent = currentCat.catCurrentClicks;
		this.catImgElem.src = currentCat.imgSrc;
		this.catCurrentElem.textContent = currentCat.name;
	}
};

var adminView = {
	init: function () {
		// show admin panel when Admin button is clicked
		this.adminBtnElem = document.getElementById('adminBtn');
		this.saveBtnElem = document.getElementById('saveBtn');
		this.cancelBtnElem = document.getElementById('cancelBtn');
		this.adminNameElem = document.getElementById('AdminCatName');
		this.adminURLElem = document.getElementById('AdminCatURL');
		this.adminClicksElem = document.getElementById('AdminCatClicks');
		this.adminBtnElem.addEventListener('click', function(){
			console.log("admin btn clicked");
			controller.showAdmin();
		});
		this.saveBtnElem.addEventListener('click', function(){
			console.log("save btn clicked");
			this.adminNameElem = document.getElementById('AdminCatName');
			var newName = this.adminNameElem.value;
			console.log(newName);
			controller.updateData(newName);
		})
	},

	render: function(){
		//find state of adminView from controller
		state = controller.getAdminState();
		if (state) {
			document.getElementById("adminPanel").style.visibility = "visible";
			var catData = controller.getCurrentCat();
			console.log("cat" + catData);
			this.adminNameElem.value = catData.name;
			this.adminURLElem.value = catData.imgSrc;
			this.adminClicksElem.value = catData.catCurrentClicks;
		}
	},

	update: function(){

	}
};

//render fxn to display

/****Controller****/
var controller = {

	init: function(){
		//set current cat to first in list
		model.catCurrent = model.cats[0];
		//initialize views
		catListView.init();
		catImgView.init();
		adminView.init();
	},

	getCurrentCat: function(){
		return model.catCurrent;
	},

	getCats: function() {
		return model.cats;
		console.log(model.cats);
	},

	//set the current cat to the object passed in
	setCurrentCat: function(cat) {
		model.catCurrent = cat;
	},

	incrementCounter: function(){
		model.catCurrent.catCurrentClicks++;
		catImgView.render();
	},

	showAdmin: function(){
		model.adminView = true;
		adminView.render();
	},

	getAdminState: function(){
		return model.adminView;
	},

	updateData: function(newName){
		model.catCurrent.name = (newName);
	}


};

controller.init();




