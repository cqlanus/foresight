import { 
    WiMoonAltFirstQuarter,
    WiMoonAltFull,
    WiMoonAltNew,
    WiMoonAltThirdQuarter,
    WiMoonAltWaningCrescent1,
    WiMoonAltWaningCrescent2,
    WiMoonAltWaningCrescent3,
    WiMoonAltWaningCrescent4,
    WiMoonAltWaningCrescent5,
    WiMoonAltWaningCrescent6,
    WiMoonAltWaningGibbous1,
    WiMoonAltWaningGibbous2,
    WiMoonAltWaningGibbous3,
    WiMoonAltWaningGibbous4,
    WiMoonAltWaningGibbous5,
    WiMoonAltWaningGibbous6,
    WiMoonAltWaxingCrescent1,
    WiMoonAltWaxingCrescent2,
    WiMoonAltWaxingCrescent3,
    WiMoonAltWaxingCrescent4,
    WiMoonAltWaxingCrescent5,
    WiMoonAltWaxingCrescent6,
    WiMoonAltWaxingGibbous1,
    WiMoonAltWaxingGibbous2,
    WiMoonAltWaxingGibbous3,
    WiMoonAltWaxingGibbous4,
    WiMoonAltWaxingGibbous5,
    WiMoonAltWaxingGibbous6,
} from 'react-icons/wi'

import { IconType } from 'react-icons'

type Bounds = {
    bottom: number
    top: number
}

interface FractionalPhase {
    [key: number]: IconType
}
interface Phases {
    NEW: IconType,
    FIRST_QUARTER: IconType,
    FULL_MOON: IconType,
    THIRD_QUARTER: IconType,
    WAXING_CRESCENT: FractionalPhase,
    WAXING_GIBBOUS: FractionalPhase,
    WANING_GIBBOUS: FractionalPhase,
    WANING_CRESCENT: FractionalPhase,

}
const MOON_PHASES: Phases = {
    NEW: WiMoonAltNew,
    WAXING_CRESCENT: {
        1: WiMoonAltWaxingCrescent1,
        2: WiMoonAltWaxingCrescent2,
        3: WiMoonAltWaxingCrescent3,
        4: WiMoonAltWaxingCrescent4,
        5: WiMoonAltWaxingCrescent5,
        6: WiMoonAltWaxingCrescent6,
    },
    FIRST_QUARTER: WiMoonAltFirstQuarter,
    WAXING_GIBBOUS: {
        1: WiMoonAltWaxingGibbous1,
        2: WiMoonAltWaxingGibbous2,
        3: WiMoonAltWaxingGibbous3,
        4: WiMoonAltWaxingGibbous4,
        5: WiMoonAltWaxingGibbous5,
        6: WiMoonAltWaxingGibbous6,
    },
    FULL_MOON: WiMoonAltFull,
    WANING_GIBBOUS: {
        1: WiMoonAltWaningGibbous1,
        2: WiMoonAltWaningGibbous2,
        3: WiMoonAltWaningGibbous3,
        4: WiMoonAltWaningGibbous4,
        5: WiMoonAltWaningGibbous5,
        6: WiMoonAltWaningGibbous6,
    },
    THIRD_QUARTER: WiMoonAltThirdQuarter,
    WANING_CRESCENT: {
        1: WiMoonAltWaningCrescent1,
        2: WiMoonAltWaningCrescent2,
        3: WiMoonAltWaningCrescent3,
        4: WiMoonAltWaningCrescent4,
        5: WiMoonAltWaningCrescent5,
        6: WiMoonAltWaningCrescent6,
    },
}

const PHASE_NUM = {
    NEW: 0,
    FIRST_QUARTER: 0.25,
    FULL_MOON: 0.5,
    THIRD_QUARTER: 0.75
}

const getFractionalPhase = (lunationNumber: number, bounds: Bounds ) => {   
    const difference = bounds.top - bounds.bottom
    const fractionalStep = difference / 6

    const lunationDiff = lunationNumber - bounds.bottom

    const fraction = Math.round(lunationDiff / fractionalStep)
    return fraction
}

export const getMoonPhaseIcon = (lunationNumber: number) => {
    
    if (lunationNumber === PHASE_NUM.NEW) {
        return MOON_PHASES.NEW
    } else if (lunationNumber === PHASE_NUM.FIRST_QUARTER) {
        return MOON_PHASES.FIRST_QUARTER
    } else if (lunationNumber === PHASE_NUM.FULL_MOON) {
        return MOON_PHASES.FULL_MOON
    } else if (lunationNumber === PHASE_NUM.THIRD_QUARTER) {
        return MOON_PHASES.THIRD_QUARTER
    } else if (lunationNumber > PHASE_NUM.NEW && lunationNumber < PHASE_NUM.FIRST_QUARTER) {
        const bounds = { bottom:PHASE_NUM.NEW, top:PHASE_NUM.FIRST_QUARTER }
        const fraction = getFractionalPhase(lunationNumber, bounds)
        return fraction > 0 ? MOON_PHASES.WAXING_CRESCENT[fraction] : MOON_PHASES.NEW
    } else if (lunationNumber > PHASE_NUM.FIRST_QUARTER && lunationNumber < PHASE_NUM.FULL_MOON) {
        const bounds = { bottom:PHASE_NUM.FIRST_QUARTER, top:PHASE_NUM.FULL_MOON }
        const fraction = getFractionalPhase(lunationNumber, bounds)
        return fraction > 0 ? MOON_PHASES.WAXING_GIBBOUS[fraction] : MOON_PHASES.FIRST_QUARTER
    } else if (lunationNumber > PHASE_NUM.FULL_MOON && lunationNumber < PHASE_NUM.THIRD_QUARTER) {
        const bounds = { bottom:PHASE_NUM.FULL_MOON, top:PHASE_NUM.THIRD_QUARTER }
        const fraction = getFractionalPhase(lunationNumber, bounds)
        return fraction > 0 ? MOON_PHASES.WANING_GIBBOUS[fraction] : MOON_PHASES.FULL_MOON
    } else if (lunationNumber > PHASE_NUM.THIRD_QUARTER) {
        const bounds = { bottom:PHASE_NUM.THIRD_QUARTER, top:1 }
        const fraction = getFractionalPhase(lunationNumber, bounds)
        return fraction > 0 ? MOON_PHASES.WAXING_CRESCENT[fraction] : MOON_PHASES.THIRD_QUARTER
    }
}
