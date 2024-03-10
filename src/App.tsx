import { Routes, Route } from 'react-router-dom'
import styles from './App.module.css'
import PostPage from "./components/PostPage/PostsPage"
import SinglePostPage from './components/SinglePostPage/SinglePostPage'
import { useState } from 'react'
function App() {

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={styles.appContainer}>

      <Routes>
        <Route path='/' element={<PostPage
          setIsActive={setIsActive}
        />}>
          <Route path='/:id' element={<SinglePostPage
            setIsActive={setIsActive}
            isActive={isActive}
          />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
