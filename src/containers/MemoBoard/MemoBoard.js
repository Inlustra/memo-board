import './MemoBoard.css'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getMemos,
  loadRequest,
  createRequest,
  isLoadingCreate,
  deleteRequest,
  updateRequest
} from '../../modules/memos/memos.module'
class MemoBoardPage extends Component {
  componentDidMount() {
    this.props.loadRequest()
  }

  handleTitleChange(memo, title) {
    this.props.updateRequest({id: memo.id, body: memo.body, title})
  }
  
  handleBodyChange(memo, body) {
    this.props.updateRequest({id: memo.id, title: memo.title, body})
  }

  render() {
    return (
      <div className="MemoBoard">
        {this.props.memos.map((memo, idx) => (
          <article className="Memo" key={memo.id}>
            <div
              className="Title"
              placeholder="Title"
              onBlur={(e) => {this.handleTitleChange(memo, e.target.innerText)}}
              suppressContentEditableWarning
              contentEditable
            >
              {memo.title}
            </div>
            <div
              className="Body"
              placeholder="My Idea is..."
              onBlur={(e) => {this.handleBodyChange(memo, e.target.innerText)}}
              suppressContentEditableWarning
              contentEditable
            >
              {memo.body}
            </div>
            <button
              className="Delete-button"
              onClick={() => this.props.deleteRequest(memo.id)}
            >
              X
            </button>
          </article>
        ))}
        <article className="Memo" onClick={this.props.createRequest}>
          <button
            className={
              'Add-button ' + (this.props.loadingNewMemo ? 'Loading' : '')
            }
          >
            +
          </button>
        </article>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  memos: getMemos(state),
  loadingNewMemo: isLoadingCreate(state),
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadRequest,
      createRequest,
      deleteRequest,
      updateRequest
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemoBoardPage)
