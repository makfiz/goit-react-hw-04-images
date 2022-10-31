import { Box } from "components/utils/Box";
import SearchBar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Loader from 'components/Loader/Loader'
import Modal from 'components/Modal/Modal'
import {Button} from 'components/Button/Button'

import { useState, useEffect } from "react";
import { fetchIMG } from './Services/imgService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Scroll = require('react-scroll');
const scroll = Scroll.animateScroll;

const App = () => {

  const [searchValue, setSearchValue] = useState('')
  const [imgItems, setImgItems] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [curPage, setCurPage] = useState(1)
  const [showBtn, setShowBtn] = useState(false)
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')

  // state = {
  //   searchValue: '',
  //   imgItems: null,
  //   isLoading: false,
  //   curPage: 1,
  //   error: null,
  //   showBtn: false,
  //   image: '',
  //   tags: ''
    
  // }
  
  const submitFormHandler = (formValue) => {
      if (formValue.trim() === '') {
       return toast.error('Please enter image or photo name!')
    }

     if (searchValue === formValue) {
      return toast.error(`"${searchValue}" has already been found`)
    }
    
    setSearchValue(formValue);
    setImgItems([])
    setCurPage(1)
    // this.setState({
    //   searchValue: formValue,
    //   imgItems: [],
    //   curPage:1,
    // })

  }

  // componentDidUpdate(prevProps, prevState) {
  //   const {searchValue, curPage, imgItems, image , tags} = this.state
  
  //   if (
  //     prevState.curPage !== curPage ||
  //     prevState.searchValue !== searchValue
  //   )
  //   this.getIMGs(searchValue, curPage)
    
  //   if (prevState.imgItems && imgItems.length > 12 && prevState.imgItems.length !== imgItems) {
  //         if (prevState.image !== image || prevState.tags !== tags) return
  //     scroll.scrollToBottom()
  //   }
  // }

  useEffect(() => {
    if (searchValue === '') {
      return
    }

    async function getIMGs(searchValue, curPage) {
       
      try {
        setIsLoading(true)
        setShowBtn(false)
        
        const response = await fetchIMG(searchValue, curPage)
        console.log(response.data.hits)
        if (response.data.hits.length === 0) {
          return toast.error(`No results were found for "${searchValue}"`) 
        }

        
                
          // this.setState(prevState => ({
          // imgItems: [...prevState.imgItems, ...response.data.hits],
          // showBtn:  true
          // }))
        setImgItems(imgItems => [...imgItems, ...response.data.hits])
        setShowBtn(true)
         scroll.scrollToBottom()
      } catch(error)  {
      alert(error)
      } finally {
        setIsLoading(false)
      }
    }
  getIMGs(searchValue, curPage)

},[searchValue, curPage])




  const showMoreHandler = () => {
    setCurPage(curPage + 1)
  } 

  const onImgClickHandler = (e) => {
     if (e.target.nodeName !== 'IMG') {
        return
    }

    setImage(e.target.dataset.url)
    setTags(e.target.alt)
  }

  const modalCloseHandler = () => {
      setImage('')
      setTags('')
  }
  
 
    
    return (
      <>
      <SearchBar onSubmit={submitFormHandler} />
      <Box 
        width="1330px"
        ml="auto"
        mr="auto"
        as="section"
        position="relative"
        >  
        
          {isLoading && <Loader />}
          {<ImageGallery imgs={imgItems} onClick={onImgClickHandler}></ImageGallery>}
          {showBtn && <Button onClickBtn={showMoreHandler} />}
          <Box pt='20px' pb='25px'/>
          {image && <Modal onClick={modalCloseHandler}><img src={image} alt={tags} /></Modal>}
          <ToastContainer />
        </Box>
      </>  
     );
  

};


export default App