import React,{Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import * as actions from '../../store/actions/index';
import {Card} from 'react-bootstrap';
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
                    <div key={ind}>
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
               {profilee}
            </div>
            </Layout>
           
        )
    }
}

const mapStateToProps = state => {
return{
    profile:state.profile.profile,
    loading:state.quizdata.loading,
    fetched:state.quizdata.fetched,
}
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchProfiles : () => dispatch(actions.fetchProfiles()),

    }
}




export default connect(mapStateToProps,mapDispatchToProps) ( Scores);