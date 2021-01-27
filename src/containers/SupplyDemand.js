import React, {Component} from "react";
import SDBalanceChart from '../components/supplyDemand/SDBalanceChart';
import SupplyPieChart from '../components/supplyDemand/SupplyPieChart';
import DemandPieChart from '../components/supplyDemand/DemandPieChart';
import SDActualStockTable from '../components/supplyDemand/SDActualStockTable';
import Paper from '@material-ui/core/Paper';

class SupplyDemand extends Component {   

    constructor(){

        super();
        this.state = {
            value: 0,
            date: null
        }

    }
    
    onSelection(newSelection){
        
        //console.log(newSelection);
        this.setState({value: newSelection.visits});
        this.setState({date: newSelection.date});
    
    }

    render (){

        return (      
            
            
            
            <div className={"content"}>

                <Paper className={"sdBalanceChart"}>
                    <SDBalanceChart selection={this.onSelection.bind(this)}/>                    
                </Paper>  

                <Paper className={"SDPieChart"}>
                    <SupplyPieChart 
                        value={this.state.value} 
                        date={this.state.date}/>
                </Paper>

                <Paper className={"SDPieChart"}>
                    <DemandPieChart 
                        value={this.state.value} 
                        date={this.state.date}/>
                </Paper>

                <Paper className={"SDTables"}>
                    <SDActualStockTable/>
                </Paper>

            </div>
        
        );
    }

};

export default SupplyDemand;