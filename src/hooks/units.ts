import { createUnit } from 'mathjs'

createUnit('knot', {definition: '0.514444 m/s', aliases: ['knots', 'kt', 'kts']})
createUnit('inHg', {
    definition: '33.8637526 millibar',
})
createUnit('hPa', {
    definition: '1 millibar',
})

export interface State {
    degrees: string;
    pressure: string;
    speed: string;
    precip: string;
}

interface Action {
    type: string;
    payload: any;
}

export interface ValueOfUnitsMap {
    key: keyof State,
    name: string,
    units: { [key: string]: string }
} 

export interface UnitsMap { [ key: string ]: ValueOfUnitsMap }

export const UNITS_MAP: UnitsMap = {
    DEGREES: {
        key: "degrees",
        name: "Degrees",
        units: {
            "degF": "degF",
            "degC": "degC",
        }
    },
    PRESSURE: {
        key: "pressure",
        name: "Pressure",
        units: {
            "inHg": "inHg",
            "millibar": "millibar",
            "hPa": "hPa",
        }
    },
    SPEED: {
        key: "speed",
        name: "Speed",
        units: {
            "mi/h": "mi/h",
            "knots": "knots",
            "km/h": "km/h",
            "m/s": "m/s",
        }
    },
    PRECIP: {
        key: "precip",
        name: "Precip",
        units: {
            "in/h": "in/h",
            "mm/h": "mm/h",
        }
    },
}

export const initialUnitsState = {
    degrees: UNITS_MAP.DEGREES.units["degF"],
    pressure: UNITS_MAP.PRESSURE.units["millibar"],
    precip: UNITS_MAP.PRECIP.units["mm/h"],
    speed: UNITS_MAP.SPEED.units["mi/h"],
}

export const unitsReducer = (initialUnitsState: State, action: Action) => {
    switch (action.type) {
        case "SET_UNIT": {
            const {
                payload: { key, value },
            } = action
            return { ...initialUnitsState, [key]: value }
        }
        default: {
            return initialUnitsState
        }
    }
}
