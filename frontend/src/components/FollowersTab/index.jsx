import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../Person';

import strings from './strings';

function mapStateToProps(state) {

    const { followers } = state;

    return {
        followers: followers.data.users
    };
}

class FollowersTab extends Component {

    render() {

        const { followers } = this.props;

        return (
            <section className="opened-tab">

                {
                    (followers.length === 0) ?

                        <p className="opened-tab__message">{strings.noContent}</p> :

                        <section className="opened-tab__persons">
                            {this.renderFollowers()}
                        </section>
                }
                
            </section>
        );
    }

    renderFollowers() {

        const { followers } = this.props;

        return followers.map(follower => (
            <Person
                profileImageUrl={follower.profile_image_url_https.replace('_normal.', '_bigger.')}
                name={follower.name}
                nickName={follower.screen_name}
                key={follower.id_str}
            />
        ));
    }
}

export default connect(mapStateToProps)(FollowersTab);