import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { toast } from "react-toastify";
import { FaUser} from 'react-icons/fa'
import EachSuggestion from "./eachSuggestion";

const Suggestions = (props) => {
    const [suggest, setSuggest] = useState([])
    const [addFriendState, setAddFriendState] = useState({})
    const currentUserUsername = sessionStorage.getItem("currentUserUsername");

    useEffect(()=>{
        fetch("/getAllSuggestions")
        .then((res) => res.json())
        .then((data) => {

            setSuggest(data)
        })
    },[addFriendState])
    const addFriendHandler = (res)=>{
      console.log(res)
      props.addFriend(res)
      setAddFriendState(res)
    }
  return <Fragment>
      <div>
          {suggest.map((data, index) => {
              return(
                <div key={index}>
                  <EachSuggestion suggestion = {data} addFriend={addFriendHandler}  />
                </div>
              )
          })}
      </div>
  </Fragment>
};

export default Suggestions;
