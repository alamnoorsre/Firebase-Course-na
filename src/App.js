import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import {db, auth, storage} from "./config/firebase";
import { useEffect, useState } from 'react';
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {ref, uploadBytes} from "firebase/storage";

function App() {

  //Movie List State
const [movieList, setMovieList] = useState([]);

//New Movies  States
const [newMovieTitle, setNewMovieTitle] = useState("");
const [newReleaseDate, setReleaseDate] = useState(0);
const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

//Update Title  States
const [updatedTitle, setUpdatedTitle] = useState("");

//File Upload  State
const [fileUpload, setFileUpload] = useState(null);


const moviesCollectionRef = collection(db,"Movies");
useEffect(() => 
  {
  getMovieList();
  },[]);

const getMovieList = async () => 
{
  try 
  {
  const data = await getDocs(moviesCollectionRef);
  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  //console.log(filteredData);
  setMovieList(filteredData);
    } catch(err){
      console.error(err);
    }
  };

  const onSubmitMovie = async () =>
  {
    try{
    await addDoc(moviesCollectionRef,{
      title : newMovieTitle,
      releaseDate: newReleaseDate,
      receivedAnOscer:isNewMovieOscar,
      userId: auth?.currentUser?.uid,
    });
  getMovieList();
  }
    catch(err)
      {
        console.error(err);
      }
  };

  const deleteMovie = async (id) =>
  {
  const movieDoc = doc(db,"Movies",id);
  await deleteDoc(movieDoc);
  getMovieList();
  };

  const updateMovieTitle = async (id) =>
  {
  const movieDoc = doc(db,"Movies",id);
  await updateDoc(movieDoc, {title: updatedTitle});
  getMovieList();
  };

  const uploadFile = async () =>
  {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try
    {
    await uploadBytes(filesFolderRef, fileUpload);
    } catch(err)
    {
      console.error(err);
    }
  };


  return (
    <div className="App"> 
    <Auth/> 
    <div>
    <input placeholder='Movie title..'
    onChange={(e) => setNewMovieTitle(e.target.value)} 
    />
    <input placeholder='Release Date..' 
    type='number' 
    onChange={(e) => setReleaseDate(Number(e.target.value))} 
    />
    <input type='checkbox' 
    checked={isNewMovieOscar}
    onChange={(e) => setIsNewMovieOscar(Number(e.target.checked))}
    />
    <label>Received On Oscer</label>
    <button onClick={onSubmitMovie}>Submit Movie</button>

    </div>
    <div>
      {movieList.map((movie) => (
        <div>
          <h1 style={{ color: movie.receivedAnOscer ? "red" : "green"}}> 
          {""} 
          {movie.title} 
          {""}
          </h1>
          <p>Date : {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          <input placeholder='New Title..' 
          onChange={(e) => setUpdatedTitle(e.target.value)} 
          />
          <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>

        </div>
      ))}
    </div>

    <div>
      <input type='file' 
      onChange={(e) => setFileUpload(e.target.files[0])} 
      />
      <button onClick={uploadFile}>Upload File</button>
    </div>
    
    </div>
  );
}

export default App;
