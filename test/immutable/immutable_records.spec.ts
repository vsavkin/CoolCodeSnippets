import {Record, Map} from 'immutable';

fdescribe("Immutable", () => {
  it("interface/record/factory", () => {
    // interface
    interface Person { name: string; age: number; }

    // immutable record
    const R = Record({name: null, age: null});

    // factory
    function person({name, age}):Person { return <any>new R({name, age}); }

    // some functions on a model
    function canDrink(p: Person) {return p.age >= 21;}

    const jim = person({name: 'Jim', age: 99});

    expect(jim.name).toEqual('Jim');
    expect(jim.age).toEqual(99);
    expect(canDrink(jim)).toEqual(true);
  });

  it("subclass Record", () => {
    // dummy interface
    interface T { name: string; age: number; }

    // immutable record
    const R: {new(p:T): T} = <any>Record({name: null, age: null});

    // the actual class
    class Person extends R {

      // some function of the model class
      canDrink() { return this.age >= 21; }
    }

    const jim = new Person({name: 'Jim', age: 99});

    expect(jim.name).toEqual('Jim');
    expect(jim.age).toEqual(99);
    expect(jim.canDrink()).toEqual(true);
  });
});
