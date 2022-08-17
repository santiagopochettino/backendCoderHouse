class User {
  constructor(name, lastName, books, pets){
    this.name = name;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
  }
  getFullName(){
     return console.log(`Full name: ${this.name} ${this.lastName}`)
  }
  addPet(newPet){
    this.pets.push(newPet);
  }
  countPets(){
    return this.pets.length;
  }
  addBook(name, author){
    this.books.push({name, author});
  }
  getBookNames(){
    return this.books.map(({name}) => name);
  }
}

let pets = ['Dog', 'Elephant'];
let books = [
  {
    name :'Fifty Shades of Grey',
    author:'E. L. James'
  },
  {
    name:'The Maze Runner',
    author:' James Dashner',
  },

];

let user = new User('Santiago', 'Pochettino',books, pets)
//Add new pet
user.addPet('Cat');
//add new book
user.addBook('El principito', 'Antoine de Saint-Exupéry')

console.log(user);
//Count number of pets
console.log(`Number of pets: ${user.countPets()}`)
//Return name of books
console.log(user.getBookNames())
