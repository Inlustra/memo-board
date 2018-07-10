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
  updateRequest,
} from '../../modules/memos/memos.module'
import Memo from '../../components/Memo'
class MemoBoardPage extends Component {
  componentDidMount() {
    this.props.loadRequest()
  }

  render() {
    this.memos = {};
    return (
      <div className="MemoBoard">
        {this.props.memos.map(({ id, title, body }, idx) => (
          <Memo
            key={id}
            title={title}
            body={body}
            ref={el => this.memos[id] = el}
            onBodyChange={newBody =>
              this.props.updateRequest({ id, title, body: newBody })
            }
            onTitleChange={newTitle =>
              this.props.updateRequest({ id, title: newTitle, body })
            }
            onClickDelete={() => this.props.deleteRequest(id)}
          />
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

  componentDidUpdate({ memos }) {
    if (this.props.memos.length > memos.length) {
      const lastMemo = this.props.memos[this.props.memos.length - 1]
      if (!lastMemo.title && !lastMemo.body) {
        this.memos[lastMemo.id].focus();
      }
    }
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
      updateRequest,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemoBoardPage)
