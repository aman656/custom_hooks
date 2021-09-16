import React, { useEffect, useState,useCallback } from 'react';
import useHttp from './components/hooks/use-https';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  
  const [tasks, setTasks] = useState([]);

  const{loading,error,requesttodb} =  useHttp()

  useEffect(() => {
    const taskHandler = (data)=>{
      const list = []
      for(const key in data){
        list.push({id:key,text:data[key].text})
      }
      setTasks(list)
    }
    requesttodb({url:"https://webapp-e180b-default-rtdb.firebaseio.com/tasks.json"},taskHandler);
  }, [requesttodb]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={loading}
        error={error}
        onFetch={requesttodb}
      />
    </React.Fragment>
  );
}

export default App;
