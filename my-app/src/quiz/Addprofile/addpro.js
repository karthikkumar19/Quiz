import React, { Component } from 'react';
// import Button from '../Components/UI/Button/button';
import {connect} from 'react-redux';
import {  Redirect } from 'react-router-dom';
import classes from './addprofile.module.css';
// import axios from '../axios-orders';
import axios from 'axios';
import Input from '../../components/UI/Input/input';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidity} from '../../shared/utility';


class Addpro extends Component {



    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name of the Participant'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            collegeName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name of the College'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: `Enter your E-mail id`
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            phno: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: `Enter your Mobile no`
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric:true
                },
                valid: false,
                touched: false
            },
            
            dept: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Department Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter current Year'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        }
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        console.log(this.state.orderForm);
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        console.log(formData);
        const profile = {
            formData:formData,
            userId:this.props.userId
        }
        this.props.onAddData(profile,this.props.token);
            
    }

    

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
                value:event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
                touched:true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]:updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

   

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        const updatedRedirect = this.props.updated ? <Redirect to='/user' /> : null;
        let form = (
            <div >
            {updatedRedirect}
            <form  onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <div >
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        </div>
                ))}
                <button btnType="Success" >SUBMIT</button>
            </form>
            </div>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.PageData}>
                <h4>Add Participiant data</h4>
                {form}
                
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        updated:state.auth.fetched,
        token: state.auth.token,
        userId:state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAddData : (proData,token) => dispatch(actions.addProfile(proData,token)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Addpro,axios));