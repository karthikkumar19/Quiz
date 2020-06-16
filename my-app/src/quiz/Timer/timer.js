import React,{Component} from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

class Timer extends Component {


    constructor() {
        super();
        this.state = { time: {}, seconds: 1800 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
      }
    

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }

componentDidMount(){
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();

    // setInterval(this.updateCountdown,1000);

}

startTimer() {
   
    if (this.timer === 0 && this.state.seconds > 0) {
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
          this.props.submit();
        }
        //  let minutes = Math.floor(this.count / 60);
        //  let seconds = this.count % 60;
        //  seconds = seconds < 10 ? '0' + seconds : seconds;
        //  minutes = minutes < 10 ? '0' + minutes : minutes;
        //  this.countdownEl.innerHTML = `${minutes} : ${seconds}`
        //  if(minutes == 0 && seconds == 0){
        //      clearInterval(this.updateCountdown);
        //      this.timeup();
        //  }
        //  this.count--;
     
     }
    

     
     
     timeup = () => {
         alert('time up!')
     }

     
    
  
      
      

    render(){
     

        return(
            <div>
        m: {this.state.time.m} s: {this.state.time.s}
            </div>
          
        )
    }
}

export default withErrorHandler(Timer,axios);