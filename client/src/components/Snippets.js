import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postSnippet, fetchSnippet } from '../actions';

const Snippets = ({ postSnippet, fetchSnippet, snippets }) => {

  const [snippetInput, setSnippetInput] = useState('');

  useEffect(() => {
    fetchSnippet();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    postSnippet(snippetInput);
    setSnippetInput('');
  }

  const rendersnippetInput = () => {
    return (
      <form onSubmit={onSubmit} >
        <label>Post a snippet</label>
        <input
          onChange={(e) => setSnippetInput(e.target.value)}
          value={snippetInput}
          name='snippetText'
        />
      </form>
    )
  }

  const renderSnippets = () => {
    return snippets.map(snippet => {
      return (
        <div key={snippet._id}>
          <p className="snippet-username">
            <Link to={`/author/${snippet._user}`}>{snippet.username}</Link></p>
          <p className="snippet-text">{snippet.text}</p>

        </div>
      )
    })
  }

  return (
    <div className="snippets-container">
      <h3>Snippets</h3>
      <p>A live feed of user updates</p>
      { rendersnippetInput()}
      {renderSnippets()}
    </div>
  )
}

const mapStateToProps = ({ snippets }) => {
  return { snippets };
}

export default connect(mapStateToProps, { postSnippet, fetchSnippet })(Snippets);

