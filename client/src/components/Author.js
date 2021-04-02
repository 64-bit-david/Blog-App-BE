import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { fetchAuthorBasic, fetchUserStories, clearError } from '../actions';
import paginationHelper from './paginationHelper';
import displayError from './displayError';

const Author = ({ author, match, fetchUserStories, userStories, fetchAuthorBasic, pager, error, clearError }) => {

  const [currentPage, setCurrentPage] = useState(match.params.page);

  useEffect(() => {
    setCurrentPage(match.params.page);
  }, [match.params.page])

  useEffect(() => {
    if (!author) {
      fetchAuthorBasic(match.params.authorId);
    }
  }, [fetchAuthorBasic, match.params.authorId]);


  useEffect(() => {
    if (pager.currentPage !== currentPage) {
      fetchUserStories(currentPage, match.params.authorId);
    }
    else {
      fetchUserStories(1, match.params.authorId);
    }
  }, [currentPage, pager.currentPage, fetchUserStories, match.params.authorId]);

  const authorName = () => {
    if (author) {
      if (author.username) {
        return author.username
      }
      return author.name;
    }
    return null;
  }

  const authorDescription = () => {
    if (author) {
      if (author.description) {
        return author.description
      }
    }
    return null;
  }


  const renderAuthorInfo = () => {
    if (!author) {
      return null
    }
    else {
      return (
        <div className="author-data-container">
          <h2>{authorName()}</h2>
          <p>{authorDescription()}</p>
          <Link
            to={`/payment/${author._id}`}
            className="btn donate-btn"
          >Donate</Link>
          <div className="author-donations-container">
            {author.donationsRecieved ? <p>{authorName()} has received :  £{author.donationsRecieved} from other users!</p> : null}
            {author.donationsSent ? <p>{authorName()} has dontated  £{author.donationsSent} to other authors!</p> : null}

          </div>
        </div>
      )
    }
  }

  const renderAuthorStories = () => {
    if (!author) {
      return null
    }
    else if (!userStories) {
      return null;
    } else {
      return userStories.map(story => {
        return (
          <div className="stories-grid-item" key={story._id}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </div>
        )
      })
    }
  }

  const pageSuccess = () => {
    return (
      <div className="author-page-container">
        {renderAuthorInfo()}
        <div className="stories-grid author-stories-grid">
          {renderAuthorStories()}
        </div>
        { paginationHelper(pager, currentPage, `/author/${match.params.authorId}/`)}
      </div>
    )
  }

  return (
    <div>
      {error ? displayError(error, clearError) : pageSuccess()}

    </div>
  )
};

const mapStateToProps = ({ author, auth, userStories, pager, error }) => {
  return { author, auth, userStories, pager, error }
};

export default connect(mapStateToProps, { fetchAuthorBasic, fetchUserStories, clearError })(Author);

