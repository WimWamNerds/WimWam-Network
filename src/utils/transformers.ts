import $, { Transformer, ValidationError, ok, error } from "transform-ts"

export function $length<T extends { length: number }>(p: { min?: number; max?: number } | number) {
    return Transformer.from<T, T>(input => {
        if (typeof p === "number") {
            if (input.length !== p) {
                return error(ValidationError.from(new ValidationLengthError("equal", p, input.length)))
            }
        } else {
            if (p.min != null && p.min > input.length) {
                return error(ValidationError.from(new ValidationLengthError("short", p.min, input.length)))
            }
            if (p.max != null && p.max < input.length) {
                return error(ValidationError.from(new ValidationLengthError("long", p.max, input.length)))
            }
        }
        return ok(input)
    })
}

export class ValidationLengthError extends Error {
    readonly name = "LengthError"

    constructor(readonly direction: "long" | "short" | "equal", readonly limit: number, readonly real: number) {
        super(
            direction !== "equal"
                ? `this is too ${direction}. limit is ${limit}, but actual length is ${real}`
                : `This length is not `
        )
    }
}

type Literal<B, T extends B> = B extends T ? never : T

export class ValidationUnknownValueError extends Error {
    readonly name = "UnknownValueError"

    constructor(readonly expectedValues: string[]) {
        super(`This must be ${expectedValues.map(v => JSON.stringify(v)).join(" or ")}.`)
    }
}

export const $safeNumber = Transformer.from<number, number>(n => {
    if (Number.isNaN(n)) return error(ValidationError.from(new ValidationNotSafeNumberError("nan")))
    if (n >= Infinity) return error(ValidationError.from(new ValidationNotSafeNumberError("plus-infinity")))
    if (n <= -Infinity) return error(ValidationError.from(new ValidationNotSafeNumberError("minus-infinitiy")))
    return ok(n)
})

export class ValidationNotSafeNumberError extends Error {
    readonly name = "NotSafeNumberError"

    constructor(readonly type: "nan" | "plus-infinity" | "minus-infinitiy") {
        super(`This is not safe number.`)
    }
}
export const $stringNumber = $.string
    .compose(
        Transformer.from<string, number>(i => ok(Number.parseFloat(i)))
    )
    .compose($safeNumber)

export function $range({ min, max }: { min?: number; max?: number }) {
    return Transformer.from<number, number>(input => {
        if (min != null && min > input) {
            return error(ValidationError.from(new ValidationRangeError("small", min, input)))
        }
        if (max != null && max < input) {
            return error(ValidationError.from(new ValidationRangeError("big", max, input)))
        }
        return ok(input)
    })
}

export class ValidationRangeError extends Error {
    readonly name = "LengthError"

    constructor(readonly direction: "big" | "small", readonly limit: number, readonly real: number) {
        super(`this is too ${direction}. limit is ${limit}, but actual value is ${real}`)
    }
}

export function $regexp(regexp: RegExp) {
    return Transformer.from<string, string>(input => {
        return regexp.test(input) ? ok(input) : error(ValidationError.from(new ValidationInvalidFormatError()))
    })
}

export class ValidationInvalidFormatError extends Error {
    readonly name = "InvalidFormatError"

    constructor() {
        super(`invalid format`)
    }
}
