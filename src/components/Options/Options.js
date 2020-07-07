import React from 'react';
import PropTypes from 'prop-types';
import './Options.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { addNewHexagon, getNeighbors, deleteHexagon } from '../../core/services';

const BUTTON_VALUE = [
  'Add',
  'Find',
  'Delete',
];

function Options(props) {
  const { option, handleChange, hexagons } = props;
  const [name, setName] = React.useState('');
  const [neighborhood, setNeighborhood] = React.useState('');
  const [edge, setEdge] = React.useState('');
  const [error, setError] = React.useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEdgeChange = (event) => {
    setEdge(event.target.value);
  };

  const handleNeighborhoodChange = (event) => {
    setNeighborhood(event.target.value);
  };

  const handleSubmit = () => {
    if (option === 0) {
      if (name && neighborhood && parseInt(edge) >= 0 && parseInt(edge) <= 5) {
        if (!hexagons[name] && hexagons[neighborhood]) {
          addNewHexagon({
            newHexagon: name,
            neighbor: neighborhood,
            sharedEdgeNeighbor: edge,
          }, onSuccess, onFailure);
        } else {
          setError('Nighborhood doesn\'t exist or New name is already taken');
        }
      } else {
        setError('Incorrect/Empty fields');
      }
    } else if (option === 1) {
      if (name) {
        if (hexagons[name]) {
          getNeighbors(name, onSuccess, onFailure);
        } else {
          setError('Name doesn\'t exist');
        }
      } else {
        setError('Incorrect/Empty fields');
      }
    } else if (option === 2) {
      if (name) {
        if (hexagons[name]) {
          deleteHexagon(name, (response) => {
            if (response.status === true) {
              onSuccess();
            } else {
              setError('Node cannot be deleted.');
            }
          }, onFailure);
        } else {
          setError('Name doesn\'t exist');
        }
      } else {
        setError('Incorrect/Empty fields');
      }
    }
  };

  const onSuccess = (response) => {
    handleChange(3, name, response);
  }

  const onFailure = () => {
    setError('Server Failure. Please try again after sometime.');
  }

  return (
    <div className={'options'}>
      {/* 0: Add option (Name, Neighborhood, Edge) */}
      {/* 1: Query option (Name) */}
      {/* 2: Delete option (Name) */}
      <Box className={'inputWrapper'}>
        <TextField
          className={'inputComp'}
          id="standard-basic_0"
          label="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </Box>
      {
        option === 0 &&
          <Box className={'inputWrapper'}>
            <TextField
              className={'inputComp'}
              id="standard-basic_1"
              label="Neighborhood"
              value={neighborhood}
              onChange={handleNeighborhoodChange}
              required
            />
          </Box>
      }
      {
        option === 0 &&
          <Box className={'inputWrapper'}>
            <TextField
              className={'inputComp'}
              id="standard-basic_2"
              label="Edge (0-5)"
              value={edge}
              onChange={handleEdgeChange}
              required
            />
          </Box>
      }
      {/* Button to submit */}
      <Box className={'inputWrapper'}>
        <Button className={'inputComp'} variant="contained" color="primary" onClick={handleSubmit}>
          {BUTTON_VALUE[option]}
        </Button>
      </Box>
      {error && <div className={'errorText'}>{error}</div>}
    </div>
  );
}

Options.propTypes = {
  handleChange: PropTypes.func,
  option: PropTypes.number,
  hexagons: PropTypes.object,
};

export default Options;
