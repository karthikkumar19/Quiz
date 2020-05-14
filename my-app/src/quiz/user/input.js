import React from 'react';
import {InputGroup,FormControl} from 'react-bootstrap';



const Input = props => {
    return(
        <div>
            <InputGroup className="mb-3" >
             <InputGroup.Prepend>
      <InputGroup.Text style={{width:"150px"}} id="basic-addon1">{props.value}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl disabled
      value={props.children}
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
        </div>
    )
}

export default Input;