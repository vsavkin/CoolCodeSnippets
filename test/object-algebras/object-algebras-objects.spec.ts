/**
 * Object Algebras Using Class-Based Syntax
 *
 * We start with two variants: lit and add, and one operation: print.
 * To add a new operation, uncomment EvalAddAlg.
 * Note, we did not have to change any existing code.
 * To add a new variant, uncomment MulAlg, PrintMulAlg, EvalMulAlg
 * Note, we did not have to change any existing code.
 */

function merge(a, b):any {
  var r = {};
  for (var attrname in a) { r[attrname] = a[attrname]; }
  for (var attrname in b) { r[attrname] = b[attrname]; }
  return r;
}

interface AddAlg<E> {
  lit(value:number):E;
  add(a:E, b:E):E;
}

//interface MultAlg<E> extends AddAlg<E> {
//  mul(a:E, b:E): E;
//}

type PrintExp = () => string;
var PrintAddAlg: AddAlg<PrintExp> = {
  lit: (value:number) => () => value.toString(),
  add: (a:PrintExp, b:PrintExp) => () => `(${a()}) + (${b()})`
};

//type EvalExp = () => number;
//var EvalAddAlg: AddAlg<EvalExp> = {
//  lit: (value:number) => () => value,
//  add: (a:EvalExp, b:EvalExp) => () => a() + b()
//};

//var PrintMulAlg: MultAlg<PrintExp> = merge(PrintAddAlg, {
//  mul: (a:PrintExp, b:PrintExp) => () => `(${a()}) * (${b()})`
//});
//
//
//var EvalMulAlg: MultAlg<EvalExp> = merge(EvalAddAlg, {
//  mul: (a:EvalExp, b:EvalExp) => () => a() * b()
//});

function createAddExp<E>(a:AddAlg<E>):E {
  return a.add(a.lit(10), a.add(a.lit(5), a.lit(1)));
}

//function createMulExp<E>(a:MultAlg<E>):E {
//  return a.mul(a.lit(10), a.add(a.lit(5), a.lit(1)));
//}

describe("Object Algebras", () => {
  it("add", () => {
    const print = createAddExp(PrintAddAlg);
    console.log("expression", print());

    //const eval = createAddExp(EvalAddAlg);
    //console.log("value", eval());
  });

  //it("mul", () => {
  //  const print = createMulExp(PrintMulAlg);
  //  console.log("expression", print());
  //
  //  const eval = createMulExp(EvalMulAlg);
  //  console.log("value", eval());
  //});
});
