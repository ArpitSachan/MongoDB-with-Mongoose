//jshint esversion:6

const mongoose = require('mongoose');


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name:"Banana",
  rating: 4,
});
// fruit.save();
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "pineapple",
  rating: 8,
  review: "ok ok fruit"
});
pineapple.save();
Person.updateOne({name:"John"}, {favFruit: pineapple}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Succesfully added");
  }
})
const person = new Person({
  name: "John",
  age: 37,
  favFruit: fruit
});
// person.save();


// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 0,
//   review: "tatti fruit"
// });
// const mango = new Fruit({
//   name: "Mango",
//   rating: 8,
//   review: "great fruit"
// });
// const grapes = new Fruit({
//   name: "Grapes",
//   rating: 9,
//   review: "jaan le lo fruit"
// });

// Fruit.insertMany([kiwi, mango, grapes], function(err){
//   if(err)
//   {
//     console.log(err);
//   }else{
//     console.log("succesfully saved!");
//   }
// })

Fruit.find(function(err, fruits){
  if(err)
  {
    console.log(err);
  }else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
})


Fruit.updateOne({_id: "5ee926966b8f23059ce36b09"}, {review:"lmao"}, function(err)
{
  if(err){
    console.log(err);
  }else{
    console.log("succesfully updated");
  }
})

Fruit.deleteOne({name:"Banana"}, function(err)
{
  if(err){
    console.log(err);
  }else{
    console.log("succesfully deleted");
  }
})
// Person.deleteMany({name: "John"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("succesfully deleted");
//   }
// })
