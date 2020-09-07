class Food {

  constructor() {

    this.image = loadImage("Images/Milk.png");
    this.foodStock = 0;
  }

  updateFoodStock(food){

   this.foodStock = food

  }

  display() {

    var x = 30;
    var y = 50;

    if(this.foodStock !== 0) {
      for(var i = 0; i < this.foodStock; i++) {

        if(i % 10 === 0) {

          x = 30;
          y = y + 50;

        }

        imageMode(CENTER);
        image(this.image, x, y, 60, 60);

        x = x + 30;

      }

    }

   

  }
 
}