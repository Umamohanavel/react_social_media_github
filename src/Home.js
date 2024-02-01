import { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => { //no need prop drilling
  const {searchResults, fetchError, isLoading} = useContext(DataContext)  //use searchResults instead posts ah anupurom app.jsla
  return (
    <main className='Home'>
      {
        isLoading && <p className="statusMsg">Loading Posts...</p>
      }
      {
        !isLoading && fetchError && <p className = "statusMsg" style={{color: "red"}}> {fetchError} </p>
      }
      {
        !isLoading && !fetchError && 
        (searchResults.length ?
        <Feed posts={searchResults} />  : 
        <p className='statusMsg'>
          No posts to display..
        </p>
        )
      }
    </main>
  )
}

export default Home