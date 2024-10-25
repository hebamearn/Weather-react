import React, { useEffect, useState } from 'react'
import rain from '../assets/raining.gif'
import humidity from '../assets/humidity.gif'
import winds from '../assets/winds.gif'
import axios from 'axios'
import clouds from '../assets/clouds.gif'
import clear from '../assets/ClearS.gif'
import drizzle from '../assets/drizzle.gif'
import sunny from '../assets/sunny.gif'
const Home = () => {
  const [data, setData] = useState({
    name: 'Kakkanad',
    celcius: 10,
    clouds: 'thunder',
    description: 'Drizzle',
    humidity: 10,
    speed: 2,
    image:drizzle
  })
  const [name, setName] = useState('')
  const [error, setError]=useState('')
  // useEffect(()=>{

  // },[])

  const handle = () => {
    if (name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          let imagePath = '';
          if (res.data.weather[0].main == "Clouds") {
            imagePath = clouds
          }
          else if (res.data.weather[0].main == "Clear") { 
            imagePath = clear
          }
          else if (res.data.weather[0].main == "sunny") { 
            imagePath = sunny
          }

          else if (res.data.weather[0].main == "Drizzle") {
            imagePath = drizzle
          }else {
            imagePath=rain
          }
         
          console.log(res.data);
          setData({
            ...data, name: res.data.name, celcius: res.data.main.temp,
            humidity: res.data.main.humidity, wind: res.data.wind.speed, description: res.data.weather[0].description,
            clouds: res.data.weather[0].main, image:imagePath
          })
        })
        .catch(err => {
          if(err.response.status==404){
            setError("Invalid City Name !!!")
          }else{
            setError('');
          }
        })
    }
  }

  return (
    <div >
      <div className='text-center mt-3'>
        <h2 className='text-dark fs-2' >FIND WEATHER HERE...!!</h2>
      </div>
      <div className='search'>
        <div className="col md-3"></div>
        <div className="col md-6 ms-5 mt-5 navbar">
          <input type='text' placeholder='Enter city Name here' style={{ width: '90%', height: '40px', borderRadius: '10px', outlineColor: 'black' }} onChange={e => setName(e.target.value)} className='fs-5 mb-1' />
          <i className="fa-solid fa-magnifying-glass ms-3 " style={{ cursor: 'pointer', width: '25px', height: '40px' }} onClick={handle}></i>
        </div>


      </div>
      <div className='error'>
         <p>{error}</p>
      </div>

      <div>
        <div style={{ marginTop: '20px', marginLeft: '' }} className='container'>
          <div className='box  text-dark ' >
            <h2 className='mb-2'>{data.name}</h2>
            <img src={data.image} alt="" className='image rounded-circle' />
            <h3 className='mt-1'>{Math.round(data.celcius)}°c</h3>
            <h5> {data.clouds}</h5>
            <h5> {data.description}</h5>
            <div className="details">
              <div className="col humidity ">
                <img src={humidity} alt="" style={{ width: '40px', borderRadius: '30px' }} />
              </div>
              <div>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
              <div className="col wind">
                <img src={winds} alt="" style={{ width: '40px', borderRadius: '30px', height: '40px' }} />
              </div>
              <div>
                <p>{Math.round(data.wind)}km/hr</p>
                <p>Wind</p>
              </div>
            </div>
          </div>

        </div>
      </div>




    </div>
  )
}

export default Home;