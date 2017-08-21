import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SurveyTable } from '../components/table.jsx'
import { loadData } from '../actions/LoadAction'
import { bindActionCreators } from 'redux'


class App extends Component {
  componentWillMount() {
    this.props.loadData
    console.log(this.props.loadData)
  }
  render() {
    return (
        <SurveyTable 
            deleteUrl = "/api/Survey/DeleteSurvey/"
            editUrl = "/Admin/EditSurvey/"
        />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: bindActionCreators(loadData, dispatch)
  }
}

function mapStateToProps (state) {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)