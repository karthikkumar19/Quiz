import * as React from 'react'
import update from 'react-addons-update';
import "bootstrap/dist/css/bootstrap.css";
import Layout from '../../hoc/Layout/Layout';
// import {  Redirect } from 'react-router-dom';
import {Button,InputGroup,FormControl} from 'react-bootstrap';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from '../AddQuiz/addquiz.module.css';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import {connect} from 'react-redux';
class Addquiz extends React.Component{

state={
    QuestionName:'',
     options:[{ name: '', selected: false }],
     answer:'',
     type:'tech'
  }

  
    render(){
     
//input of busname and no

const onRadioChange = (e) => {
  this.setState({
    type: e.target.value
  });
}


const handleNo = event =>{
  event.preventDefault();
  if(event.target.name === 'question' ){
    this.setState({QuestionName:event.target.value});
  }else{
      this.setState({answer:event.target.value})
  }
  
}

const handleSubmit = e => {
  e.preventDefault();
    console.log(this.state);
    this.props.onAddQuiz(this.state,this.state.type);
}
    
      //Updating firstname and lastname Method!!
      const handleInputChange = (index, event) => {
        if(event.target.name === 'option'){
          this.setState({options: update(this.state.options, 
              { [index]: { name: { $set: event.target.value } } } 
        )});
        }
    
        }
      
    
      //Pushing Bus data Method!!
      const OnhandleAddFields = () => {
        const values = [...this.state.options];
        values.push({name:"",selected:false
      });
        this.setState({options:values});
      };

      //Popping Bus data Method!!
      const OnhandleRemoveFields = (indexs) => {
        const values = [...this.state.options];
        values.splice(indexs, 1);
        this.setState({options:values});
      };


    



    //   {/* <form onSubmit={handleSubmit}> */}
           let name =      this.state.options.map((inputField, index) => {
               return(
<React.Fragment key={`${inputField}~${index}`}>
  <div className="form-group col-sm-6">
    <label htmlFor="time">Option</label>
    <input
      type="text"
      className="form-control"
      id="option"
      name="option"
      value={inputField.option}
      onChange={event => handleInputChange(index, event)}
    />
  </div>
 
  <div className="form-group col-sm-2">
    <button
      className="btn btn-link"
      type="button"
      onClick={() => OnhandleRemoveFields()}
    >
      -
    </button>
    <button
      className="btn btn-link"
      type="button"
      onClick={() => OnhandleAddFields()}
    >
      +
    </button>
  </div>
</React.Fragment>
               )
           });
        
          //  const fetchedRedirect = this.props.added ? <Redirect to='/' /> : null;
           let form  = (
             <div>
               <label>
                <input
                  type="radio"
                  value="tech"
                  checked={this.state.type === "tech"}
                  onChange={onRadioChange}
                />
                <span>Technical</span>
              </label >
              <label className={classes.label}>
                <input
                  type="radio"
                  value="nonTech"
                  checked={this.state.type === "nonTech"}
                  onChange={onRadioChange}
                />
                <span>Non-Technical</span>
              </label>
             <InputGroup className="mb-3">
                 <InputGroup.Prepend>
                   <InputGroup.Text id="basic-addon1">Question Name </InputGroup.Text>
                 </InputGroup.Prepend>
                 <FormControl name="question" type="text" value={this.state.QuestionName}
                 onChange={(event) => handleNo(event)}
                   placeholder="Enter Question"
                   aria-describedby="basic-addon1"
                 />
               </InputGroup>
                {name}
                <div className="form-group col-sm-6">
                 <label htmlFor="time">Answer</label>
                 <input
                   type="text"
                   className="form-control"
                   id="answer"
                   name="answer"
                   value={this.state.answer}
                   onChange={event => handleNo( event)}
                 />
               </div>
             <Button variant="success"
             type="submit"
             onClick={(event) => handleSubmit(event,this.state)}>
             Save
             </Button>     
             </div>
           )
           if ( this.props.loading ) {
            form = <Spinner />;
        }
return (
<div className={classes.inputMain}>

  <Layout>
  <h1>Add Quiz Data</h1>
{form}
<pre>
 {JSON.stringify(this.state, null, 2)}
</pre>
  </Layout>

</div>
  )
          }
        }
        const mapStateToProps = state =>{
          return{
              loading:state.auth.loading,
              // token: state.auth.token,
              // userId:state.auth.userId
          }
      };
      
      const mapDispatchToProps = dispatch => {
          return{
              onAddQuiz : (quizData,type) => dispatch(actions.addData(quizData,type))
          }
      }
        
      export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Addquiz,axios));
