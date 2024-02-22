import React from "react";
import {useCalendar} from "./hooks/useCalendar.ts";
import './Calendar.css'
import {checkDateIsEqual, checkIsToday} from "../../utils/helpers/date";
interface ICalendarProps{
    locale?: string,
    selectedDate: Date;
    selectDate:(data: Date) => void
    firstWeekDayNumber?: number,
    onClose: ()=> void,
    color?: string

}
export const Calendar:React.FC<ICalendarProps> = ({
       locale = 'default',
       firstWeekDayNumber = 2,
       selectedDate,
       selectDate,
       onClose,
       color
}) => {
    const {state, functions} = useCalendar({firstWeekDayNumber,locale, selectedDate})

    return (
        <div className="calendar__modal">
            <div className="calendar">
                <h2>Календарь</h2>

                <div className="calendar__header">
                    <button onClick={()=> functions.onClickArrow('left')}>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#0F0F0F"/>
                        </svg>
                    </button>
                    {state.mode === 'days' && (

                        <div onClick={() => functions.setMode('months')}>
                            {state.monthsNames[state.selectedMonth.monthIndex].month}
                            {' '}
                            {state.selectedYear}
                        </div>
                    )}
                    {state.mode === 'months' && (
                        <div onClick={() => functions.setMode('years')}>
                            {state.selectedYear}
                        </div>
                    )}
                    {state.mode === 'years' && (
                        <div>
                            {state.selectedYearInterval[0]} -  {' '}
                            {state.selectedYearInterval[state.selectedYearInterval.length-1]}
                        </div>
                    )}
                    <button onClick={()=> functions.onClickArrow('right')}>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#0F0F0F"/>
                        </svg>
                    </button>


                </div>
                <div className="calendar__body">
                    {state.mode === 'days' && (
                        <>
                            <div className="calendar__week__names">
                                {state.weekDaysNames.map((weekDaysName)=> (
                                    <div key={weekDaysName.dayShort}>
                                        {weekDaysName.dayShort}
                                    </div>
                                ))}
                            </div>
                            <div className='calendar__days'>
                                {state.calendarDays.map((day) => {
                                    const isToDay = checkIsToday(day.date)
                                    const isSelectedDay = checkDateIsEqual(day.date, state.selectedDate.date)
                                    const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex

                                    return (
                                        <div
                                            key={`${day.dayNumber}-${day.monthIndex}`}
                                            onClick={() => {
                                                functions.setSelectedDay(day)
                                                selectDate(day.date);
                                            }}

                                            className={["calendar__day",
                                                isToDay ? 'calendar__today__item' : '',
                                                isSelectedDay ? 'calendar__selected__item': '',
                                                isAdditionalDay ? 'calendar__additional__day ': '',
                                            ].join(' ')}>
                                            {day.dayNumber}
                                            {state.color === 'green' && (
                                                <span className={['underline',
                                                    color==='green' ? 'green-text': '',
                                                ].join(' ')}/>
                                            )}
                                            {state.color === 'orange' && (
                                                <span className={['underline',
                                                    color==='orange' ? 'orange-text': '',
                                                ].join(' ')}/>
                                            )}
                                            {color === 'grey' && (
                                                <span className={['underline',
                                                    color==='grey' ? 'grey-text': ''
                                                ].join(' ')}/>
                                            )}

                                        </div>)
                                })}

                            </div>
                        </>
                    )}
                    {state.mode === 'months' && (
                        <div className='calendar__pick__items__container'>
                            {state.monthsNames.map((monthsName) => {
                                const isCurrentMonth =
                                    new Date().getMonth() === monthsName.monthIndex &&
                                    state.selectedYear === new Date().getFullYear();
                                const isSelectedMonth = monthsName.monthIndex === state.selectedMonth.monthIndex;

                                return (
                                    <div
                                        key={monthsName.month}
                                        onClick={() => {
                                            functions.setSelectedMonthByIndex(monthsName.monthIndex);
                                            functions.setMode('days');
                                        }}
                                        className={[
                                            'calendar__pick__item',
                                            isSelectedMonth ? 'calendar__selected__item' : '',
                                            isCurrentMonth ? 'calendar__today__item' : ''
                                        ].join(' ')}
                                    >
                                        {monthsName.monthShort}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {state.mode === 'years' && (
                        <div className='calendar__pick__items__container'>
                            <div className='calendar__unchoosable__year'>{state.selectedYearInterval[0] - 1}</div>
                            {state.selectedYearInterval.map((year) => {
                                const isCurrentYear = new Date().getFullYear() === year;
                                const isSelectedYear = year === state.selectedYear;

                                return (
                                    <div
                                        key={year}
                                        aria-hidden
                                        onClick={() => {
                                            functions.setSelectedYear(year);
                                            functions.setMode('months');
                                        }}
                                        className={[
                                            'calendar__pick__item',
                                            isCurrentYear ? 'calendar__today__item' : '',
                                            isSelectedYear ? 'calendar__selected__item' : ''
                                        ].join(' ')}
                                    >
                                        {year}
                                    </div>
                                );
                            })}
                            <div className='calendar__unchoosable__year'>
                                {state.selectedYearInterval[state.selectedYearInterval.length - 1] + 1}
                            </div>
                        </div>
                    )}
                </div>
                <button className="btn-check" onClick={onClose}>Выбрать</button>
            </div>
        </div>

    )
}


export default Calendar;
