import React, { Component } from 'react';
import propTypes from 'prop-types';

import TweetContent from '../TweetContent';
import QuotedTweet from '../QuotedTweet';

import { quotedTweetShape } from '../QuotedTweet/schemas';
import { baseTweetSchema } from './schemas';

import sharedStrings from '../../shared/strings';
import strings from './strings';

import './style.scss';

class Tweet extends Component {

    constructor() {

        super();

        this.forceUpdate = this.forceUpdate.bind(this);
    }

    render() {

        const { props } = this;
        const { replyToAuthor, replyToId } = props;

        return (
            <article className="tweet">
                {this.renderTweetHeader()}

                {
                    props.replyToAuthor && props.replyToId &&

                    <p className="tweet__reply-info">
                        {strings.replyToPart1 + ' '}

                        <a
                            className="external-link"
                            href={`https://twitter.com/${replyToAuthor}/status/${replyToId}`}
                            target="_blank"
                        >
                            {strings.replyToPart2}
                        </a>.
                    </p>
                }

                {this.renderTweetContent()}
                {this.renderTweetStats()}
            </article>
        );
    }

    componentDidMount() {

        this.setTweetsTimeHeadersUpdating();
    }

    componentWillUnmount() {

        this.clearTweetsTimeHeadersUpdatingInterval();
    }

    renderTweetHeader() {

        const { props } = this;
        const { author } = props;

        return (
            <header className="tweet__header">
                <figure className="tweet__avatar">
                    <img
                        className="tweet__image"
                        src={author.profile_image_url_https}
                        alt={sharedStrings.profilePhotoAlt}
                    />
                </figure>

                <div className="tweet__info">
                    <p>
                        <span className="tweet__author-name">
                            {author.name}
                        </span>

                        <span className="tweet__author-nickname">
                            @{author.screen_name}
                        </span>
                    </p>

                    <p className="tweet__time">
                        <a
                            className="external-link"
                            target="_blank"
                            href={`https://twitter.com/${author.screen_name}/status/${props.id}`}
                        >
                            {this.renderTweetTime()}
                        </a>
                    </p>
                </div>
            </header>
        );
    }

    renderTweetTime() {

        const tweetDate = this.props.createdAt;
        const timeDiff = Date.now() - tweetDate.getTime();
        const minuteInMs = 1000 * 60;
        const hourInMs = minuteInMs * 60;
        const dayInMs = hourInMs * 24;
        
        if (timeDiff > 7 * dayInMs) {

            return `${tweetDate.toLocaleDateString()} ${tweetDate.toLocaleTimeString()}`;
        }

        if (timeDiff > 2 * dayInMs) {

            return `${strings.days[tweetDate.getDay()]} ${tweetDate.toLocaleTimeString()}`;
        }

        if (timeDiff > dayInMs) {

            return `${strings.yesterday} ${tweetDate.toLocaleTimeString()}`;
        }

        if (timeDiff > hourInMs) {

            return `${Math.floor(timeDiff / hourInMs)} ${strings.hoursAgo}`;
        }

        if (timeDiff > minuteInMs) {

            return `${Math.floor(timeDiff / minuteInMs)} ${strings.minutesAgo}`;
        }

        return strings.justNow;
    }

    renderTweetStats() {

        const { props } = this;

        return (
            <div className="tweet__stats">
                <p>{strings.favourites}: {props.favouriteCount}</p>
                <p>{strings.retweets}: {props.retweetCount}</p>
                <p>{strings.videos}: {props.videosCount}</p>
                <p>{strings.photos}: {props.photosCount}</p>    
            </div>
        );
    }

    renderTweetContent() {

        const { props } = this;
        const { quotedStatus } = props;

        return (
            <div className="tweet__content">

                {
                    quotedStatus &&

                    <QuotedTweet
                        id={quotedStatus.id}
                        text={quotedStatus.text}
                        uselessUrls={quotedStatus.uselessUrls}
                        urls={quotedStatus.urls}
                        author={quotedStatus.author}
                    />
                }

                <div className="tweet__text">
                    <TweetContent
                        urls={props.urls}
                        symbols={props.symbols}
                        uselessUrls={props.uselessUrls}
                        hashtags={props.hashtags}
                        userMentions={props.userMentions}
                    >
                        {props.text}
                    </TweetContent>
                </div>
            </div>
        );
    }

    setTweetsTimeHeadersUpdating() {

        this.timeHeadersUpdatingInterval = setInterval(this.forceUpdate, 60000);
    }

    clearTweetsTimeHeadersUpdatingInterval() {

        clearInterval(this.timeHeadersUpdatingInterval);
    }
}

Tweet.propTypes = {
    ...baseTweetSchema,

    favouriteCount: propTypes.number.isRequired,
    retweetCount: propTypes.number.isRequired,
    createdAt: propTypes.instanceOf(Date).isRequired,
    videosCount: propTypes.number.isRequired,
    photosCount: propTypes.number.isRequired,
    replyToAuthor: propTypes.string,
    replyToId: propTypes.string,
    quotedStatus: quotedTweetShape,

    symbols: propTypes.arrayOf(propTypes.shape({
        text: propTypes.string.isRequired
    })),

    hashtags: propTypes.arrayOf(propTypes.shape({
        text: propTypes.string.isRequired
    })),

    author: propTypes.shape({
        name: propTypes.string.isRequired,
        screen_name: propTypes.string.isRequired,
        profile_image_url_https: propTypes.string.isRequired
    }).isRequired,

    userMentions: propTypes.arrayOf(propTypes.shape({
        screen_name: propTypes.string.isRequired
    })) 
};

Tweet.defaultProps = {
    urls: [],
    userMentions: [],
    mediaUrls: [],
    symbols: [],
    hashtags: []
};

export default Tweet;