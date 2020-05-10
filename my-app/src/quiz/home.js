import React,{Component} from 'react';

class Home extends Component {
   
    LoginHandler = e => {
        e.preventDefault();
        this.props.history.push('/auth');
    }
    render(){


        return(
            <div>
                <h1>PSNACET HOME</h1>
                <button onClick={this.LoginHandler}>Login to continue</button>
            </div>
        )
    }
}



export default Home;

