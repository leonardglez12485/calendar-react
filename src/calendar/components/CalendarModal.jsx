
import { useState } from 'react';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(true)

  const onCloseModal = () => {
    console.log('Closing modal');
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);

    //setIsModalOpen(false);
  }

  return (
    <Modal
    isOpen={isModalOpen}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
    onRequestClose={onCloseModal}
    style={customStyles}
    >
   
      <h2>Modal</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eos, perspiciatis aperiam vitae maiores. </p>

    </Modal>
  )
}
