import { useContext } from "react";
import { FaInfo, FaTrash, FaUserPen } from "react-icons/fa6";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ActionIcons = ({userId}) => {

  const {deleteUser} = useContext(UserContext);
  const route = useNavigate();
  


  function handleInfo(){
  
      route(`/user/${userId}`)
  }
  function handleDelete(){
  
    if(window.confirm('You sure you wanna delete?')){

      deleteUser(userId);
    }
    
    
  }
  function handleEdit(){
    route(`/edit/${userId}`)
    
  }
  

  return (
    <div className="flex space-x-4">
      <button onClick={handleInfo} className="bg-blue-500 text-white rounded-full p-4 hover:bg-blue-600 transition-all">
        <FaInfo className="text-[20px]"  />
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white rounded-full p-4 hover:bg-red-600 transition-all">
        <FaTrash className="text-[20px]" />
      </button>
      <button onClick={handleEdit} className="bg-green-500 text-white rounded-full p-4 hover:bg-green-600 transition-all">
        <FaUserPen className="text-[20px]" />
      </button>
    </div>
  );
};

export default ActionIcons;
