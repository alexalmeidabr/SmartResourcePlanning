import React, {Component} from "react";
import MapsWorldBubble from '../components/maps/MapsWorldBubble';
import Paper from '@material-ui/core/Paper';

class Maps extends Component {   
  

    render (){

        return (      
                                
            <div className={"content"}>

                <Paper className={"MapsWorldBubble"}>
                    <MapsWorldBubble/>                                        
                </Paper>  

            </div>
        
        );
    }
};

export default Maps;