//Create variables here
var dog_img;
var database;
var food, foodStock;

var foodObj;
var feedDogButton, addFoodButton;
var fedTime, lastFed;

var dogName = "dog";

function preload(){

  dog_img = loadImage("Images/Dog.png");

}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  foodObj = new Food();

  database.ref("Food").on("value", readStock);

  database.ref("Name").on("value", readName);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(520, 350);
  addFoodButton.mousePressed(addFood);

  input = createInput("Enter Your Pet's Name");
  input.position(130, 50);

  changeNameButton = createButton("Change Pet's name");
  changeNameButton.position(202, 70);
  changeNameButton.mousePressed(petName);

}

 function readName(data) {

  dogName = data.val();
  
}

function readStock(data) {

  food = data.val();
  foodObj.updateFoodStock(food);
  
}

function draw() {  

  background(46, 139, 87);

  image(dog_img, 300, 300, 150, 150);

  foodObj.display();

  feedDogButton = createButton("Feed "+dogName);
  feedDogButton.position(375, 350);
  feedDogButton.mousePressed(feedDog);

  database.ref("feedTime").on("value", function(data){

    lastFed = data.val();

  });

  if(input.value() === "Enter Your Pet's Name" || input.value() === null) {

    feedDogButton.hide();
    fill("red");
    textSize(25);
    text("Enter Pet's Name", 15, 490);

  }

  fill("black");
  textSize(30);
  if(lastFed>=12) {

    text("Last Fed: " + lastFed % 12 + " PM ", 10, 40);

  } else if(lastFed === 0){

    text("Last Fed: 12 AM", 10, 40)

  } else {

    text("Last Fed: " + lastFed + " AM ", 10, 40);

  }

  if(food!==undefined) {

    text("Milk Bottles Remaining: " + food, 10, 230);

  } else {

    text("Milk Bottles Remaining: ", 10, 230);

  }

  drawSprites();

}

function addFood() {

  if(food >= 20){

    food = 20;

  } else {

    food++;

  }

  database.ref('/').update({

    Food: food

  });

}

function feedDog() {

  if(food <= 0){

    food = 0;

  } else {

    food = food-1;

  }

  database.ref('/').update({

    Food: food,
    feedTime: hour()

  })
  
}

function petName() {

  database.ref('/').update({

    Name: input.value()

  })
  
}