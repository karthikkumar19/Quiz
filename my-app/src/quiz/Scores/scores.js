import React,{Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import * as actions from '../../store/actions/index';
import {Card,DropdownButton,Dropdown} from 'react-bootstrap';
import classes from './scores.module.css';


class Scores extends Component{

state={
    search:'',
    Participant:[]
}

componentDidMount(){
    this.props.onFetchProfiles();
    
}


updateInput(event){
    let value = event.target.value;
    if(value != ''){
        var condition = new RegExp(value);
        this.setState({search:value})
    
    var result = this.props.profile.filter(function (el) {
      return condition.test(el.formData.name);
    });
    this.setState({Participant:result})
    }else{
        this.setState({Participant:''})

        
    }
   
    
    }
    searchParticipiants () {
        const suggestions = this.state.Participant;
        if(suggestions.length === 0){
            return null;
        }else{
            return(
                <span>
                    <h6 style={{color:'grey'}}>Search Results Below</h6>
                    {this.state.Participant.map((item,ind) => {
                        return(
                            <div className={classes.data} key={ind}>
                            <Card className={classes.card}>
            <Card.Body>
                              <h3>{item.formData.name}</h3>
                              <h5>{item.formData.email}</h5>
                              <h6>Score:- {item.score.score}</h6>
                              <h6>Time taken:-{item.score.Totaltime}</h6>
            </Card.Body>
          </Card>
                             
                          </div>       
                        )
                    }
                       
                    )}
                </span>
            )
        }
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
                <div className={classes.search}>
                <input name="start" type="text" value={this.state.value}
                    placeholder="Enter the Participiant Name" onChange={(event) => this.updateInput(event)}></input>
                </div>
                {this.searchParticipiants()}
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