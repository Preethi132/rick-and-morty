import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'

export const App = () => {

  const[character,setCharacter]=useState([]);
  const[page,setPage]=useState(1);
  const [info, setInfo] = useState({}); 

  const fetchCharacters =async()=>{
    let response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
    //console.log(response);
    setCharacter(response.data.results)
    setInfo(response.data.info);
  }

  // const fetchPages =async()=>{
  //   let result = await axios.get(`https://rickandmortyapi.com/api/character?page=`)
  //   setPage(result.data.info)
  // }

  useEffect(()=>{
      fetchCharacters();
  },[page]);

  const handlePrevious =()=>{
    if (page > 1) {
      setPage(page - 1);
    }
    console.log('handlePrevious');
    console.log(page);
  }

  const handleNext =()=>{
    if (info.next) {
      setPage(page + 1);
    }
    console.log('handleNext');
    console.log(page);
  }


  return (
    <div>
      <h1>Rick and Morty</h1>

      <div className="characters">
        {
          character && character.map((v,i)=>{
            return(
              <div className='each-char' key={v.id}>
                <div >
                  <img src={v.image} alter="image" />
                </div>
                <div className="char-details">
                <h2>{v.name}</h2>
                <p>{v.status}-{v.species}</p>
                <p id="last-seen">Last seen on </p>
                <p>{v.location.name}</p>
                </div>
              </div>
            )
          })
        }
      </div>

      <div>
              <div className='handle-button'>
                  <button onClick={handlePrevious} disabled={page===1} >Previous</button>
                  <button onClick={handleNext} disabled={!info.next} >Next</button>
              </div>
      </div>
    </div>
  )
}

export default App
