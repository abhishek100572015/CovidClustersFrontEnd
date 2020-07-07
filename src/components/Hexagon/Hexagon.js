import React from 'react';
import PropTypes from 'prop-types';
import './Hexagon.css';

function Hexagon(props) {
  const { row, minX, maxX, highlight, refHexagon } = props;
  const positiveRows = minX < 0 ? maxX + 1 : maxX - minX + 1;
  const highlightHexagons = Object.keys(highlight);

  return (
    <div className={'hexrow'}>
      {/* Rows with negative X, iterating from last (see using minX - index inside the loop) */}
      {
        minX < 0 &&
          Array.from(Array(-1 * minX), (e, index) => {
            let classes = '';
            const hexValue = row && row[minX - index];
            if (!hexValue) {
              classes += 'noBorder';
            } else if (hexValue === refHexagon) {
              classes += 'refHexagon';
            } else if (highlightHexagons.indexOf(hexValue) !== -1) {
              classes += 'highlight';
            }

            return (
              <div className={classes} key={`hexa1 _${index}`}>
                <span>{ row && row[minX - index] }</span>
                <div className={classes}></div>
                <div className={classes}></div>
              </div>
            )
          })
      }
      {/* Rows with positive X */}
      {
        Array.from(Array(positiveRows), (e, index) => {
          let classes = '';
          const hexValue = row && row[index];
          if (!hexValue) {
            classes += 'noBorder';
          } else if (hexValue === refHexagon) {
            classes += 'refHexagon';
          } else if (highlightHexagons.indexOf(hexValue) !== -1) {
            classes += 'highlight';
          }

          return (
            <div className={classes} key={`hexa2 _${index}`}>
              <span>{ row && row[index] }</span>
              <div className={classes}></div>
              <div className={classes}></div>
            </div>
          )
        })
      }
    </div>
  );
}

Hexagon.propTypes = {
  minX: PropTypes.number,
  maxX: PropTypes.number,
  row: PropTypes.object,
  highlight: PropTypes.object,
  refHexagon: PropTypes.string,
};

export default Hexagon;
