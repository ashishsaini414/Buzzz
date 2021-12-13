import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch} from 'react-redux'

const Suggestions = () => {
    const dispatch = useDispatch()
    const [suggest, setSuggest] = useState([])
    console.log(suggest)
    useEffect(()=>{
        fetch("/getAllUsers")
        .then((res) => res.json())
        .then((data) => {
            setSuggest(data)
            // console.log(data)
        })
    },[])
    // console.log(suggest)
    const addFriendHandler = (data) => {
            fetch("/updateMyFriends",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data => dispatch({type:"ADD_FRIEND", data: data}))
    }
  return <Fragment>
      <div>
          {suggest.map(data => {
              return(
            //   <img src={ttnLogo} onError={<FaUser/>} alt=""></img>,
              <p onClick={(event) => addFriendHandler(data)}>{data.name}</p>
              )
          })}
      </div>
  </Fragment>
};

export default Suggestions;
