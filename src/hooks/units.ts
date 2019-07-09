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
            F: "F",
            C: "C",
        }
    },
    PRESSURE: {
        key: "pressure",
        name: "Pressure",
        units: {
            MB: "mb",
            IN: "in",
        }
    },
    SPEED: {
        key: "speed",
        name: "Speed",
        units: {
            MPH: "mph",
            KNT: "knot",
            KMH: "km/h",
            MS: "m/s",
        }
    },
    PRECIP: {
        key: "precip",
        name: "Precip",
        units: {
            IN: "in",
            MM: "mm",
        }
    },
}

export const initialUnitsState = {
    degrees: UNITS_MAP.DEGREES.units.F,
    pressure: UNITS_MAP.PRESSURE.units.IN,
    precip: UNITS_MAP.PRECIP.units.IN,
    speed: UNITS_MAP.SPEED.units.MPH,
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
