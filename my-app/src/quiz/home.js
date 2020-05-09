import React,{useState} from 'react';
import Quiz from './quiz';
import Addquiz from './AddQuiz/addquiz';

const Home = props => {

const [toogle,setToogle] = useState(false);
const [questions,setQuestions] = useState([
    {
        QuestionName: 'who is the founder of apple?', options: [{ name: 'Mark', selected: false},
        { name: 'stevejobs', selected: false }], answer:'stevejobs'
      },
      {
          QuestionName: 'who is the founder of tesla?', options: [{ name: 'Musk', selected: false},
          { name: 'gates', selected: false }], answer:'Musk'
        },
]);
// const [score,setScore] = useState(0);
// const [disabled,setDisabled] = useState(false)
   
const addquiz = question => {
    setQuestions([...questions,question]);
    setToogle(!toogle);
}
  
let name = <Quiz data={questions}/>
if(toogle){
 name = <Addquiz add={addquiz} />
}

const toggle = e => {
    e.preventDefault();
   setToogle(!toogle);
  }

    return(
        <div>
 {name}
        <button onClick={toggle}>{toogle ? 'Quiz' : 'Add Quiz'}</button>
        </div>
       

    )
}

export default Home;