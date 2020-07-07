import React from 'react';
import PropTypes from 'prop-types';
import './HexagonView.css';

import { getHexagonRows } from '../../common/utils';

import Hexagon from '../Hexagon/Hexagon';

function HexagonView(props) {
  const { hexagons, highlight = {}, refHexagon = '' } = props;
  const data = getHexagonRows(hexagons) || {};
  const {rows, minX, maxX, minY, maxY } = data;
  const positiveRows = minY < 0 ? maxY + 1 : maxY - minY + 1;

  return (
    <div className={'hexagonView'}>
      {/* Rows with positive Y, iterating from last (see using maxY - index inside the loop) */}
      {
        minX !== undefined &&
          Array.from(Array(positiveRows), (e, index) => {
            return (
              <Hexagon
                key={`row1_${maxY - index}`}
                row={rows[maxY - index]}
                minX={minX}
                maxX={maxX}
                highlight={highlight}
                refHexagon={refHexagon}
              />
            );
          })
      }
      {/* Rows with negative Y */}
      {
        minY !== undefined && minY < 0 &&
          Array.from(Array(-1 * minY), (e, index) => {
            return (
              <Hexagon
                key={`row2_${index}`}
                row={rows[-1 - index]}
                minX={minX}
                maxX={maxX}
                highlight={highlight}
                refHexagon={refHexagon}
              />
            );
          })
      }
    </div>
  );
}

HexagonView.propTypes = {
  hexagons: PropTypes.object,
  highlight: PropTypes.object,
  refHexagon: PropTypes.string,
};

export default HexagonView;
