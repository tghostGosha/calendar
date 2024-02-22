import {createDate} from "./createDate.ts";
import {createMonth} from "./createMonth.ts";

interface ICreateYearParams {
    year?: number,
    locale?: string,
    monthNumber?: number
}
export const createYear = (params?: ICreateYearParams) => {
    const locale = params?.locale ?? 'default';
    const monthCount = 12
    const today = createDate()
    const year = params?.year ?? today.year
    const monthNumber = params?.monthNumber ?? today.monthNumber
    const month = createMonth({date: new Date(year, monthNumber-1), locale})

    const getMonthDays = (monthIndex: number)=>
        createMonth({date:new Date(year, monthIndex), locale}).createMonthDays()
        //все месяца для конкретного года
    const createYearMonths = () => {
        const months = []
        for(let i:number = 0; i <= monthCount -1; i+=1) {
            months[i] = getMonthDays(i)
        }
        return months
    }
    return {
        createYearMonths,
        month,
        year
    }
}