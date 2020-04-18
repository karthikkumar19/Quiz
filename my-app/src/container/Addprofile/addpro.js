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
                    placeholder: 'Name of the company'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            ownerName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name of owner'
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
                    placeholder: `Company's e-mail id`
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
                    placeholder: `Company's Ph no`
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric:true
                },
                valid: false,
                touched: false
            },
            pocnumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'POC contact number'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric:true
                },
                valid: false,
                touched: false
            },
            regoffice: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Registered Office'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            proSite: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Project Site'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            cinNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'CIN NO.'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            yearofexb: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Year of Establishment'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            dcb: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date of Commenencement of Business'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            panNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'PAN NO/ TAN NO'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            gst: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'GST NO'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            uam: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'UAM No. / Aadhaar No'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            Ra: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Rating Assigned'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric:true
                },
                valid: false,
                touched: false
            },
            proser: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product / Service'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            industry: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Industry Sector'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
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
        const purchasedRedirect = this.props.purchased ? <Redirect to='/main' /> : null;
        let form = (
            <div >
            {purchasedRedirect}
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
                <h4>Add your SME Data</h4>
                {form}
                
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        purchased:state.auth.purchased,
        token: state.auth.token,
        userId:state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAddData : (proData,token) => dispatch(actions.addData(proData,token)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Addpro,axios));