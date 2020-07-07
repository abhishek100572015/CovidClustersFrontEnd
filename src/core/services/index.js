import httpFetch from '../http';
import { getHexagons, queryHexagon, addHexagon, deleteHexagonUrl } from '../../constants/urls';

export function getAllHexagons(successCallback, failureCallback) {
  httpFetch(
    getHexagons,
    'GET',
    {
      'Content-Type': 'application/json'
    },
    {},
    'json'
  ).then((response) => {
    successCallback(response);
  }).catch((error) => {
    failureCallback(error);
  });
}

export function getNeighbors(name, successCallback, failureCallback) {
  httpFetch(
    `${queryHexagon}/${name}`,
    'GET',
    {
      'Content-Type': 'application/json'
    },
    {},
    'json'
  ).then((response) => {
    successCallback(response);
  }).catch((error) => {
    failureCallback(error);
  });
}

export function deleteHexagon(name, successCallback, failureCallback) {
  httpFetch(
    `${deleteHexagonUrl}/${name}`,
    'DELETE',
    {
      'Content-Type': 'application/json'
    },
    {},
    'json'
  ).then((response) => {
    successCallback(response);
  }).catch((error) => {
    failureCallback(error);
  });
}

export function addNewHexagon(body, successCallback, failureCallback) {
  httpFetch(
    addHexagon,
    'POST',
    {
      'Content-Type': 'application/json'
    },
    body,
    'json'
  ).then((response) => {
    successCallback(response);
  }).catch((error) => {
    failureCallback(error);
  });
}