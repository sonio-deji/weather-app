import React,{ useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import {toast} from 'react-toastify'

function Inputs({setquery, units, setunits}) {
  const [city, setcity] = useState('');

  const handleUnitChange = (e) => {
    const selectedUnit = e.target.name;
    if(units !== selectedUnit) setunits(selectedUnit)
  }
  const handleSearchClick = (e) => {
    e.preventDefault();
    if(city !== '') setquery({q: city});
    setcity('')
  }
  const handleLocationClick = () => {
    if(navigator.geolocation) {
      toast.info(`fetching user's location`)
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('location fetched')
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setquery({
          lat,
          lon
        })
      })
    }
  }
  return (
    <div className='flex flex-row justify-center my-6'>

        <div className='flex flex-row w-3/4 items-center justify-center space-x-4 p-2'>
            <form onSubmit={handleSearchClick}>
            <input type="text" 
            className='text-xl font-light p-2 w-64 shadow-xl focus:outline-none capitalize placeholder:lowercase' placeholder='Search for city...'
            onChange={(e) => setcity(e.target.value)}
             />
             </form>
            <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleSearchClick}/>
            <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocationClick}/>
        </div>
        <div className="flex flex-row w-1/4 items-center justify-center">
            <button name='metric' className='text-white font-light transition ease-out hover:scale-125' onClick={handleUnitChange}>°C</button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name='imperial' className='text-white font-light transition ease-out hover:scale-125' onClick={handleUnitChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs