'use strict';

exports.name = 'addDimensions';
exports.description = 'Adds width and height according to viewBox';

const rxViewBox = /(\d*) (\d*) (\d*) (\d*)/;
/**
 * Add width/height attributes based on viewBox values, if they aren't already present
 *
 * @example
 * <svg viewBox="0 0 100 50">
 *   ↓
 * <svg width="100" height="50" viewBox="0 0 100 50">
 *
 * @author jeremiahblanch
 */

exports.fn = () => {
  return {
    element: {
      enter: (node, parentNode) => {
        if (
          node.name === 'svg' &&
          parentNode.type === 'root' &&
          !node.attributes.height &&
          !node.attributes.width &&
          node.attributes.viewBox != null &&
          rxViewBox.test(node.attributes.viewBox)
        ) {
          const [_, x, y, w, h] = rxViewBox.exec(node.attributes.viewBox).map((v, index) => index > 0 ? parseFloat(v) : '');
          
          node.attributes.height = (h - y);
          node.attributes.width = (w - x);
        }
      },
    },
  };
};