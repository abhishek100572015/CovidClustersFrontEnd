import React, { Component } from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Options from './components/Options/Options';
import HexagonView from './components/HexagonView/HexagonView';
import TabPanel from './components/TabPanel/TabPanel';

import { getAllHexagons } from './core/services';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      hexagons: {},
      highlight: {},
      refHexagon: '',
      loading: true,
    };
  }

  componentDidMount() {
    getAllHexagons(this.getAllHexagonsSuccess, this.getAllHexagonsFailure);
  }

  getAllHexagonsSuccess = (response) => {
    this.setState({
      loading: false,
      hexagons: response,
    });
  }

  getAllHexagonsFailure = () => {
    this.setState({
      loading: false,
    });
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
      highlight: {},
      refHexagon: '',
    });
  };

  updateView = (newValue = 0, refHexagon = '', highlight = {}) => {
    const { value, hexagons } = this.state;
    if (value === 0) {
      hexagons[refHexagon] = highlight[refHexagon];
    } else if (value === 2) {
      delete hexagons[refHexagon];
    }
    this.setState({
      hexagons,
      highlight,
      refHexagon,
      value: newValue,
    });
  }

  render() {
    const { value, hexagons, highlight, refHexagon, loading } = this.state;

    return (
      <div className={'wrapper'}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Add" {...a11yProps(0)} />
            <Tab label="Find" {...a11yProps(1)} />
            <Tab label="Delete" {...a11yProps(2)} />
            <Tab label="Map" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <div className={'content'}>
          <div className={'partition'}>
            <TabPanel value={value} index={0}>
              <Options hexagons={hexagons} option={0} handleChange={this.updateView} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Options hexagons={hexagons} option={1} handleChange={this.updateView} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Options hexagons={hexagons} option={2} handleChange={this.updateView} />
            </TabPanel>
            <TabPanel className={'hide'} value={value} index={3}></TabPanel>
          </div>
          <div className={'scrollable'}>
            {
              loading ? 
                <span>Loading....</span> :
                <HexagonView hexagons={hexagons} highlight={highlight} refHexagon={refHexagon} />
            }
          </div>
        </div>
      </div>
    );
  }
}
