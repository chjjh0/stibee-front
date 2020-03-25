import domtoimage from 'dom-to-image';

export const screenshotHelper = node => {
  return new Promise((resolve, reject) => {
    domtoimage
      .toPng(node)
      .then(dataUrl => {
        resolve(dataUrl);
      })
      .catch(err => {
        reject(err);
      });
  });
};
