import React from 'react';
import './App.css';
import Drawer from './containers/mainMenu';
import Maps from './containers/Maps';
import Header from './containers/Header';
import SupplyDemand from './containers/SupplyDemand';
import ResourceVisibility from './containers/ResourceVisibility';
import ResourceStock from './containers/ResourceStock';
import ResourceContainers from './containers/ResourceContainers';
import ResourceVisibilityConfiguration from './containers/ResourceVisibilityConfiguration';
import Configuration from './containers/Configuration';
import ResourceCharts from './containers/ResourceCharts';
import {Route, Switch} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {Provider} from "react-redux";
import store from './stores/store';

const drawerWidth = 230;

export default function App() {
    
  return (            

    <Provider store={store}>          

        <div className={"container"}>

            <div className={"header"}>
                <Header width={drawerWidth}/>
            </div>

            <div className={"appArea"}>
            
                <div className={"menu"}>
                    <Drawer width={drawerWidth}/>
                </div>                

                <div className={"content"}>                    
                    
                        <Switch>

                                <Route exact path="/">
                                    <img src="./img/main.jpg" alt="ship on sunrise"/>  
                                </Route>  
                            
                                <Route exact path="/ResourceVisibility">
                                    <ResourceVisibility/>
                                </Route>                 

                                <Route exact path="/ResourceStock">
                                    <ResourceStock/>
                                </Route>        
                                
                                <Route exact path="/ResourceContainers">
                                    <ResourceContainers/>
                                </Route> 

                                <Route exact path="/ResourceCharts">
                                    <ResourceCharts/>
                                </Route>                                                      
                            
                                <Route exact path="/SupplyDemand">
                                    <Paper className={"paper"}>
                                        <SupplyDemand/>  
                                    </Paper>                            
                                </Route>                    
                        
                                <Route exact path="/Maps">
                                    <Paper className={"paper"}>
                                        <Maps/>       
                                    </Paper>      
                                </Route>

                                <Route exact path="/Configuration">
                                    <Paper className={"paper"}>
                                        <Configuration/>       
                                    </Paper>      
                                </Route>

                                <Route exact path="/ResourceVisibilityConfiguration">
                                    <Paper className={"paper"}>
                                        <ResourceVisibilityConfiguration/>       
                                    </Paper>      
                                </Route>                                
                            
                        </Switch>
                </div>   
            </div>                             
                                                                                                        
        </div>
    </Provider>
  ); 
}