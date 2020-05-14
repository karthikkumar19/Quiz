import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Admin extends Component{

   

    render(){

let admin = this.props.profile.map((pro,ind) => {
    console.log(pro)
       return(
          
           <div key={ind}>
           <h3>Welcome {pro.formData.name}</h3>
                      </div>
       )
       
   })

        return(
            <div>
                {admin}
               <Link to="/add"> <Button>Add Quiz</Button></Link> 
               <Link to="/quizes">  <Button>View Quiz</Button></Link>
               <Link to="/scores">  <Button>View Scores</Button></Link>
            </div>
        )
    }
}

export default Admin;