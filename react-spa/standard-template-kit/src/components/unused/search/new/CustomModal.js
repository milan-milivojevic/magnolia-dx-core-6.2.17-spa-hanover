import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid rgb(0, 0, 0)',
    backgroundColor: '#EEE'
  },
};

const CustomModal = ({ isOpen, setIsOpen }) => {
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>      
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h1>
        <form  onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 20 }}>
            <label htmlFor="">Username</label>
            <input />
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 10 }}>
            <label htmlFor="">Password</label>
            <input />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingTop: '10px' }}>
            <button>Submit</button>
            <button onClick={closeModal}>close</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CustomModal