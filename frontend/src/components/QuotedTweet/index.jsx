import React from 'react';
import propTypes from 'prop-types';

import TweetContent from '../TweetContent';

import { quotedTweetShape } from './schemas';

import './style.scss';

function QuotedTweet(props) {

    const { author } = props;
    const tweetUrl = `https://twitter.com/${author.screen_name}/status/${props.id}`;

    return (
        <blockquote className="quoted-tweet" cite={tweetUrl}>
            <a
                href={tweetUrl}
                className="quoted-tweet__link"
                target="_blank"
            >
                <p>
                    <span className="quoted-tweet__author-name">
                        {author.name}
                    </span>

                    <span className="quoted-tweet__author-nickname">
                        @{author.screen_name}
                    </span>
                </p>

                <div className="quoted-tweet__content">
                    <TweetContent
                        urls={props.urls}
                        uselessUrls={props.uselessUrls}
                        disableUrlsLinks
                    >
                        {props.text}
                    </TweetContent>
                </div>
            </a> 
        </blockquote>
    );
}

QuotedTweet.propTypes = quotedTweetShape.isRequired;

export default QuotedTweet;