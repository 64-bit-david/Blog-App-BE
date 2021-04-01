import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStory, fetchAuthor, deleteStory, cleanUp } from '../actions';
import displayError from './displayError';

import StoryComments from './StoryComments';

const Story = ({ match, story, fetchStory, fetchAuthor, author, deleteStory, auth, history, cleanUp, error }) => {



  useEffect(() => {
    fetchStory(match.params.storyId);

  }, [fetchStory, match.params.storyId]);

  useEffect(() => {
    if (story._user) {
      fetchAuthor(story._user);
    }
  }, [story, fetchAuthor])

  useEffect(() => {
    return function cleanup() {
      cleanUp()
    }
  }, [cleanUp])


  const authorNameCheck = (author) => {
    if (author.username) {
      return author.username
    }
    return author.name
  }

  const onDelete = async (storyId) => {
    await deleteStory(storyId);
    history.push('/your-profile')
  }



  const renderEditOrDonate = () => {
    if (story && auth) {
      if (story._user === auth._id) {
        return (
          <div className="story-btns-container">
            <Link className="btn" to={`/edit-story/${story._id}`}>Edit</Link>
            <button
              className="btn"
              onClick={() => onDelete(story._id)}
            >delete</button>
          </div>
        )
      }
      else {
        return (
          <div className="story-btns-container">
            <p>Like the story?</p>
            <Link
              to={`/payment/${author._id}`}
              className="btn donate-btn"
            >Donate
            </Link>
          </div>
        )
      }
    }
  }

  const pageSuccess = () => {
    return (<div>

      {author && story ?
        <div className="story-page-container">
          <h3>{story.title}</h3>
          {renderEditOrDonate()}
          <p>{story.creator}</p>
          <p className="story-page-desc">{story.description}</p>
          <div className="story-page-grid">
            <div className="story-page-main-item grid-item">
              <p dangerouslySetInnerHTML={{ __html: `${story.sanitizedHtml}` }}
                className="story-page-story">
              </p>
            </div>
            <div className="story-page-sub-item grid-item">
              <div className="author-container">
                <h4>Written By:
                   <Link to={`/author/${story._user}`}><span>{authorNameCheck(author)}</span></Link>
                </h4>

              </div>
              <StoryComments />
            </div>
          </div>
        </div>
        : null}
    </div>


    )
  }

  return (
    <div>
      {error ? displayError(error, cleanUp) : pageSuccess()}
    </div>
  )
}

const mapStateToProps = ({ story, author, auth, error }) => {
  return { story, author, auth, error }
}
export default connect(mapStateToProps, { fetchStory, fetchAuthor, deleteStory, cleanUp })(Story)
