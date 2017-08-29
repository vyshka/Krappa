var webpack = require('webpack');
var entryPoint = './Content/js/react/'
module.exports = {
  entry: {
      vacancylist: entryPoint + 'vacancy-list.js',
      userstat: entryPoint + 'user-stat.js',
      userlist: entryPoint + 'user-list.js',
      surveyC: entryPoint + 'surveyC.js',
      surveyTlist: entryPoint + 'survey-list.js',
      stat: entryPoint + 'stat.js',
      newSurvey: entryPoint + 'newSurvey.js',
      surveyResult: entryPoint + 'survey-result.js',
      surveyList: entryPoint + 'complete-survey.js'
    },
  output: {
    path: __dirname + '/Content/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: ['transform-runtime', 'transform-class-properties']
        } 
        
      }
    ]
  },
  stats: {
    warnings: false
  }
};