console.log("Hello, Chris")

function scoreRoll(diceArray) {
    // return diceArray[0] + diceArray[1] + diceArray[2] + diceArray[3] + diceArray[4] + diceArray[5]
    let score = 0
    if (checkStraight(diceArray)) {
        score += scoreStraight(diceArray)
    }
    return score
}

const myRoll = [1, 2, 3, 4, 5, 6]
const myRoll2 = [6, 6, 6, 2, 3, 4]
const myRoll3 = [1, 2, 1, 2, 1, 1]
const myRoll4 = [1, 2, 3, 4]

console.log("Test roll current score is: " + scoreRoll(myRoll))

console.log(myRoll2)
console.log(myRoll2.sort())
console.log(myRoll2)

function checkStraight(diceArray) {
    diceArray.sort()
    if (diceArray.toString() == [1, 2, 3, 4, 5, 6].toString()) {
        return true;
    } else {
        return false;
    }
}

console.log("Is myRoll a straight? " + checkStraight(myRoll))
console.log("Is myRoll2 a straight? " + checkStraight(myRoll2))

function scoreStraight(diceArray) {
    diceArray.sort()
    if (diceArray.toString() == [1, 2, 3, 4, 5, 6].toString()) {
        return 1500;
    } else {
        return 0;
    }
}

console.log("Score for myRoll being a straight? " + scoreStraight(myRoll))
console.log("Score for myRoll2 being a straight? " + scoreStraight(myRoll2))

function diceArrayToDiceMap(diceArray) {
    var diceMap = new Map()
    diceArray.forEach(element => {
        if (diceMap.has(element)) {
            diceMap.set(element, diceMap.get(element) + 1)
        } else {
            diceMap.set(element, 1)
        }
    });
    return diceMap
}

function checkFourAndPair(diceArray) {
    var diceMap = diceArrayToDiceMap(diceArray)
    console.log("in check four and a pair")
    console.log(diceMap.values()) // Values has number of same die face
    if (diceMap.size == 2 ) {
        return true;
    } else {
        return false;
    }
}

console.log("Is myRoll four and a pair? " + checkFourAndPair(myRoll))
console.log("Is myRoll3 four and a pair? " + checkFourAndPair(myRoll3))
console.log("Is myRoll4 four and a pair? " + checkFourAndPair(myRoll4))

console.log(diceArrayToDiceMap(myRoll))
console.log(diceArrayToDiceMap(myRoll3))
console.log(diceArrayToDiceMap(myRoll4))



class Bucket {
    constructor() {
        this.data = new Map();
    }

    addValue(value) {
        if (this.data.has(value)) {
            this.data.set(value, this.data.get(value) + 1);
        } else {
            this.data.set(value, 1);
        }
        console.log(`${value} added. Count: ${this.data.get(value)}`);
    }

    removeValue(value) {
        if (this.data.has(value)) {
            const count = this.data.get(value);
            if (count === 1) {
                this.data.delete(value);
                console.log(`${value} removed from the data object.`);
            } else {
                this.data.set(value, count - 1);
                console.log(`${value} removed. Count: ${this.data.get(value)}`);
            }
        } else {
            console.log(`${value} is not in the data object.`);
        }
    }

    getValueCount(value) {
        if (this.data.has(value)) {
            return this.data.get(value);
        } else {
            return 0;
        }
    }

    getAllValuesWithCount() {
        const result = [];
        this.data.forEach((count, value) => {
            result.push({ value, count });
        });
        return result;
    }

    getHighestCount() {
        let highestCount = this.data.values().next().value

        for (value in this.data.values) {
            if (value > highestCount) {
                highestCount = value
            }
        }
        return highestCount;
    }
}

function diceArrayToBucket(diceArray) {
    var diceBucket = new Bucket()
    diceArray.forEach(element => {
        diceBucket.addValue(element)
    });
    return diceBucket;
}

console.log(diceArrayToBucket(myRoll))
console.log(diceArrayToBucket(myRoll3))
var diceBucket4 = diceArrayToBucket(myRoll4)
console.log(diceBucket4)
console.log(diceBucket4.getHighestCount())

function roleSingleDie() {
    return Math.floor(Math.random() * 6) + 1;
}

console.log(roleSingleDie() + ", " + roleSingleDie() + ", " + roleSingleDie() + ", " + roleSingleDie() + ", " + roleSingleDie() + ", " + roleSingleDie())