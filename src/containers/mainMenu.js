import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PageviewIcon from '@material-ui/icons/Pageview';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RoomIcon from '@material-ui/icons/Room';
import { withRouter } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

function ResponsiveDrawer(props) {
  const { window } = props;
  const { history } = props;  
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawerWidth = props.width;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        background: '#673ab7',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [openResourceVisibility, setOpenResourceVisibility] = React.useState(false);
  const [openSupplyDemand, setOpenSupplyDemand] = React.useState(false);
  const [openResourceBalancing, setOpenResourceBalancing] = React.useState(false);
  const [openReports, setOpenReports] = React.useState(false);
  const [openMaps, setOpenMaps] = React.useState(false); 
  const [openConfiguration, setOpenConfiguration] = React.useState(false); 

  function handleClick(item) {

    switch(item){

      case 1:

        setOpenResourceVisibility(!openResourceVisibility);
        if(openSupplyDemand) setOpenSupplyDemand(!openSupplyDemand);   
        if(openResourceBalancing) setOpenResourceBalancing(!openResourceBalancing);   
        if(openReports) setOpenReports(!openReports);   
        if(openMaps) setOpenMaps(!openMaps);           
        if(openConfiguration) setOpenConfiguration(!openConfiguration);
        history.push("/ResourceVisibility");
        break;

      case 11:

        history.push("/ResourceStock");
        break;

      case 12:
        
        history.push("/ResourceContainers");
        break; 

      case 13:
      
        history.push("/ResourceCharts");
      break; 
      
      case 2:

        setOpenSupplyDemand(!openSupplyDemand);
        if(openResourceVisibility) setOpenResourceVisibility(!openResourceVisibility);   
        if(openResourceBalancing) setOpenResourceBalancing(!openResourceBalancing);   
        if(openReports) setOpenReports(!openReports);   
        if(openMaps) setOpenMaps(!openMaps);
        if(openConfiguration) setOpenConfiguration(!openConfiguration);
        history.push("/SupplyDemand");
        break;

      case 3:

        setOpenResourceBalancing(!openResourceBalancing);
        if(openResourceVisibility) setOpenResourceVisibility(!openResourceVisibility);   
        if(openSupplyDemand) setOpenSupplyDemand(!openSupplyDemand);   
        if(openReports) setOpenReports(!openReports);   
        if(openMaps) setOpenMaps(!openMaps);  
        if(openConfiguration) setOpenConfiguration(!openConfiguration);
        history.push("/");
        break;

      case 4:

        setOpenReports(!openReports);   
        if(openResourceVisibility) setOpenResourceVisibility(!openResourceVisibility);   
        if(openSupplyDemand) setOpenSupplyDemand(!openSupplyDemand);   
        if(openResourceBalancing) setOpenResourceBalancing(!openResourceBalancing);   
        if(openMaps) setOpenMaps(!openMaps);         
        if(openConfiguration) setOpenConfiguration(!openConfiguration); 
        history.push("/");
        break;

      case 5:

        setOpenMaps(!openMaps);
        if(openResourceVisibility) setOpenResourceVisibility(!openResourceVisibility);   
        if(openSupplyDemand) setOpenSupplyDemand(!openSupplyDemand);   
        if(openResourceBalancing) setOpenResourceBalancing(!openResourceBalancing);   
        if(openReports) setOpenReports(!openReports);   
        if(openConfiguration) setOpenConfiguration(!openConfiguration);
        history.push("/Maps");
        break;

      case 6:

        setOpenConfiguration(!openConfiguration);
        if(openResourceVisibility) setOpenResourceVisibility(!openResourceVisibility);   
        if(openSupplyDemand) setOpenSupplyDemand(!openSupplyDemand);   
        if(openResourceBalancing) setOpenResourceBalancing(!openResourceBalancing);   
        if(openReports) setOpenReports(!openReports);     
        if(openMaps) setOpenMaps(!openMaps);           
        history.push("/");
        break;

        case 61:

          history.push("/ResourceVisibilityConfiguration");
          break;

    }        
  }

  const drawer = (
    
    <div>
      <div className={classes.toolbar} />
      <Divider />
              
      <List>
         <ListItem button key={"Resource Visibility"}  onClick={() => handleClick(1)} >
              <ListItemIcon>{<PageviewIcon />}</ListItemIcon>
              <ListItemText primary={"Resource Visibility"} />
              {openResourceVisibility ? <IconExpandLess /> : <IconExpandMore />}          
          </ListItem>

          <Collapse in={openResourceVisibility} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button className={classes.menuItem} onClick={() => handleClick(11)}>
                <ListItemText inset primary="Stock" />
              </ListItem>
              <ListItem button className={classes.menuItem} onClick={() => handleClick(12)}>
                <ListItemText inset primary="Containers" />
              </ListItem>
              <ListItem button className={classes.menuItem} onClick={() => handleClick(13)}>
                <ListItemText inset primary="Charts" />
              </ListItem>
            </List>
      </Collapse>
      </List>        

      <List>
         <ListItem button key={"Supply and Demand"}  onClick={() => handleClick(2)} >
              <ListItemIcon>{<TimelineIcon />}</ListItemIcon>
              <ListItemText primary={"Supply and Demand"} />
              {openSupplyDemand ? <IconExpandLess /> : <IconExpandMore />}          
          </ListItem>

          <Collapse in={openSupplyDemand} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
               <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Charts" />
              </ListItem>
            </List>
      </Collapse>
      </List>  

      <List>
         <ListItem button key={"Resource Balancing"}  onClick={() => handleClick(3)} >
              <ListItemIcon>{<LowPriorityIcon />}</ListItemIcon>
              <ListItemText primary={"Resource Balancing"} />
              {openResourceBalancing ? <IconExpandLess /> : <IconExpandMore />}          
          </ListItem>

          <Collapse in={openResourceBalancing} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
               <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Charts" />
              </ListItem>
            </List>
      </Collapse>
      </List>  

      <List>
         <ListItem button key={"Reports"}  onClick={() => handleClick(4)} >
              <ListItemIcon>{<MenuBookIcon />}</ListItemIcon>
              <ListItemText primary={"Reports"} />
              {openReports ? <IconExpandLess /> : <IconExpandMore />}          
          </ListItem>

          <Collapse in={openReports} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
               <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Charts" />
              </ListItem>
            </List>
          </Collapse>
      </List>  

      <List>
         <ListItem button key={"Maps"}  onClick={() => handleClick(5)} >
              <ListItemIcon>{<RoomIcon />}</ListItemIcon>
              <ListItemText primary={"Maps"} />
              {openMaps ? <IconExpandLess /> : <IconExpandMore />}          
          </ListItem>

          <Collapse in={openMaps} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
               <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Charts" />
              </ListItem>
            </List>
          </Collapse>
      </List>  
      
      <Divider />
      <List>
          <ListItem button key={"Configuration"}  onClick={() => handleClick(6)} >
              <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
              <ListItemText primary={"Configuration"} />
              {openConfiguration ? <IconExpandLess /> : <IconExpandMore />}          
          </ListItem>
          <Collapse in={openConfiguration} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
               <ListItem button className={classes.menuItem} onClick={() => handleClick(61)}>
                <ListItemText inset primary="Resource Visibility" />
              </ListItem>
            </List>
          </Collapse>
      </List>
    </div>
    
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
      </main>
    </div>
    
  );
}

export default withRouter(ResponsiveDrawer);

