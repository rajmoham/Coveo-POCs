import {
    buildExecuteTrigger,
    SearchEngine,
    ExecuteTriggerParams,
    FunctionExecutionTrigger,
  } from '@coveo/headless';
import { useContext } from 'react';
import EngineContext from '../../common/engineContext';
   

  export function bindExecuteTrigger(engine: SearchEngine) {

    
    const controller = buildExecuteTrigger(engine);
    
   
    const executeFunction = (execution: FunctionExecutionTrigger) => {
      const {functionName, params} = execution;
   
      if (functionName === 'functionNameHere') {
        log(params);
      }
    };
   
    const log = (params: ExecuteTriggerParams) => {
      console.log('Function is called here',params)
    };
   
    const unsubscribe = controller.subscribe(() => {
      controller.state.executions.forEach((execution) => {
        executeFunction(execution);
      })
    });
    return unsubscribe;
  }


  const ExecuteTrigger: React.FC = ()=>{

    const engine = useContext(EngineContext)!;
    bindExecuteTrigger(engine);

    return null
  }


  export default ExecuteTrigger;