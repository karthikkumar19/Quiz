import React,{Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import * as actions from '../../store/actions/index';
import {Card} from 'react-bootstrap';
import classes from './quizes.module.css';

class Quizes extends Component{

componentDidMount(){
    this.props.onFetchData();
}



    render(){

        let quizes = <Spinner/>
        if(!this.props.loading){
            let questions = this.props.questions;
            quizes = questions.map((question,ind) => {
              console.log(question)
                return(
                    <div>
                      <Card className={classes.card}>
      <Card.Body>
     <h1>Question:- {ind+1}</h1>  <h3>{question.QuestionName}</h3>
        <h4>Options:-</h4>                  
                        {
                        question.options.map((lo, idx) => {
                          return (
                               <span className={classes.Option}>{idx+1}:- {lo.name}</span>
                          )
    
                        })
                    }
                    <h4>Answer:- {question.answer}</h4>
      </Card.Body>
    </Card>
                       
                    </div>               
                
                )
            })
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

    }
}




export default connect(mapStateToProps,mapDispatchToProps) ( Quizes);