import React,{Component} from 'react';
import {Card,Button} from 'react-bootstrap';
import classes from './quiz.module.css';

class Quiz extends Component{
  
  state={
    questions:[],
    score:0,
    disabled:false
  }
  
componentDidMount(){
    this.questions(this.props.data);
    console.log(this.props.data)
}
  

 
 questions = (data) => {
    
    
   
    this.start(data);
}
start = (ques1) => {
    this.setState({questions:ques1})
}

onInputChange = (event,ind) => {
    const { questions } = this.state;

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
            console.log(op)
              if(op.selected === true){
                console.log(op.name)
                if(op.name === question.answer ){
                  console.log('corret')
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
      console.log(this.state.score)
this.setState({disabled:true})
  }

    render(){

       let disp = <h1>loading</h1>
       let answer = <h1>hello</h1>
       if(this.state.questions!=null){
       let questions = this.state.questions;
        disp = questions.map((question,ind) => {
            return(
                <div>
                  <Card className={classes.card}>
  <Card.Body>
  <h3>{question.QuestionName}</h3>                  
                    {
                    question.options.map((lo, idx) => {
                      return (
                            <label  className={classes.radio}>
                          <input
                        key={idx}
                        type="radio"
                       
                        name={question.QuestionName}
                        value={lo.name}
                        checked={lo.selected}
                        onChange={(event) =>  this.onInputChange(event,ind)}
                       
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


return(
    
            <div className={classes.main}>
            <h1 className={classes.title}>Quiz</h1>
               {disp}
            <Button disabled={this.state.disabled}  variant="success" className={classes.button} 
             onClick={this.submit}>Submit</Button>
            <h1 className={classes.score}>{this.state.score}</h1>
            </div>
        )
    }
   
}

export default Quiz;