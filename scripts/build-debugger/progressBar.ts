const ProgressBar = require('progress');

module.exports = (total: number) => {
  return new ProgressBar(':bar :current / :total', { 
    total,
    width: Number.POSITIVE_INFINITY,
    complete: '█',
    incomplete: '░'
  });
};
