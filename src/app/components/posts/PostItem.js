import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/post.actions';
import MediaItem from './media/MediaItem';

class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post, auth, showActions } = this.props;

        return (
            <div className="card post-item" >
                <div className="card-header" style={{backgroundColor: "#fff", borderBottom: "none"}}>
                    <img className="avatar-navbar" src={post.user.avatar}></img>
                    <span className="card-title activator grey-text text-darken-4">{ post.user.username }</span>
                    <a className="float-right clickable" data-toggle="dropdown">
                        <i className="material-icons right float-xl">more_vert</i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item">Report</a>
                        <div className="dropdown-divider"></div>
                        { post.user_id === auth.user.id ? (
                            <a className="dropdown-item" onClick={this.onDeleteClick.bind(this, post._id)}>
                                <i className="material-icons left">play_for_work</i> Delete
                            </a>
                        ) : null }
                        
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        { post.description ? (<p style={{padding: ".75rem 1.25rem"}}>{ post.description }</p>) : null }
                        { post.media ? <MediaItem key={post.media.id} media={post.media} /> : <div></div> }
                    </li>
                </ul>
                <div className="card-body">
                    <a href="#">like</a>
                    <a href="#">comment</a>
                </div>
            </div>

        )
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)