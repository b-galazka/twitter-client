import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tweet from '../Tweet';

import strings from './strings';

function mapStateToProps(state) {

    const { tweets } = state;

    return {
        tweets: tweets.data
    };
}

class TweetsTab extends Component {

    render() {

        const { tweets } = this.props;

        return (
            <section className="opened-tab">

                {
                    (tweets.length === 0) ?

                        <p className="opened-tab__message">{strings.noContent}</p> :

                        this.renderTweets()
                }

            </section>
        );
    }

    renderTweets() {

        const { tweets } = this.props;

        return tweets.map(tweet => (
            <Tweet
                key={tweet.id_str}
                createdAt={new Date(tweet.created_at)}
                id={tweet.id_str}
                favouriteCount={tweet.favorite_count}
                retweetCount={tweet.retweet_count}
                text={tweet.text}
                videosCount={this.countMedia(tweet, 'video')}
                photosCount={this.countMedia(tweet, 'photo')}
                author={tweet.user}
                uselessUrls={this.getUselessUrls(tweet)}
                urls={tweet.entities && tweet.entities.urls}
                userMentions={tweet.entities && tweet.entities.user_mentions}
                quotedStatus={this.prepareQuotedStatus(tweet.quoted_status)}
                replyToAuthor={tweet.in_reply_to_screen_name}
                replyToId={tweet.in_reply_to_status_id_str}
                hashtags={tweet.entities && tweet.entities.hashtags}
                symbols={tweet.entities && tweet.entities.symbols}
            />
        ));
    }

    countMedia(tweet, mediaType) {

        if (!tweet.extended_entities || !tweet.extended_entities.media) {

            return 0;
        }

        const { media } = tweet.extended_entities;
        const sameTypeMedia = media.filter(file => file.type === mediaType);

        return sameTypeMedia.length;
    }

    getUselessUrls(tweet) {

        let uselessUrls = [];

        const quotedStatus = tweet.quoted_status;
        const { entities } = tweet;

        if (entities && entities.media) {

            const { media } = entities;

            uselessUrls = uselessUrls.concat(media.map(file => file.url));
        }

        if (quotedStatus && entities && entities.urls) {

            const quoutedStatusId = quotedStatus.id_str;
            const quotedStatusAuthor = quotedStatus.user.screen_name;

            const quotedStatusUrls = entities.urls.filter(({ expanded_url }) =>
                expanded_url.endsWith(`twitter.com/${quotedStatusAuthor}/status/${quoutedStatusId}`)
            );

            uselessUrls = uselessUrls.concat(quotedStatusUrls.map(url => url.url));
        }

        return uselessUrls;
    }

    prepareQuotedStatus(quotedStatus) {

        if (!quotedStatus) {

            return;
        }

        const { entities, user } = quotedStatus;

        return {
            id: quotedStatus.id_str,
            text: quotedStatus.text,
            uselessUrls: this.getUselessUrls(quotedStatus),
            urls: entities && entities.urls,

            author: {
                name: user.name,
                screen_name: user.screen_name
            }
        }
    }
}

export default connect(mapStateToProps)(TweetsTab);