import { Fragment } from "react"

const FriendsComponent = (props)=>{
    return <Fragment>
        {props.data.map(friend => <><button>Add+</button><p >{friend.name}</p></>)}
    </Fragment>
}

export default FriendsComponent;