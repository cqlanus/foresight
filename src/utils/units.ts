import { evaluate } from "mathjs"

export const UNIT_CONVERSION_MAP = {
    F: "fahrenheit",
    C: "celsius",
    mm: "mm",
    in: "in",
    mb: "mb",
    knots: "knots",
    "km/s": "km/s",
    "m/s": "m/s"
}

type Unit = "C" | "F" | "mm" | "in" | "mb" | "knots" | "km/s" | "m/s"

export type UnitKeys = "degrees" | "pressure" | "percent" | "speed" | "precip"

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
