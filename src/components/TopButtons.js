import React from 'react'

function TopButtons({ setquery}) {
    const cities = [
        {
            id: 1,
            title: 'london'
        },
        {
            id: 2,
            title: 'Lagos'
        },
        {
            id: 3,
            title: 'Tokyo'
        },
        {
            id: 4,
            title: 'Toronto'
        },
        {
            id: 5,
            title: 'Paris'
        },
    ]
  return (
    <div className='flex items-center justify-between my-6'>
        {cities.map(city => (
            <button key={city.id} className='text-white text-lg font-medium flow-text' onClick={ () => setquery({ q: city.title})}>{city.title}</button>
        ))}
    </div>
  )
}

export default TopButtons