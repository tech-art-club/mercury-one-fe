function parseRecipe(message) {
    if (message.substring(message.length - 2) === `{"`) {
        message[message.length - 2] = ']'
        message[message.length - 1] = '}'
    } else {
        let arrayStartsCounter = 0
        let arrayEndsCounter = 0
        let objectStartsCounter = 0
        let objectEndsCounter = 0
        let doubleQuotesCounter = 0

        for (let i = 0; i < message.length; i++) {
            if (message[i] === `{`) {
                objectStartsCounter++;
            }
            if (message[i] === `}`) {
                objectEndsCounter++;
            }
            if (message[i] === `[`) {
                arrayStartsCounter++;
            }
            if (message[i] === `]`) {
                arrayEndsCounter++;
            }
            if (message[i] === `"`) {
                doubleQuotesCounter++;
            }
        }

        if (doubleQuotesCounter % 2 !== 0) {
            let indexOfLastDoubleQuote = message.lastIndexOf(`"`);

            message = message + `"`

            if (indexOfLastDoubleQuote !== -1) {
                if (message[indexOfLastDoubleQuote - 1] !== `:` &&
                    message[indexOfLastDoubleQuote - 1] !== `{` &&
                    message[indexOfLastDoubleQuote - 1] !== `[`) {

                    message = message + `:""`
                }
            }
        }

        if (arrayStartsCounter !== arrayEndsCounter) {
            if (objectStartsCounter !== objectEndsCounter && message[message.length - 2] !== ':') {
                message = message + `}`
            }

            message = message + `]}`
        } else if (objectStartsCounter !== objectEndsCounter) {
            message = message + `}`
        }
    }
    try {
        console.log(message)

        let json = JSON.parse(message)

        return json;
    } catch (error) {

        return false;
    }
}

export default parseRecipe;