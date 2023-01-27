import React, {MouseEvent, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)


    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)

        const intervalId = setInterval(() => {
            setDate(new Date)
        }, 1000)
        setTimerId(+intervalId)
    }

    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        setTimeout(() => { clearInterval(timerId)});
        setTimerId(undefined)
    }

    const onMouseEnter = (e: MouseEvent) => { // пишут студенты // показать дату если наведена мышка
        if (e.currentTarget) {
            setShow(true)
        }
    }
    const onMouseLeave = (e: MouseEvent) => { // пишут студенты // спрятать дату если мышка не наведена
        if (e.currentTarget) {
            setShow(false)
        }
    }

    const stringTime = new Intl.DateTimeFormat('ru', {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }).format(date) || <br/>

    const stringDate = new Intl.DateTimeFormat('ru', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
    }).format(date) || <br/>
    // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = new Intl.DateTimeFormat('en', {
        weekday: 'long'
    }).format(date) || <br/>

    const stringMonth = new Intl.DateTimeFormat('en', {
        month: 'long'
    }).format(date) || <br/>

    return (
      <div className={s.clock}>
          <div
            id={'hw9-watch'}
            className={s.watch}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
              <span id={'hw9-day'}>{stringDay}</span>,{' '}
              <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
          </div>

          <div id={'hw9-more'}>
              <div className={s.more}>
                  {show ? (
                    <>
                        <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                        <span id={'hw9-date'}>{stringDate}</span>
                    </>
                  ) : (
                    <>
                        <br/>
                    </>
                  )}
              </div>
          </div>

          <div className={s.buttonsContainer}>
              <SuperButton
                id={'hw9-button-start'}
                disabled={!!timerId} // пишут студенты // задизэйблить если таймер запущен
                onClick={start}
              >
                  start
              </SuperButton>
              <SuperButton
                id={'hw9-button-stop'}
                disabled={!timerId} // пишут студенты // задизэйблить если таймер не запущен
                onClick={stop}
              >
                  stop
              </SuperButton>
          </div>
      </div>
    )
}

export default Clock
