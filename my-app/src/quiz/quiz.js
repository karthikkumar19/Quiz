import React,{Component} from 'react';
import {Card,Button} from 'react-bootstrap';
import classes from './quiz.module.css';
import Layout from '../hoc/Layout/Layout';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../components/UI/Spinner/Spinner';
import * as actions from '../store/actions/index';
import {Redirect} from 'react-router-dom';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

class Quiz extends Component{
  constructor(props) {
    console.log(props)
    super(props);
     this.state = {
      questions: this.props.questions,
      score:0,
      disabled:false,
      submitted:false
    }
   }
   componentWillReceiveProps(nextProps){
    if(this.state.questions.length !== nextProps.questions.length){
      this.setState({questions: nextProps.questions})
      console.log('re')
    }}
  
componentDidMount(){
this.props.onFetchData();

    console.log(this.state.questions)
}
  

 
 questions = (data) => {
    this.start(data);
}
start = (ques1) => {
    this.setState({questions:ques1})
}

onInputChange = (event) => {
  const  { questions }  = this.state;
console.log(questions,event.target.name,event.target.value)
  const nexState = questions.map(question => {
    if (question.QuestionName !== event.target.name) return question;
    return {
      ...question,
      options: question.options.map(opt => {
        console.log('work')
        const checked = opt.name === event.target.value;
     
        return {
          ...opt,
          selected: checked
        }
      })
      
    }
  });
  console.log(nexState)
  this.setState({ questions: nexState })
// console.log(this.state.score)
}


   score = 0;

  check = () => {
      this.state.questions.map((question) => {
          question.options.map((op)=>{
              if(op.selected === true){
                console.log(op.name)
                if(op.name === question.answer ){
                 this.score = this.score + 1;
              }else{
                this.score = this.score;
              }
            }
          })
      })
      this.setState({score: this.score})
  }

  submit = () => {
      this.check();
      console.log(this.props.profile[0].id)
      let score ={
        score:this.state.score,
        submitted:true
      }
      this.props.onAddScore(this.props.profile[0].id,score);
  }

    render(){

       let disp = <Spinner/>
       if(!this.props.loading){
        console.log(this.state.questions)
       let questions = this.state.questions;
        disp = questions.map((question,ind) => {
          console.log(ind)
            return(
                <div>
                  <Card className={classes.card}>
  <Card.Body>
  <h3>{question.QuestionName}</h3>                  
                    {
                    question.options.map((lo, idx) => {
                      console.log(lo.selected)
                      return (
                            <label  className={classes.radio}>
                          <input
                        key={idx}
                        type="radio"
                       
                        name={question.QuestionName}
                        value={lo.name}
                        checked={lo.selected}
                        onChange={(event) =>  this.onInputChange(event)}
                       
                      /> {lo.name}
                      </label>
                      )

                    })
                }
  </Card.Body>
</Card>
                   
                </div>               
            
            )
        })
       }

       const updatedRedirect = this.props.updated ? <Redirect to='/user' /> : null;

return(
    <Layout>
 <div className={classes.main}>
            <h1 className={classes.title}>Quiz</h1>
               {disp}
               {updatedRedirect}
            <Button disabled={this.state.disabled}  variant="success" className={classes.button} 
             onClick={this.submit}>Submit</Button>
            <h1 className={classes.score}>{this.state.score}</h1>
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
      profile:state.profile.profile,
      updated:state.quizdata.updated
      // isAuthenticated: state.auth.token !== null
       // token:state.auth.token,
      // userId:state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return{
      onFetchData : () => dispatch(actions.fetchData()),
      onAddScore : (id,scoreData) => dispatch(actions.addScore(id,scoreData)),

  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Quiz, axios)); 

