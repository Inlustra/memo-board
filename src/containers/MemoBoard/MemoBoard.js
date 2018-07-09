import './Board.css'
import React, { Component } from '../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react'
import { connect } from '../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux'

class BoardPage extends Component {
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  error: getError(state),
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submit,
      clear,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardPage)
