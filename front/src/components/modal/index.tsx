
import './style.css';
// interface: modal Props
interface modalProps {
    content: string | null
    lt_btn: string
    rt_btn: string
    lt_handler: () => void
    rt_handler: () => void
}
export default function Modal({ content, lt_btn, rt_btn, lt_handler, rt_handler }: modalProps) {

    return (
        <div>
            <div className='modal-wrapper'>
                <div className='modal-box'>
                    <div className='modal-content'>{content}</div>
                    <div className='modal-button-box'>
                        <div className='modal-button' onClick={rt_handler} >{rt_btn}</div>
                        <div className='modal-button' onClick={lt_handler}>{lt_btn}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
