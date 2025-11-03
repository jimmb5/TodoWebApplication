import { FaTrash } from 'react-icons/fa'
export default function Row({item,deleteTask}) {
 return (
    <li>
        {item.description}
        <button className='delete-button' onClick={() => deleteTask(item.id)}><FaTrash /></button>
    </li>
 )
}