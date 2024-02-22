import {createDate} from "./createDate.ts";
import {getMonthNumberOfDays} from "./getMonthNumberOfDays.ts";

interface ICreateMonthParams {
    date?: Date,
    locale?: string
}
export const createMonth = (params?: ICreateMonthParams)=> {
    const date = params?.date ?? new Date();
    const locale = params?.locale ?? 'default'

    const d = createDate({date, locale})
    const {month: monthName, year, monthNumber, monthIndex} = d
    const getDay = (dayNumber: number) => {
        return createDate({date: new Date(year, monthIndex, dayNumber), locale})

    }
    const createMonthDays = () => {
        const days = []
        for(let i:number = 0; i <= getMonthNumberOfDays(monthIndex, year) -1; i+=1) {
            days[i] = getDay(i + 1)
        }
        return days
    }

    return {
        getDay,
        monthName,
        monthIndex,
        monthNumber,
        year,
        createMonthDays
    }
}