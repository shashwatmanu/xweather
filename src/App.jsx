import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState("")
 const [data, setData] = useState({})
 const [showData, setShowData] = useState(false);
 const [loading, setLoading] = useState(false);

  const handleSearch = async()=>{
    setLoading(true);
    setShowData(false);
    try{
let res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=4eef8d84d4c54798bff84735240506&q=${text}`)
setData(res.data);
setLoading(false);
setShowData(true);
    }
    catch(e){
      alert('Failed to fetch weather data');
      setLoading(false);
    }
  }



  return (
    <>
    <div style={{width:'100vw', height:'100vh', backgroundColor: 'lightblue', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div style={{display:'flex', marginTop:'30px'}}>
        <div><input onChange={(e)=> setText(e.target.value)} type='text' placeholder='Enter City Name' style={{borderRadius:'5px', border:'none', height:'30px', width:'200px', marginRight:'10px'}}/></div>
        <div><button onClick={handleSearch} style={{backgroundColor:'lightgreen', border:'none', borderRadius:'10px', height:'30px'}}>Search</button></div>
      </div>

{loading?"Loading data…":""}
      {showData?(<div style={{display:'flex', marginTop:'30px'}}>
        <div className="card">
          <div>Temperature</div>
          <div>{data.current.temp_c} °C</div>
        </div>
        <div className="card">
          <div>Humidity</div>
          <div>{data.current.humidity}%</div>
        </div>
        <div className="card">
          <div>Condition</div>
          <div>{data.current.condition.text}</div>
        </div>
        <div className="card">
          <div>Wind Speed</div>
          <div>{data.current.wind_kph} kph</div>
        </div>
      </div>):""}

    </div>
    </>
  );
}

export default App;
