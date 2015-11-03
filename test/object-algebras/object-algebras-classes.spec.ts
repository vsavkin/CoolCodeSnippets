/**
 * Object Algebras Using Class-Based Syntax
 *
 * We start with two variants: lit and add, and one operation: print.
 * To add a new operation, uncomment EvalAddAlg.
 * Note, we did not have to change any existing code.
 * To add a new variant, uncomment MulAlg, PrintMulAlg, EvalMulAlg
 * Note, we did not have to change any existing code.
 */

interface AddAlg<E> {
  lit(value:number):E;
  add(a:E, b:E):E;
}

// UNCOMMENT TO ADD A NEW VARIANT
//interface MultAlg<E> extends AddAlg<E> {
//  mul(a:E, b:E): E;
//}

type PrintExp = () => string;
class PrintAddAlg implements AddAlg<PrintExp> {
  lit(value:number) { return () => value.toString(); }
  add(a:PrintExp, b:PrintExp) { return () => `(${a()}) + (${b()})`; }
}

// UNCOMMENT TO ADD AN OPERATION
//type EvalExp = () => number;
//class EvalAddAlg implements AddAlg<EvalExp> {
//  lit(value:number) { return () => value; }
//  add(a:EvalExp, b:EvalExp) { return () => a() + b(); }
//}

// UNCOMMENT TO ADD A NEW VARIANT
//class PrintMulAlg extends PrintAddAlg implements MultAlg<PrintExp> {
//  mul(a:PrintExp, b:PrintExp) { return () => `(${a()}) * (${b()})`; }
//}

// UNCOMMENT TO ADD A NEW VARIANT
//class EvalMulAlg extends EvalAddAlg implements MultAlg<EvalExp> {
//  mul(a:EvalExp, b:EvalExp) { return () => a() * b(); }
//}

function createAddExp<E>(a:AddAlg<E>):E {
  return a.add(a.lit(10), a.add(a.lit(5), a.lit(1)));
}

//function createMulExp<E>(a:MultAlg<E>):E {
//  return a.mul(a.lit(10), a.add(a.lit(5), a.lit(1)));
//}

describe("Object Algebras", () => {
  it("add", () => {
    const print = createAddExp(new PrintAddAlg());
    console.log("expression", print());

    // UNCOMMENT TO ADD AN OPERATION
    //const eval = createAddExp(new EvalAddAlg());
    //console.log("value", eval());
  });

  //it("mul", () => {
  //  const print = createMulExp(new PrintMulAlg());
  //  console.log("expression", print());
  //
  //  const eval = createMulExp(new EvalMulAlg());
  //  console.log("value", eval());
  //});
});
