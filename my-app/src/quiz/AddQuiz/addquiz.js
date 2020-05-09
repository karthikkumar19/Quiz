import * as React from 'react'
import update from 'react-addons-update';
// import axios from '../../axios_orders';
// import Button from '../Components/UI/Button/button';
import "bootstrap/dist/css/bootstrap.css";
import {Button,InputGroup,FormControl} from 'react-bootstrap';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from '../AddQuiz/addquiz.module.css';
class Addquiz extends React.Component{

state={
    QuestionName:'',
     options:[{ name: '', selected: false }],
     answer:''
  }

  
    render(){
     
//input of busname and no

const handleNo = event =>{
  event.preventDefault();
  if(event.target.name === 'question' ){
    this.setState({QuestionName:event.target.value});
  }else{
      this.setState({answer:event.target.value})
  }
  
}

const handleSubmit = e => {
    console.log(this.state)
}
    //Submit data method!!
    //   const handleSubmit = e => {
    //     e.preventDefault();
    //     // const formData = {};
    //     // console.log(this.state);
    //     // for (let formElementIdentifier in this.state) {
    //     //     formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    //     // }
    //     // console.log(formData);
    //     axios.post( '/buses.json', this.state )
    //     .then( response => {
    //       console.log(response.data);
    //     } )
    //     .catch( error => {
    //     } );
    //     console.log("inputFields", this.state);
    //   };
    //   const handleInputChangeState = ( event,indexs) => {
    //     this.setState({
    //       names: update(this.state.names, {[indexs]: {stopname: {$set: event.target.value}}})
    //     })

    //   };


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
        


return (
<div className={classes.inputMain}>
<h1>Add Stop Data</h1>
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
onClick={(event) => this.props.add(this.state)}>
Save
</Button>     
<pre>
 {JSON.stringify(this.state, null, 2)}
</pre>
</div>
  )
          }
        }
        export default Addquiz;