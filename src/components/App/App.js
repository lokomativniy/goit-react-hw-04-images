import Searchbar from '../Searchbar/Searchbar.jsx';
import { ImageGallery } from '../ImageGallery/ImageGallery.jsx';
import { toast, ToastContainer } from 'react-toastify';
import Container from '../Container/Container.jsx';
import { Loader } from '../Loader/Loader.jsx';
import { Modal } from '../Modal/Modal.jsx';
import { Button } from '../Button/Button.jsx';
import Api from '../services/pixabay-api';
import { useState, useEffect } from 'react';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        if (!imageName) {
          return;
        }
        setLoading(true);
        const response = await Api.fetchImages(imageName, page);
        setImages(prevImages => [...prevImages, ...response.data.hits]);

        if (response.data.hits.length === 0) {
          toast.info(`not found images ${imageName}`);
          return;
        }
      } catch (error) {
        setError('Something went wrong, please try again');
      } finally {
        setLoading(false);
      }
      if (page > 1) {
        scrollDown();
      }
    }
    fetchData();
  }, [imageName, page]);

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearcFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleImageClick = largeImage => {
    setLargeImage(largeImage);
  };

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleSearcFormSubmit}></Searchbar>
      {images && (
        <ImageGallery
          onClose={toogleModal}
          onClick={handleImageClick}
          images={images}
        ></ImageGallery>
      )}
      {loading && <Loader />}
      {showModal && (
        <Modal onClose={toogleModal} largeImage={largeImage}>
          <img src={largeImage} alt="" />
        </Modal>
      )}

      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
    </Container>
  );
}
