

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../hooks/use-https';

const NewTask = (props) => {
  const{isLoading,error,requesttodb} = useHttp()
  const createTask = (taskText,taskData)=>{
    const id = taskData.name
    const createdTask  = {id:id,text:taskText}
    props.onAddTask(createdTask)
  }


  const enterTaskHandler = async (taskText) => {
    requesttodb({
      url:'https://webapp-e180b-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:{text:taskText}
    },createTask.bind(null,taskText))
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
