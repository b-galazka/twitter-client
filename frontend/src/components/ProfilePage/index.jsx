import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import LoadingAnimation from '../LoadingAnimation';
import FollowersTab from '../FollowersTab';
import FriendsTab from '../FriendsTab';
import TweetsTab from '../TweetsTab';

import { fetchProfile } from '../../actions/profile';
import { fetchFollowers } from '../../actions/followers';
import { fetchFriends } from '../../actions/friends';
import { fetchTweets } from '../../actions/tweets';

import sharedStrings from '../../shared/strings';
import strings from './strings';

import './style.scss';

function mapStateToProps(state) {

    const { profile, followers, friends, tweets } = state;

    return {

        profile: {
            fetched: profile.fetched,
            fetchingError: profile.fetchingError,
            data: profile.data
        },

        followers: {
            fetched: followers.fetched,
            fetchingError: followers.fetchingError
        },

        friends: {
            fetched: friends.fetched,
            fetchingError: friends.fetchingError
        },

        tweets: {
            fetched: tweets.fetched,
            fetchingError: tweets.fetchingError
        }
    };
}

function mapDispatchToProps(dispatch) {

    return {
        fetchProfile: bindActionCreators(fetchProfile, dispatch),
        fetchFriends: bindActionCreators(fetchFriends, dispatch),
        fetchFollowers: bindActionCreators(fetchFollowers, dispatch),
        fetchTweets: bindActionCreators(fetchTweets, dispatch)
    };
}

class ProfilePage extends Component {

    constructor() {

        super();

        this.state = {
            activeTab: 'tweets'
        };

        this.switchTab = this.switchTab.bind(this);
    }

    render() {

        return (
            <div className="profile-page">
                {this.renderProperTemplate()}
            </div>
        );
    }

    componentDidMount() {

        this.updatePageTitle();
        this.fetchData();
    }

    updatePageTitle() {

        document.title = `${sharedStrings.basePageTitle} | ${strings.pageTitle}`;
    }

    renderProperTemplate() {

        if (this.isAllDataFetched()) {

            return this.renderProfile();
        }

        if (this.isFetchingDataError()) {

            return this.renderFetchingError();
        }

        return this.renderLoader();
    }

    renderProfile() {

        const { data } = this.props.profile;

        return (
            <section className="profile">
                <section className="profile__basic-info">
                    <img
                        className="profile__image"
                        src={data.profile_image_url_https.replace('_normal.', '_bigger.')}
                        alt={sharedStrings.profilePhotoAlt}
                    />

                    <p className="profile__name">{data.name}</p>
                    
                    {
                        data.screen_name &&
                        <p className="profile__nickname">@{data.screen_name}</p>
                    }

                </section>

                <ul className="profile__tabs">
                    {this.renderProfileTab('tweets', strings.tweetsTab)}
                    {this.renderProfileTab('friends', `${strings.friendsTab} (${data.friends_count})`)}
                    {this.renderProfileTab('followers', strings.followersTab)}
                </ul>

                {this.renderActiveTab()}
            </section>
        );
    }

    renderActiveTab() {

        const { activeTab } = this.state;

        switch (activeTab) {

            case 'tweets': {

                return <TweetsTab />;
            }

            case 'friends': {

                return <FriendsTab />;
            }

            case 'followers': {

                return <FollowersTab />;
            }

            default: {

                return null;
            }
        }
    }

    renderProfileTab(tabType, tabText) {

        const { activeTab } = this.state;

        return (
            <li 
                className={

                    classNames({
                        'profile__tab': true,
                        'profile__tab--active': (activeTab === tabType)
                    })
                }
            >
                <button onClick={this.switchTab(tabType)}>{tabText}</button>
            </li>
        );
    }

    switchTab(tabName) {

        return () => {

            this.setState({
                activeTab: tabName
            });
        };
    }

    renderFetchingError() {

        return <p className="profile-page__error">{sharedStrings.fetchingError}</p>;
    }

    renderLoader() {

        return (
            <figure className="profile-page__loader">
                <LoadingAnimation />
            </figure>
        );
    }

    isAllDataFetched() {

        const { profile, followers, friends, tweets } = this.props;

        return (
            profile.fetched &&
            followers.fetched &&
            friends.fetched &&
            tweets.fetched
        );
    }

    isFetchingDataError() {

        const { profile, followers, friends, tweets } = this.props;

        return (
            profile.fetchingError ||
            followers.fetchingError ||
            friends.fetchingError ||
            tweets.fetchingError
        );
    }

    fetchData() {

        const { props } = this;
        const { profile, followers, friends } = props;

        props.fetchTweets(10);

        // cached because of Twitter API requests limits
        if (!profile.fetched) {

            props.fetchProfile();
        }

        if (!followers.fetched) {

            props.fetchFollowers(5);
        }

        if (!friends.fetched) {

            props.fetchFriends(200);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);