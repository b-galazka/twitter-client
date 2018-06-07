import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Person from '../Person';
import LoadingAnimation from '../LoadingAnimation';

import { fetchMoreFriends } from '../../actions/friends';

import sharedStrings from '../../shared/strings';
import strings from './strings';

import './style.scss';

function mapStateToProps(state) {

    const { friends } = state;
    const { data } = friends;

    return {
        allFriendsFetched: (data.next_cursor_str === '0'),
        friends: data.users,
        fetchingMoreFriends: friends.fetchingMore,
        fetchingMoreFriendsError: friends.fetchingMoreError
    };
}

function mapDispatchToProps(dispatch) {

    return {
        fetchMoreFriends: bindActionCreators(fetchMoreFriends, dispatch)
    };
}

class FriendsTab extends Component {

    constructor() {

        super();

        this.state = {
            shownFriends: 50
        };

        this.showMoreFriends = this.showMoreFriends.bind(this);
    }

    render() {

        const { friends } = this.props;

        return (
            <section className="opened-tab">

                {
                    (friends.length === 0) ?

                        <p className="opened-tab__message">{strings.noContent}</p> :

                        <section className="opened-tab__persons">
                            {this.renderFriends()}
                        </section>
                }

                {
                    this.isMoreFriendsToShow() &&

                    <footer className="opened-tab__footer">
                        {this.renderFooterContent()}
                    </footer>
                }

            </section>
        );
    }

    renderFriends() {

        const { friends } = this.props;
        const { shownFriends } = this.state;
        const components = [];

        for (let i = 0; i < friends.length && i < shownFriends; i++) {

            const friend = friends[i];

            components.push(
                <Person
                    profileImageUrl={friend.profile_image_url_https.replace('_normal.', '_bigger.')}
                    name={friend.name}
                    nickName={friend.screen_name}
                    key={friend.id_str}
                />
            );
        }

        return components;
    }

    renderFooterContent() {

        const { fetchingMoreFriends, fetchingMoreFriendsError } = this.props;

        if (fetchingMoreFriends) {

            return this.renderLoader();
        }

        if (fetchingMoreFriendsError) {

            return this.renderFetchingError();
        }

        return this.renderShowMoreButton();
    }

    renderLoader() {

        return <LoadingAnimation width="60px" height="60px" />;
    }

    renderFetchingError() {

        return (
            <p className="opened-tab__message--error">
                {sharedStrings.fetchingError}
            </p>
        );
    }

    renderShowMoreButton() {

        return (
            <footer className="opened-tab__footer">
                <button
                    className="button button--show-more"
                    onClick={this.showMoreFriends}
                >
                    {strings.showMore}
                </button>
            </footer>
        );
    }

    isMoreFriendsToShow() {

        const { allFriendsFetched, friends } = this.props;
        const { shownFriends } = this.state;

        return (!allFriendsFetched || shownFriends < friends.length);
    }

    showMoreFriends() {

        const { friends, allFriendsFetched } = this.props;
        const shownFriends = this.state.shownFriends + 50;

        if (shownFriends >= friends.length && !allFriendsFetched) {

            this.props.fetchMoreFriends(200);
        }

        this.setState({ shownFriends });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsTab);