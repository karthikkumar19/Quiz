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
import Timer from './Timer/timer';
import { thisExpression } from '@babel/types';

class Quiz extends Component{
  constructor(props) {
    super(props);
     this.state = {
      questions: this.props.questions,
      score:0,
      disabled:false,
      submitted:false,
      seconds:600,time:{}
     }
   this.timer=0;
   }

  
   UNSAFE_componentWillReceiveProps(nextProps){
    if(this.state.questions.length !== nextProps.questions.length){
      this.setState({questions: nextProps.questions})
    }}

  //   componentWillUnmount() {
  //     this.props.history.goForward();
  // }
  
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let time = `h:${hours} m:${minutes} s:${seconds}`
    

    // let obj = {
    //   "h": hours,
    //   "m": minutes,
    //   "s": seconds
    // };
    return time;
  }
  
componentDidMount(){
  console.log("mm")
this.props.onFetchData();
    window.onbeforeunload = function() {
      return    console.log('refresh')
   };
   let timeLeftVar = this.secondsToTime(600);
   this.startTimer();
}

startTimer() {
   
  if (this.timer === 0 ) {
      this.timer = setInterval(this.countDown, 1000);
  }
  
}


countDown = () => {
  let seconds = this.state.seconds - 1;
 
  this.setState({
    time: this.secondsToTime(seconds),
    seconds: seconds,
  });
  
  // Check if we're at zero.
  if (seconds === 0) { 
      console.log('w')
    clearInterval(this.timer);
  }
 

}

componentDidUpdate(){
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
  };
    }

// startTimer = () => {
//   var dat = new Date().toLocaleTimeString();
//   this.setState({startSec:this.hourTosec(dat)})
// }
//   hourTosec(dat){
//     var a = dat.split(':'); // split it at the colons

//     // minutes are worth 60 seconds. Hours are worth 60 minutes.
//     var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
//     return seconds;
//   }


 
 questions = (data) => {
    this.start(data);
}
start = (ques1) => {
    this.setState({questions:ques1})
}

onInputChange = (event) => {
  const  { questions }  = this.state;
  const nexState = questions.map(question => {
    if (question.QuestionName !== event.target.name) return question;
    return {
      ...question,
      options: question.options.map(opt => {
        const checked = opt.name === event.target.value;
     
        return {
          ...opt,
          selected: checked
        }
      })
      
    }
  });
  this.setState({ questions: nexState })
// console.log(this.state.score)
}


   score = 0;

  check = () => {
      this.state.questions.map((question) => {
          question.options.map((op)=>{
              if(op.selected === true){
                if(op.name === question.answer ){
                 this.score = this.score + 1;
              }else{
                this.score = this.score;
              }
            }
          })
      })
     
      // this.setState({score: this.score})
  }

//   convertTime(sec) {
//     var hours = Math.floor(sec/3600);
//     (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
//     var min = Math.floor(sec/60);
//     (min >= 1) ? sec = sec - (min*60) : min = '00';
//     (sec < 1) ? sec='00' : void 0;

//     (min.toString().length === 1) ? min = '0'+min : void 0;    
//     (sec.toString().length === 1) ? sec = '0'+sec : void 0;    

//     return hours+':'+min+':'+sec;
// }

// totalTime = 0;





  submit = () => {
      this.check();
      // var dat = new Date().toLocaleTimeString();
      // this.finishsec = this.hourTosec(dat);
      // let difftime = this.finishsec - this.state.startSec;
      // this.totalTime = this.convertTime(difftime);
      clearInterval(this.timer);
      let finalsec = 600 - this.state.seconds
      console.log(this.secondsToTime( finalsec))
      let total = this.secondsToTime(finalsec);
      let score ={
        score:this.score,
        submitted:true,
        Totaltime:total
      }
      this.props.onAddScore(this.props.profile[0].id,score);
  }

    render(){

       let disp = <Spinner/>
       if(!this.props.loading){
       let questions = this.state.questions;
        disp = questions.map((question,ind) => {
            return(
                <div key={ind}>
                  <Card className={classes.card}>
  <Card.Body>
  <h3>{question.QuestionName}</h3>                  
                    {
                    question.options.map((lo, idx) => {
                      return (
                            <label key={idx}  className={classes.radio}>
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
           
            <Timer  submit={this.submit}/>
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
     
  }
}

const mapDispatchToProps = dispatch => {
  return{
      onFetchData : () => dispatch(actions.fetchData()),
      onAddScore : (id,scoreData) => dispatch(actions.addScore(id,scoreData)),

  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Quiz, axios)); 

