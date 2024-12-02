//Initiating TS:
//  tsc --init 
namespace TypeAnnotation{//V
// The Primitive types. 
    //number, string, boolean, undefined, null

//Type Annotation:
    //Variables
    let id: number = 5;
    let company: string = "JBH";
    let isPublished: boolean = true;
    //Array of one type
    let ids: string[] = ["hello", "world"];
    //Array of several types
    let details: (string|number)[] = ["David", 0-772161681  ]
    //Nested array
    let experience: (string|number)[][]= [['Pwiz'],["RavTech"], [2, 'dd']]
    // Function (input and output types)
    const concatenateValues = (a: string, b: string): string =>{
        return a + b;
    }
    //Tuples: defining type for each index of the array
    const coord:[number, string] =  [1, "2"] 
    //Nested tuple
    const coords: [number, number][] = [[1, 2],[5,6]]

}
namespace Chaining{//V
    //Optional chaining  
        const arr = [{name: "tim"}]
        let el = arr.pop()?.name // el: string|undefined

    //Bang chaining: force it to be not undefined
        const name:string = arr.pop()!.name;

}
namespace TypeAliases{//V
    //Type Aliases:
    type Friends = string[];
    type SimpleFunc = (a: string, b: string)=>void;
    //Type alias is just a type.
    let myFriends:Friends = ["Chaim", "Miri"];

}
namespace AnyAndUnknown{//V
    // The type any can be any type
    let anything:any = 'l'

// The type unknown is a better idea than any, it forces us to make a type checking before using it.
    let x:unknown = 1;
    if(typeof x === "number"){
        const result = x + 1;
    }else if(typeof x == "string"){
        const result = x.length;
    }
    //Type Cast for unknown type. This is dangerous
    const result = (x as number) + 1 

}
namespace Interfaces{//V
    
//Interface:
    interface UserInterface {
    //readonly keyword makes it a constant property
        readonly id:number;
        name: string;
    //Optional field in an interface is annotated with a question mark.
        age?: number /*type of age: number|undefined*/
    //Function as a property.
        greet(massage: string):void;
    }
    // implementation of an interface
    const User: UserInterface ={
        id: 1,
        name: "Pedro",
        age: undefined,
        greet(massage){
            console.log(massage)
        }
    }
}
namespace UnionsAndIntersections{//V
    //Unions:
    type IDFieldType = string | number;
    //using the union like every other type
    const printID = (id: IDFieldType) => {
        console.log("ID: " + id);
    }

//Intersections:
    interface BusinessPartner {
        name: string;
        creditScore: number;
    }
    type UserIdentity = {
        id: number;
        email: string;
    }
    type Employee = BusinessPartner & UserIdentity;

}
namespace LiteralsAndEnums{//V
    //Literals: Literal is a constant instance of a primitive type.
    let direction: "north"|"south" 
    const miles = 3;
    
//Enums: 
    //Numeric enums. By default they have values up from 0. we can define the first value,
    //and it will increase by one in the next ones
    enum Direction {
        UP = 1,
        DOWN,
    } 
    const printDirection =(direction: Direction):void=>{
        switch(direction){
            case Direction.UP:
                console.log("UP")
            case Direction.DOWN:
                console.log("DOWN")
        }
    }
    //String Enums
    enum SDirection {
        UP = "UP",
        DOWN = "DOWN",
    }
    function printSDirection(direction: SDirection):void{
        switch(direction){
            case SDirection.UP:
                console.log(SDirection.UP)
            case SDirection.DOWN:
                console.log(SDirection.DOWN)
        }
    }
}
namespace FunctionOverloading{ //V
    //Function overloading
    function getBack(to: string): string;
    function getBack(to: number): number;
    function getBack(to : string| number):string | number{
        return to;
    }
   let a = getBack("David");// type is string. without the overloading, type of a was string|number, like here:
   function secondGetBack  (to: string|number): string|number{
    return to;
   }
   let b = secondGetBack("Dave")//type is string|number

}
namespace Classes{//V
// Classes
    //Simple concrete (not abstract) class. can not have abstract properties
    class Person {
        //By default, all properties of a class are public, meaning accessible from anywhere.
        private name: string; // private property is not accessible outside the class.
        protected address: string// protected property is accessible inside extending class.
        static counter: number = 0;// static property belongs to the prototype class itself, not to the instances of the class.
        constructor(name: string, address: string){
            this.name = name;
            this.address = address;
            Person.counter ++;
        }
        gteet(){
            console.log(`Hello, my name is ${this.name}`)
        }
        // Getter for private property
        getName(){
            if (this.name.length < 2) return ""
            return this.name;
        }
        // Setter for private property
        setName(name: string){
            if (name.length < 5) return;
            this.name = name;
        }
    }
    class Boss extends Person {
        callMe(){
            console.log(this.address);//address is protected and boss can reach it because he inherates from Person
        }
    }
    const p1 = new Boss("Tim", "12 Cypress St.")
    //Class can implement interface;
    interface Car {
        name: string;
        year: number;
    }
    class Ford implements Car{
        constructor({name, year}:Car){
            this.name = name;
            this.year = year;
        }
        name: string;
        year: number;
    }
    // Abstract class with abstract methods
    abstract class Animal {
        abstract makeSound(duration: number): void;

        move(duration: number){ //non abstract method. It relays on the implementation of make sound by the extending class.
            console.log("Moving along...")
            this.makeSound(duration);
        }
    }
    class Bird extends Animal{
        makeSound(duration: number){
            console.log(`Tzif (waiting ${duration}) Tzif`)
        }
    }
    const shmuel = new Bird()
    shmuel.move(2)

    // Generic class
        class StorageContainer<T> {
        private contents: T[]

        constructor() {
            this.contents = []
        }

        addItem(item: T): void{
            this.contents.push(item);
        }
        getItem(idx: number): T | undefined {
            return this.contents[idx]
        }
        }
}
namespace TypeGuards{ //V
    //typeof, instanceof, in, custom type-guards.
    //typeof operator for narrowing types. can have one of the following values: 
    //"boolean", "number", "string", "object", "function", "undefined", "bigint", "symbol".
        type StringOrNumber = string | number;
        function add1(value:StringOrNumber){
            if(typeof value === "string"){
                return value + "1"
            }else{
                return value ++;
            }
        }
    //instanceof operator is another type-guard for narrowing.
        class Dog{
            firstName: string;
            lastName: string;
            constructor(firstName: string, lastName: string){
                this.firstName = firstName;
                this.lastName = lastName;
            }
        }
        class Cat {
            firstName: string;
            constructor(firstName: string){
                this.firstName = firstName;
            }
        }
        function getName(animal: Cat | Dog){
            if(animal instanceof Cat){
                console.log(`my name is: ${animal.firstName}`)
            }else{
                console.log(`my name is: ${animal.firstName} ,my family is: ${animal.lastName}`)  
            }
        }
    // in operation checks if a certain string is a property name of object
        function getName2(animal: Cat | Dog){
            if("lastName" in animal){
                console.log(`my name is: ${animal.firstName} ,my family is: ${animal.lastName}`)
            }else{
                console.log(`my name is: ${animal.firstName}`)  
            }
        }
    // Custom type-guards using the is keyword at the return type.
        function isDog(pet: Dog | Cat): pet is Dog{
            return (pet as Dog).lastName !== undefined
        }
        function getName3(animal: Dog | Cat){
            if(isDog(animal)){
                console.log(`my name is: ${animal.firstName} ,my family is: ${animal.lastName}`)
            }else{
                console.log(`my name is: ${animal.firstName}`)  
            }
        }

}
namespace DiscriminatedUnions{//V
    // discriminated unions are another way of narrowing
        type Log = Warning | Info | Success 
        interface Warning {
            type: "warning";
            msg: string;
        }
        interface Info {
            type: "info";
            text: "string";
        }
        interface Success {
            type: "success";
            messsage: string;
        }
        function handleMsg(log: Log){
             switch(log.type){
                case "warning":
                    console.log(log.msg)
                    break;
                case "info":
                    console.log(log.text);
                    break;
                case "success":
                    console.log(log.messsage)
                    break;
            }
        } 
}
namespace UtilityTypes{
    interface Todo{
        title: string;
        description: string;
        id: number;
    }
    //Partial makes all of the properties optional.
        type UpdateTodo = Partial<Todo>
    //Readonly makes all of the values readonly
        type MyTodo = Readonly<Todo>
    //Record declares the type of the key and the value of an object.
        type Coor = Record<number, number>
        const myCoor:Coor = {
            2: 3,
            4: 4
        }
    //Pick picks keys from other type 
        type MainTodo = Pick<Todo, 'title'>//{title: number}
    //Omit is the oposite of Pick. It has all of the properties but omits the given property.
        type TodoNoTitle = Omit<Todo, 'title'>//{ description: string; id: number;}
    //keyof keyword returns uninon of all the keys of a type.
    //ReturnType returns the return type of a function type.Awaited evaluate value from a promise
        let func = async ()=> "hello";
        type Return =Awaited<ReturnType<typeof func>>//string
    //Prettify is utility that make complex type look good. needs to be implemented.
        interface MainType {
            name: string
            age: string;
        }
        type NestedType = MainType & {
            isPretty: boolean;
        }
        type Prettify<T> = {
            [K in keyof T]: T[K]
        } & {}
        type Prettied = Prettify<NestedType>
    //Exclude excludes the given value from union type
        type StringOrBool = string | boolean;
        type JustString = Exclude <StringOrBool, boolean>
}





