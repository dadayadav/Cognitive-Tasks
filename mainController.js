app.service('randomInteger', function() {
	this.gen= function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
})


app.controller('mainController', function($scope, randomInteger, $timeout){
	// Colour-Word Test Logic

	$scope.homeShow = true;
	$scope.wordShow = false;
	$scope.memShow = false;
	$scope.memCheck = false;
	$scope.resultShow = false;
	$scope.openWord = false;
	$scope.plusButtonWord = true;
	$scope.openNum = false;
	$scope.plusButtonNum = true;
	$scope.openImage = false;
	$scope.plusButtonImage = true;
	var timer;
	let choice = new Set ();
	var words = ["purple", "green", "red", "blue", "yellow", "orange", "pink", "white", "brown"];
	var colors = ["darkpurple", "lightpurple", "medpurple", "darkgreen", "lightgreen", "medgreen", "darkred", "lightred", "medred",
	"darkblue", "lightblue", "medblue", "darkyellow", "lightyellow", "darkorange", "hotpink", "darkpink", "lightpink", "medpink", "white", "darkbrown", "lightbrown", "medbrown"];
	var dict = {
		"purple": ["darkpurple", "lightpurple", "medpurple"],
		"green": ["darkgreen", "lightgreen", "medgreen"],
		"red": ["darkred", "lightred", "medred"],
		"blue": ["darkblue", "lightblue", "medblue"],
		"yellow": ["darkyellow", "lightyellow"],
		"orange": ["darkorange"],
		"pink": ["hotpink", "darkpink", "lightpink"],
		"white": ["white"],
		"brown": ["darkbrown", "lightbrown", "medbrown"]
	};

	// Array
	 var incorr = [
	[["Apple", "Flower", "Cat", "Bell", "Cup", "Cake", "Spectacles", "Gloves", "Ball", "Toy", "Whiteboard", "Sandwich","Balloons", "Giftpack", "Parrot", "Trees", "Pencil", "Globe", "Ring", "Fish"],
	["Watermelon", "Lizard", "Soft Drink", "Button", "Skull", "Eyeball", "Star", "Penguin", "Almond", "Bat", "Flag", "Butterfly", "Pumpkin", "Tulip", "Gift", "Easter Egg", "Pinapple", "Tree", "Car", "Rocket"],
	["ButterFly", "Crossword", "Firework", "Goldfish", "Hosepipe", "Lighthouse", "Rainbow", "Scarecrow", "Snowman", "Strawberry", "Sunflower", "Toothbrush", "MotorBike", "Windmill", "Notepad", "Cactus", "Sun", "Starfish", "Umbrella", "Starfish"],
	["Curtains", "Flip-Flops", "Furnace", "Log", "Vase", "Chimney", "Bookshelf", "Chair", "Vase", "Map", "Lamp", "Books", "Windows", "Fire", "Plant", "Cat", "Dog", "Potrait", "Fan", "Kettle"],
	["Bicycle", "Boat", "HotAir Balloon", "Horse", "MiniBus", "Anchor", "Sun", "Cactus", "Coconut Tree", "Starfish", "Umbrella", "SunGlasses", "Boot", "RowBoat", "Cart", "TableTennis", "Notepad", "Hosepipe", "Lighthouse" ,"Rainbow"],
	["ButterFly", "Crossword", "Firework", "Goldfish", "Hosepipe", "Lighthouse", "Rainbow", "Scarecrow", "Snowman", "Strawberry", "Sunflower", "Toothbrush", "MotorBike", "Windmill", "Notepad", "Cactus", "Sun", "Starfish", "Umbrella", "Starfish"],
	["Baseball Bat", "Rain Boots", "Paper", "Sand Toys", "Shoes", "Carrot", "Car", "Baby Bottle", "Brush", "Pants", "Light Bulb", "Nail Polish", "Nest", "Blanket", "Toothbrush", "Watering Can", "Milk", "Floaties", "Hat", "Umbrella"],
	["Pencil Case", "Pencil", "Eraser", "Book", "Crayons", "Chair", "Desk", "Backpack", "Papers", "Coloured Pencils", "Ruler", "Glue", "PaintBrush", "Paints", "Compass", "Divider", "Protractor", "Paper Clips", "Marker", "Fountain Pen"],
	["School Bus", "Teacher", "ABC", "123", "Slide", "Pencil", "Guitar", "Swing", "FoodPlate", "Chef", "Calendar", "Chemistry", "Helmet", "BasketBall", "Locker", "Grade Card", "Desk", "Fountain Pen", "Glue", "Backpack"],
	["Bicycle", "Green Apple", "Dog", "Cola", "Aeroplane", "Tea", "Handshake", "Ball", "Tooth", "9", "K", "Car", "Bird", "Piano", "Axe", "Umbrella", "Cap", "Road", "Boat", "Train"]
	],

	[[12,15,20,56,10,8,96,55,48,45,66,88,33,22,77,70,80,30,98,89],
	[2,4,8,16,56,66,77,90,100,125,136,150,160,170,180,80,55,67,78,5],
	[122,146,322,422,524,452,652,854,425,956,448,378, 377,423,453,147,985,957,379,147],
	[122,146,322,422,524,452,652,854,425,956,448,378,895,635,758, 759,449,855,525,653],
	[1205,1150,458,4596,2563,2351,2589,6356,7854,8965,7584,3265, 9856,4587,5256,4584,2154,2355,8542,5265,3258,9653],
	[78,56,89,12,45,75,53,86,10,75,15,35,84,67, 68,13,16,56,55,48],
	[125,136,451,896,458,152,146,164,758,964,235, 236,225,153,165,153,996,761,556, 987],
	[20,40,80,90,110,120,150,180,190,450,164,460,890,780,650,560,830,870,570,460],
	[20,40,80,90,110,120,150,180,190,450,164,460,890,780,650,560,830,870,570,460],
	[125,452,356,485,795,452,256,563,785,985,856,1000,135,25,56, 564,986,857,786,453,357,486,57]
	],
	[
	["Afternoon", "Aircraft", "Airplane", "Airport", "Anyone", "Anyhow", "Anywhere", "Applesauce", "Around", "Aftermath", "Armpit", "Arrowhead", "Armchair", "Airbrush", "Airbus", "Abandon", "Art", "Article", "abusive", "access"],
	["Lig", "Sig", "Jif", "Tig", "Gif", "Esx", "Ght", "Ndh", "Nhds", "Dhd", "Bcs", "Dnc", "Sif", "Jdf", "Lkj", "Aux", "Ytx","Udv", "hin", "ber"],
	["birth", "police","wall", "cow", "day", "man", "paper", "boy", "butter", "foot", "back", "pan", "fly", "ball", "pack", "cake", "light", "rain", "blue", "pepper"],
	["anyway", "background", "championship", "daytime", "farewell", "grandchild", "honeybee", "indoors", "lookout", "maybe", "newborn", "pancake", "quicksand", "railroad", "sartfish", "toothpaste", "upgrade", "volleyball", "wildcat", "yearbook"],
	["Living room", "Campfire", "Earthworm", "Popcorn", "Ice-cream", "Snowball", "Esteem", "School", "High School", "Backbone", "Backseat", "Anyone", "Bodyguard", "Cannot", "Copyright", "Clockwise", "Room", "Camp", "Popsong", "Carrot"],
 	["SAND", "POT", "WALK", "FLOWER", "PAPER","BACK","OVER","HEART","HOLE","SWEET","FISH","BURN","CAT" ,"SLEEP","DUST","BRAIN","FLY","BOWL", "COTH", "WASH"],
	["Agony","Fooled","Apocalypse","Frantic","Armageddon","Frightening","Assault","Gambling","Backlash","Gullible","Beating","Hack","Beware","Hazardous","Blinded","Hoax", "Harmful", "Dangerous", "Backend", "Hacker"],
	["kab","gep", "vut","nol","jot","giz","kel","Pal","rab","dur","kaz","hin","big","ber","Lig", "Sig", "Jif", "Tig", "Gif", "Esx", "Ght", "Ndh"],
	["cat", "sat", "wet", "net", "fun", "sun", "dog", "log", "man", "can", "bin", "pin", "hot", "cot", "ten", "sin", "fog", "son", "men", "tin"],
	["Bowtie","Buckshot","Bedrock","Blackmail","Backfire","Backpack","Background","Bluebird", "Blackberries","Blueprint","Campfire","Chalkboard","Classroom","Cowboy","Carsick","Cargo","Cheeseburger","Chairman", "Crosswalk", "Cupcake"]
	]
 	];


 	var corr=[
 		[
 			["Apple", "Flower", "Cat", "Bell", "Cup", "Cake", "Spectacles", "Gloves", "Ball", "Toy", "Whiteboard", "Sandwich","Balloons", "Giftpack", "Parrot", "Trees", "Pencil", "Globe"],
 			["Watermelon", "Lizard", "Soft Drink", "Button", "Skull", "Eyeball", "Star", "Penguin", "Almond", "Bat", "Flag", "Butterfly", "Pumpkin", "Tulip", "Gift", "Easter Egg"],
 			["ButterFly", "Crossword", "Firework", "Goldfish", "Hosepipe", "Lighthouse", "Rainbow", "Scarecrow", "Snowman", "Strawberry", "Sunflower", "Toothbrush", "MotorBike", "Windmill", "Notepad"],
 			["Curtains", "Flip-Flops", "Furnace", "Log", "Vase", "Chimney", "Bookshelf", "Chair", "Vase", "Map", "Lamp", "Books", "Windows", "Fire"],
 			["Bicycle", "Boat", "HotAir Balloon", "Horse", "MiniBus", "Anchor", "Sun", "Cactus", "Coconut Tree", "Starfish", "Umbrella", "SunGlasses", "Boot", "RowBoat", "Cart", "TableTennis"],
 			["ButterFly", "Crossword", "Firework", "Goldfish", "Hosepipe", "Lighthouse", "Rainbow", "Scarecrow", "Snowman", "Strawberry", "Sunflower", "Toothbrush", "MotorBike", "Windmill", "Notepad"],
 			["Baseball Bat", "Rain Boots", "Paper", "Sand Toys", "Shoes", "Carrot", "Car", "Baby Bottle", "Brush", "Pants", "Light Bulb", "Nail Polish", "Nest", "Blanket", "Toothbrush", "Watering Can", "Milk", "Floaties"],
 			["Pencil Case", "Pencil", "Eraser", "Book", "Crayons", "Chair", "Desk", "Backpack", "Papers", "Coloured Pencils", "Ruler", "Glue", "PaintBrush", "Paints"],
 			["School Bus", "Teacher", "ABC", "123", "Slide", "Pencil", "Guitar", "Swing", "FoodPlate", "Chef", "Calendar", "Chemistry", "Helmet", "BasketBall", "Locker", "Grade Card"],
 			["Bicycle", "Green Apple", "Dog", "Cola", "Aeroplane", "Tea", "Handshake", "Ball", "Tooth", "9", "K", "Car", "Bird", "Piano", "Axe", "Umbrella", "Cap"]
 			],

 		[
 		[12,15,20,56,10,8,96,55,48,45,66,88,33,22,77,70,80,30],
		[2,4,8,16,56,66,77,90,100,125,136,150],
		[122,146,322,422,524,452,652,854,425,956,448,378],
		[122,146,322,422,524,452,652,854,425,956,448,378,895,635,758],
		[1205,1150,458,4596,2563,2351,2589,6356,7854,8965,7584,3265],
		[78,56,89,45,12,45,75,53,86,10,75,15,35,84,67],
		[125,136,451,896,458,152,146,164,758,964,458,235],
		[20,40,80,90,110,120,150,180,190,450,164,460,890,780,650,560,830,870],
		[20,40,80,90,110,120,150,180,190,450,164,460,890,780,650],
		[125,452,356,485,795,452,256,563,785,985,856,1000,135,25,56]
 		],

 		[
 		["Afternoon", "Aircraft", "Airplane", "Airport", "Anyone", "Anyhow", "Anywhere", "Applesauce", "Around", "Aftermath", "Armpit", "Arrowhead", "Armchair", "Airbrush", "Airbus", "Abandon", "Art", "Article"],
		["Lig", "Sig", "Jif", "Tig", "Gif", "Esx", "Ght", "Ndh", "Nhds", "Dhd", "Bcs", "Dnc", "Sif", "Jdf", "Lkj", "Aux", "Ytx","Udv"],
		
		["birth", "police","wall", "cow", "day", "man", "paper", "boy", "butter", "foot", "back", "pan", "pan", "fly", "ball", "pack", "cake"],
		["anyway", "background", "championship", "daytime", "farewell", "grandchild", "honeybee", "indoors" ,"lookout", "maybe", "newborn", "pancake", "quicksand", "railroad", "sartfish", "toothpaste"],
		["Living room", "Campfire", "Earthworm", "Popcorn", "Ice-cream", "Snowball", "Esteem", "School", "High School", "Backbone", "Backseat", "Anyone", "Bodyguard", "Cannot", "Copyright", "Clockwise"],
		
 		["SAND", "POT", "WALK", "FLOWER", "PAPER","BACK","OVER","HEART","HOLE","SWEET","FISH","BURN","CAT" ,"SLEEP","DUST","BRAIN","FLY","BOWL"],
		["Agony","Fooled","Apocalypse","Frantic","Armageddon","Frightening","Assault","Gambling","Backlash","Gullible","Beating","Hack","Beware","Hazardous","Blinded","Hoax"],
		["kab","gep", "vut","nol","jot","giz","kel","Pal","rab","dur","kaz","hin","big","ber"],
		["cat", "sat", "wet", "net", "fun", "sun", "dog", "log", "man", "can", "bin", "pin", "hot", "cot", "ten"],
		["Bowtie","Buckshot","Bedrock","Blackmail","Backfire","Backpack","Background","Bluebird", "Blackberries","Blueprint","Campfire","Chalkboard","Classroom","Cowboy","Carsick","Cargo","Cheeseburger","Chairman"]
 		]
 	];


	// finish










	$scope.panelConfigWord = function() {
		$scope.openWord = !($scope.openWord);
		$scope.plusButtonWord = !($scope.plusButtonWord);
	}
	$scope.panelConfigNum = function() {
		$scope.openNum = !($scope.openNum);
		$scope.plusButtonNum = !($scope.plusButtonNum);
	}
	$scope.panelConfigImage = function() {
		$scope.openImage = !($scope.openImage);
		$scope.plusButtonImage = !($scope.plusButtonImage);
	}
	$scope.changeClass = function() {
		$scope.colorNumber = randomInteger.gen(0,22);
		$scope.class = colors[$scope.colorNumber];
	}
	$scope.changeWordPage = function() {
		$scope.homeShow = !($scope.homeShow);
		$scope.wordShow = !($scope.wordShow);
	}
	$scope.resultPage = function() {
		$scope.stopWordTimer();
		$scope.wordShow = !($scope.wordShow);
		$scope.resultShow = !($scope.resultShow);
	}
	$scope.reloadPage = function() {
		window.location.reload();
	}
	$scope.diffWord = function() {
		$scope.wordNumber = randomInteger.gen(0,8);
		$scope.color = words[$scope.wordNumber];
	}
	$scope.genOptions = function() {
		$scope.arr = [];
		var nums = [];
		while (nums.length < 5) {
			var randnum = randomInteger.gen(0,8);
			if (nums.indexOf(randnum) > -1) continue;
			nums[nums.length] = randnum;
		}
		var i = 0;
		while (i < nums.length) {
			$scope.arr.push(words[nums[i]]);
			i++;
		}
		var a = 0;
		var match = false;
		while (a < $scope.arr.length) {
			if ($scope.class.indexOf($scope.arr[a]) !== -1) {
				$scope.answer = $scope.arr[a];
				match = true;
				break;
			}
			else { a++; }
		}
		if (match === false) {
			var index = randomInteger.gen(0,4);
			var pos = 0;
			while (pos < Object.keys(dict).length) {
				if ($scope.class.indexOf(Object.keys(dict)[pos]) !== -1) {
					$scope.answer = Object.keys(dict)[pos];
					$scope.arr[index] = Object.keys(dict)[pos];
					break;
				}
				else { pos++; }
			}
		}
		console.log($scope.arr);
	}

	// Timer:

	$scope.stopWordTimer = function() {
		$timeout.cancel(timer);
		timer = null;
	};
	$scope.startWordTimer = function() {
		$scope.time = 3;
		if (timer == null) {
			updateWordTimer();
		}
	};
	var updateWordTimer = function() {
		$scope.time--;
		timer = $timeout(updateWordTimer, 1000);
		if ($scope.time == 0) {
			$scope.next();
		}
	};


	$scope.verify = function(x) {
		if (x === $scope.answer) {
			$scope.score++;
			console.log(x);
		}
		$scope.question++;
	}

	$scope.startBtn = function() {
		$scope.score = 0;
		$scope.question = 1;
		$scope.startWordTimer();
		$scope.changeWordPage();
		$scope.diffWord();
		$scope.changeClass();
		$scope.genOptions();
	}

	$scope.next = function(x) {
		$scope.stopWordTimer();
		$scope.startWordTimer();
		if ($scope.question === 15) {
			$scope.verify(x);
			$scope.stopWordTimer();
			$scope.resultPage();
		}
		else {
			$scope.verify(x);
			$scope.diffWord();
			$scope.changeClass();
			$scope.genOptions();
		}
		
	}


	// Number Test Logic

	var sizes = ["tiny", "small", "medsmall", "medium", "big", "verybig", "large"];
	$scope.numberShow = false;
	$scope.changeNumberPage = function() {
		$scope.homeShow = !($scope.homeShow);
		$scope.numberShow = !($scope.numberShow);
	}
	$scope.changeSizeClass = function() {
		$scope.sizeNumberOne = randomInteger.gen(0,6);
		$scope.sizeClassOne = sizes[$scope.sizeNumberOne];
		$scope.sizeNumberTwo = randomInteger.gen(0,6);
		$scope.sizeClassTwo = sizes[$scope.sizeNumberTwo];
	}
	$scope.diffNum = function() {
		$scope.numOne = randomInteger.gen(0,9);
		$scope.numTwo = randomInteger.gen(0,9);
	}
	$scope.verifyNum= function(x) {
		if ($scope.numOne > $scope.numTwo) {
			if (x == $scope.numOne) {
				$scope.score++;
				console.log(x);
			}
		}
		else if ($scope.numOne < $scope.numTwo) {
			if (x == $scope.numTwo) {
				$scope.score++;
				console.log(x);
			}
		}
		else {
			$scope.score++;
			console.log(x);
		}
		$scope.question++;
	}

	$scope.stopNumTimer = function() {
		$timeout.cancel(timer);
		timer = null;
	};
	$scope.startNumTimer = function() {
		$scope.time = 2;
		if (timer == null) {
			updateNumTimer();
		}
	};
	var updateNumTimer = function() {
		$scope.time--;
		timer = $timeout(updateNumTimer, 1000);
		if ($scope.time == 0) {
			$scope.nextNum();
		}
	};

	$scope.quit = function() {
		$scope.stopNumTimer();
		$scope.numberShow = !($scope.numberShow);
		$scope.resultShow = !($scope.resultShow);
	}

	$scope.startNumberBtn = function() {
		$scope.score = 0;
		$scope.question = 1;
		$scope.startNumTimer();
		$scope.changeNumberPage();
		$scope.changeSizeClass();
		$scope.diffNum();
	}
	$scope.nextNum = function(x) {
		$scope.stopNumTimer();
		$scope.startNumTimer();
		if ($scope.question === 15) {
			$scope.verifyNum(x);
			$scope.stopNumTimer();
			$scope.quit();
		}
		else {
			$scope.verifyNum(x);
			$scope.diffNum();
			$scope.changeSizeClass();
		}
	}

    // Memory Test
    //Timer
 	$scope.stopMemTimer = function() {
		$timeout.cancel(timer);
		timer = null;
	};
 
    var updateMemTimer = function() {
		$scope.time--;
		timer = $timeout(updateMemTimer, 1000);
		if ($scope.time == 0) {
			$scope.changeMemCheckPage();
		}
	};

	$scope.startMemTimer = function() {

		$scope.time = 10;
		if (timer == null) {
			updateMemTimer();
		}
	};

    // Main
	$scope.changeMemPage = function() {
		$scope.homeShow = !($scope.homeShow);
		$scope.memShow = !($scope.memShow);
	}

	$scope.changeMemCheckPage = function() {
        $scope.stopMemTimer();
		$scope.memCheck = !($scope.memCheck);
        $scope.memShow = !($scope.memShow);
	}

    $scope.showImage = function() {
        $scope.imageNum = randomInteger.gen(1, 10);
    }

    $scope.nextImage = function() {
        $scope.stopMemTimer();
        $scope.startMemTimer();
        $scope.showImage();
    }

	$scope.startMemBtn = function(x) {
		$scope.typ = x;
		choice.clear();
		if(x == 0){
			$scope.name = "I";
			$scope.type = "jpg";
		}
		else if(x==1)
		{
			$scope.name = "N";
			$scope.type = "png";
		}
		else if(x== 2)
		{
			$scope.name = "w";
			$scope.type = "png";
		}
		$scope.score = 0;
		
		$scope.startMemTimer();
		$scope.changeMemPage();
        $scope.showImage();
        $scope.genChoices();
	}

    $scope.submit = function() {
    	$scope.stopWordTimer();
        $scope.calcScore();
		$scope.memCheck = !($scope.memCheck);
       // $scope.homeShow = !($scope.homeShow);
       $scope.resultShow = !($scope.resultShow);
    }


    $scope.calcScore = function() {
    	console.log(choice);
        var i = 0;
        $scope.total = corr[$scope.typ][$scope.imageNum-1].length;
        console.log($scope.total);
        while ( i < corr[$scope.typ][$scope.imageNum-1].length){
        	console.log($scope.score);
            if ( choice.has(corr[$scope.typ][$scope.imageNum-1][i]))  $scope.score++;
            i++;
        }
        console.log(choice.size - $scope.score);
        $scope.score = $scope.score - (choice.size - $scope.score)*4;
    }
 $scope.memquit = function() {
        $scope.stopMemTimer();
		$scope.memShow = !($scope.memShow);
        $scope.homeShow = !($scope.homeShow);
    }

    $scope.genChoices = function() {
		//$scope.arr = [];
		//$scope.imageNum = 1;

		$scope.arr1 = [];
		$scope.arr2 = [];
		$scope.arr3 = [];
		$scope.arr4 = [];
		var nums = [];
		while (nums.length < 20) {
			var randnum = randomInteger.gen(0,19);
			if (nums.indexOf(randnum) > -1) continue;
			nums[nums.length] = randnum;
		}
		var i = 0;
		while (i < 5) {
			$scope.arr1.push(incorr[$scope.typ][$scope.imageNum-1][nums[i]]);
			i++;
		}
		while (i < 10) {
			$scope.arr2.push(incorr[$scope.typ][$scope.imageNum-1][nums[i]]);
			i++;
		}
		while (i < 15) {
			$scope.arr3.push(incorr[$scope.typ][$scope.imageNum-1][nums[i]]);
			i++;
		}
		while (i < 20) {
			$scope.arr4.push(incorr[$scope.typ][$scope.imageNum-1][nums[i]]);
			i++;
		}

		console.log($scope.arr1);
    }
$scope.lock1 = function(x) {
        choice.add(x);
   // console.log(choice);
}
 $scope.lock2 = function(x) {
        choice.add(x);
  //  console.log(choice);
    }
    $scope.lock3 = function(x) {
        choice.add(x);
   // console.log(choice);
    }
    $scope.lock4 = function(x) {
        choice.add(x);
   // console.log(choice);
    }


});	


