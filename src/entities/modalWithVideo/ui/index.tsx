import ReactPlayer from 'react-player'
import s from './style.module.scss'
import { Modal } from 'antd'
import { Movie } from 'shared/api'
import { SERVER_API } from 'shared/config'



type Props = {
    isModalOpen: boolean,
    hideModal: (value: boolean) => void,
    movieOne: Movie
}

export const ModalWithVideo = ({ isModalOpen, hideModal, movieOne } : Props) => {
    
    const closeWindow = () => {
        hideModal(false)        
    }
   
    return (
        <Modal wrapClassName={s.modal} destroyOnClose={true} open={isModalOpen} onCancel={closeWindow}  footer={null} maskClosable={false}>
            <ReactPlayer                 
                playing
                volume={0.5}
                controls
                url={`${movieOne.img ? `${SERVER_API}/video/${movieOne.video}`: ''}`}
                className={s.player}  
                width={1000}
                height={'auto'}                                     
            />
        </Modal>
    )
}