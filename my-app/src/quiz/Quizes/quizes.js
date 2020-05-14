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

componentDidMount(){
    this.props.onFetchData();
}



    render(){
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
                    <div key={ind}>
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
                          <FontAwesomeIcon className={classes.trash} onClick={() => this.props.deleteQuiz(question.id)} icon={faTrashAlt} alt="delete" />
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
        onFetchData : () => dispatch(actions.fetchData()),
        deleteQuiz : (id) => dispatch(actions.deleteQuiz(id))
    }
}




export default connect(mapStateToProps,mapDispatchToProps) ( Quizes);