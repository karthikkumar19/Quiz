import React,{Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import * as actions from '../../store/actions/index';
import {Card,OverlayTrigger,Popover} from 'react-bootstrap';
import classes from './quizes.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class Quizes extends Component{

state={
  type:'tech'
}

componentDidMount(){
    this.props.onFetchData(this.state.type);
}

componentDidUpdate(prevProps, prevState){
if(prevState.type!= this.state.type){
  this.props.onFetchData(this.state.type);
}
}




    render(){


      const onRadioChange = (e) => {
        this.setState({
          type: e.target.value
        });
      }

        const popover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">Delete the Quiz</Popover.Title>
            </Popover>
          );
        let quizes = <Spinner/>
        if(!this.props.loading){
            let questions = this.props.questions;
            if(questions.length === 0){
             quizes = <h1>Quiz is empty</h1>
            }else{
            quizes = questions.map((question,ind) => {
                return(
                    <div className={classes.data} key={ind}>
                      <Card className={classes.card}>
      <Card.Body>
     <h1>Question:- {ind+1}</h1>  <h3>{question.QuestionName}</h3>
        <h4>Options:-</h4>                  
                        {
                        question.options.map((lo, idx) => {
                          return (
                               <span key={idx} className={classes.Option}>{idx+1}:- {lo.name}</span>
                          )
    
                        })
                    } 
                    <OverlayTrigger trigger="hover" placement="right"   overlay={popover}>
                          <FontAwesomeIcon className={classes.trash} onClick={() => this.props.deleteQuiz(question.id,question.type)} icon={faTrashAlt} alt="delete" />
                  </OverlayTrigger>
                    <h4  >Answer:- {question.answer}</h4>

                   
      </Card.Body>
    </Card>
                       
                    </div>               
                
                )
            })
          }
        }

        return(
            <Layout>
            
 <div className={classes.main}>
 <label>
                <input
                  type="radio"
                  value="tech"
                  checked={this.state.type === "tech"}
                  onChange={onRadioChange}
                />
                <span>Technical</span>
              </label>
              <label className={classes.label}>
                <input
                  type="radio"
                  value="nonTech"
                  checked={this.state.type === "nonTech"}
                  onChange={onRadioChange}
                />
                <span>Non-Technical</span>
              </label>
               {quizes}
            </div>
            </Layout>
           
        )
    }
}

const mapStateToProps = state => {
return{
    questions:state.quizdata.questions,
    loading:state.quizdata.loading,
    fetched:state.quizdata.fetched,
}
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchData : (type) => dispatch(actions.fetchQuiz(type)),
        deleteQuiz : (id,type) => dispatch(actions.deleteQuiz(id,type))
    }
}




export default connect(mapStateToProps,mapDispatchToProps) ( Quizes);