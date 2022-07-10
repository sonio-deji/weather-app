import React from 'react'
import { formatToLocaleTime } from '../services/weatherServicees'

function TimeAndLocation({ weather: {dt, timezone, name, country}}) {
  return (
    <div>
        <div className="flex items-center justify-center my-6">
            <p className='text-white text-sm font-extralight lg:text-xl text-center'>
              {formatToLocaleTime(dt, timezone)}
            </p>
        </div>
        <div className="flex items-center justify-center my-3">
          <p className="text-white text-lg font-medium sm:text-3xl">
            {`${name}, ${country}`}</p>
        </div>
    </div>
  )
}

export default TimeAndLocation