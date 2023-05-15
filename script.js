
// base builder
function BaseBuilder (value) {
    this.result = value;
}

 // take infinite number of integers and sum all with stored value;
BaseBuilder.prototype.plus = function (...n) {
    console.log('plus: ' + n);
    for (let i = 0; i < n.length; i++) {
        this.result += n[i];
    }

    console.log('"' + this.result + '"');
    return this;
}

// returns stored value;
BaseBuilder.prototype.get = function () {
    console.log('get: "' + this.result + '"');
    return this.result;
}

/* ES6 class IntBuilder:
    // API:
    new IntBuilder(int) // constructor takes starting integer, if not passed starts with 0;

    .plus(...n)         // take infinite number of integers and sum all with stored value;
    .minus(...n)        // take infinite number of integers and subtract from stored value;
    .multiply(n)        // multiply param n on stored value;
    .divide(n)          // leaves integer part of division stored value on n;
    .mod(n)             // leaves remainder of the division stored value with on n;
    .get()              // returns stored value;

    random(from, to)   // static method; from, to: integer; values limits the range of random values;
*/
class IntBuilder extends BaseBuilder {
    constructor(value = 0) {
        super(value);
    }

    // take infinite number of integers and subtract from stored value;
    minus(...n) {
        console.log('minus: ' + n);
        for (let i = 0; i < n.length; i++) {
            this.result -= n[i];
        }

        console.log(this.result);
        return this;
    }

    // multiply param n on stored value;
    multiply(n) {
        console.log('multiply: ' + n);
        this.result *= n;

        console.log(this.result);
        return this;
    }

    // leaves integer part of division stored value on n;
    divide(n) {
        this.result = Math.floor(this.result / n);

        console.log(this.result);
        return this;
    }

    // leaves remainder of the division stored value with on n;
    mod(n) {
        this.result %= n;

        console.log(this.result);
        return this;
    }

    // static method; from, to: integer; values limits the range of random values;
    static random(from, to) {
        console.log('static random: from ' + from + ' to ' +  to);
        const result = from + Math.floor(Math.random() * (to - from));

        console.log(this.result);
        return result;
    }
}

console.log("Start IntBuilder test");

let randomInt = IntBuilder.random(10, 100);   // For example,  42;
console.log(randomInt);

let intBuilder = new IntBuilder(10); // 10;
let intResult = intBuilder
    .plus(2, 3, 2)                     // 17;
    .minus(1, 2)                       // 14;
    .multiply(2)                       // 28;
    .divide(4)                         // 7;
    .mod(3)                            // 1;
    .get();                            // -> 1;

console.log("IntBuilder test result: " + intResult);



/*
    ES5 class StringBuilder (inherits from BaseBuilder)

    // API:

    new StringBuilder(str)   // constructor takes starting string, if not passed starts with '';
    plus(...str)             // takes infinite number of strings and concat with stored string;
    minus(n)                 // cut last n chars from stored string;
    multiply(int)            // repeat stored strings n times;
    divide(n)                // leaves first k chars of stored string, where k = Math.floor(str.length / n);
    remove(str)              // remove taken string str from stored; Prohibited to use String.prototype.replace();
    sub(from, n)             // leaves substring starting from and with length n;
    get()                    // returns stored value;

*/
// constructor takes starting string, if not passed starts with '';
function StringBuilder(value = "") {
    BaseBuilder.call(this, value);
}

Object.setPrototypeOf(StringBuilder.prototype, BaseBuilder.prototype);
StringBuilder.prototype.constructor = BaseBuilder;

// method plus is in the BaseBuilder. Takes infinite number of strings and concat with stored string;

// cut last n chars from stored string;
StringBuilder.prototype.minus = function (n) {
    console.log("minus: " + n);

    this.result = this.result.slice(0, this.result.length - n);

    console.log('"' + this.result + '"');
    return this;
}

// remove taken string str from stored; Prohibited to use String.prototype.replace();
StringBuilder.prototype.remove = function (str) {
    console.log("remove: " + str);

    let result = this.result;
    this.result = "";

    let i = 0;
    while (result.length > 0) {
        let substrIndex = result.indexOf(str);
        if (substrIndex > -1) {
            this.result += result.slice(0, substrIndex);
            result = result.slice(substrIndex + str.length);
        } else {
            this.result += result;
            result = "";
        }
        console.log(`index: ${substrIndex}, this.result: "${this.result}", result: "${result}"`);
    };

    console.log('"' + this.result + '"');
    return this;
};

// repeat stored strings n times;
StringBuilder.prototype.multiply = function (n) {
    console.log("multiply: " + n);
    this.result = this.result.repeat(n);

    console.log('"' + this.result + '"');
    return this;
}

// leaves first k chars of stored string, where k = Math.floor(str.length / n);
StringBuilder.prototype.divide = function(n) {
    console.log("divide: " + n);

    let newLength = Math.floor(this.result.length / n);
    this.result = this.result.slice(0, newLength);

    console.log('"' + this.result + '"');
    return this;
}


// leaves substring starting from and with length n;
StringBuilder.prototype.sub = function (from, n) {
    console.log('sub from, n: ' + from + ', ' + n + ', string: ' + this.result);

    this.result = this.result.slice(from, from + n);

    console.log('"' + this.result + '"');
    return this;
}

// method get is in the BaseBuilder.



console.log("Start StringBuilder test");
let strBuilder = new StringBuilder('Hello dear'); // 'Hello';
let strResult = strBuilder
    .plus(' all', '!')                         // 'Hello all!'
    .minus(4)                                  // 'Hello '
    .multiply(3)                               // 'Hello Hello Hello '
    .divide(4)                                 // 'Hell';
    .remove('l')                               // 'He';
    .sub(1,3)                                  // 'e';
    .get();                                    // -> 'e';

console.log("StringBuilder test result: " + strResult);
