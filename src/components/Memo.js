import React from 'react'
import './Memo.css'

class Memo extends React.Component {

  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.body = React.createRef();
  }

  focus() {
    this.title.current.focus();
  }

  render() {
    return (
      <article className="Memo">
        <div
          className="Title"
          placeholder="Title"
          ref={this.title}
          onBlur={e => {
            this.props.onTitleChange(e.target.innerText)
          }}
          suppressContentEditableWarning
          contentEditable
        >
          {this.props.title}
        </div>
        <div
          className="Body"
          placeholder="My Idea is..."
          ref={this.body}
          onBlur={e => {
            this.props.onBodyChange(e.target.innerText)
          }}
          suppressContentEditableWarning
          contentEditable
        >
          {this.props.body}
        </div>
        <button className="Delete-button" onClick={this.props.onClickDelete}>
          X
        </button>
      </article>
    )
  }
}

export default Memo
