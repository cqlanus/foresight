import { evaluate } from "mathjs"

export const UNIT_CONVERSION_MAP = {
    F: "fahrenheit",
    C: "celsius",
    mm: "mm",
    in: "in",
    mb: "mb",
    knot: "knots",
    "km/s": "km/s",
    "m/s": "m/s"
}

type Unit = "C" | "F" | "mm" | "in" | "mb" | "knot" | "km/s" | "m/s"

interface DegreesOptions {
    source: Unit
    target: Unit
}

export const convert = (
    val: number,
    { source, target }: DegreesOptions
) => {
    const sourceUnit = UNIT_CONVERSION_MAP[source]
    const targetUnit = UNIT_CONVERSION_MAP[target]
    const evalStr = `${val} ${sourceUnit} in ${targetUnit}`
    return evaluate(evalStr).toNumber().toPrecision(3)
}
