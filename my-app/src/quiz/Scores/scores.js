import React,{Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import * as actions from '../../store/actions/index';
import {Card,DropdownButton,Dropdown} from 'react-bootstrap';
import classes from './scores.module.css';


class Scores extends Component{

componentDidMount(){
    this.props.onFetchProfiles();
}



    render(){

        let profilee = <Spinner/>
        if(!this.props.loading){
            let profiles = this.props.profile;
            profilee = profiles.map((profile,ind) => {
                return(
                    <div className={classes.data} key={ind}>
                      <Card className={classes.card}>
      <Card.Body>
                        <h3>{profile.formData.name}</h3>
                        <h5>{profile.formData.email}</h5>
                        <h6>Score:- {profile.score.score}</h6>
                        <h6>Time taken:-{profile.score.Totaltime}</h6>
      </Card.Body>
    </Card>
                       
                    </div>               
                
                )
            })
        }

        return(
            <Layout>
               
 <div className={classes.main}>
                <h3 className={classes.title}>Participant data and scores</h3>
                <div className={classes.header}>
                <DropdownButton id="dropdown-basic-button" title="Filter Scores">
  <Dropdown.Item  onClick={() => this.props.onLowScores(this.props.profile)}>Low to High</Dropdown.Item>
  <Dropdown.Item onClick={() => this.props.onHighScores(this.props.profile)}>High to Low</Dropdown.Item>
  
</DropdownButton>
                </div>
               
               {profilee}
            </div>
            </Layout>
           
        )
    }
}

const mapStateToProps = state => {
return{
    profile:state.profile.profile,
    loading:state.profile.loading,
    fetched:state.profile.fetched,
}
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchProfiles : () => dispatch(actions.fetchProfiles()),
        onLowScores :(profiles) => dispatch(actions.lowScores(profiles)),
        onHighScores :(profiles) => dispatch(actions.highScores(profiles))

    }
}




export default connect(mapStateToProps,mapDispatchToProps) ( Scores);