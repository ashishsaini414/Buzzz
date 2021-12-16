import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import classes from './Suggestions.module.css';
import { toast } from "react-toastify";
import { FaUser} from 'react-icons/fa'
import EachSuggestion from "./eachSuggestion";

const Suggestions = (props) => {
    const dispatch = useDispatch()
    const [suggest, setSuggest] = useState([])
    const [addFriendState, setAddFriendState] = useState({})
    console.log(suggest)
    const currentUserUsername = sessionStorage.getItem("currentUserUsername");
    const user = useSelector((state) => state.loginUser.loginUser.user);

    useEffect(()=>{
        fetch("/getAllSuggestions")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setSuggest(data)
            // console.log(data)
        })
    },[addFriendState])
    const addFriendHandler = (res)=>{
      console.log(res)
      props.addFriend(res)
      setAddFriendState(res)
    }
  return <Fragment>
      <div>
          {suggest.map(data => {
              return(
                <>
                  <EachSuggestion suggestion = {data} addFriend={addFriendHandler}/>
                </>
              )
          })}
      </div>
  </Fragment>
};

export default Suggestions;
