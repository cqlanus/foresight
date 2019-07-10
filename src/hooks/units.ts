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
            "in": "in",
            "millibar": "millibar",
        }
    },
    SPEED: {
        key: "speed",
        name: "Speed",
        units: {
            "mi/h": "mi/h",
            "knot": "knot",
            "km/h": "km/h",
            "m/s": "m/s",
        }
    },
    PRECIP: {
        key: "precip",
        name: "Precip",
        units: {
            "in": "in",
            "mm": "mm",
        }
    },
}

export const initialUnitsState = {
    degrees: UNITS_MAP.DEGREES.units["degF"],
    pressure: UNITS_MAP.PRESSURE.units["millibar"],
    precip: UNITS_MAP.PRECIP.units["in"],
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
