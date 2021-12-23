import classes from './index.module.css'
import TopComponent from './TopComponent/topComponent';
import BottomComponent from './BottomComponent/bottomComponent';

const UserDashboardComponent = () => {
    return <div>
        <div className={classes.topComponent}>
            <TopComponent/>
        </div>
        <div className={classes.bottomComponent}>
            <BottomComponent/>
        </div>
    </div>
}

export default UserDashboardComponent;