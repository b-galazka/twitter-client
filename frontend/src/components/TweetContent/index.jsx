import React, { Component } from 'react';
import propTypes from 'prop-types';

class TweetContent extends Component {

    constructor() {

        super();

        this.lastKey = 0;
    }

    render() {

        let text = this.removeUselessUrls();
            text = this.parseSymbols(text);
            text = this.parseHashtags(text);
            text = this.parseUsersMentions(text);
            text = this.parseUrls(text);

        return text;
    }

    removeUselessUrls() {

        const { children, uselessUrls } = this.props;

        const textWithoutUrls = uselessUrls.reduce(
            (text, url) => text.replace(url, ''),
            children
        );

        return textWithoutUrls;
    }

    parseSymbols(tweetText) {

        const { symbols } = this.props;
        const text = Array.isArray(tweetText) ? tweetText : [tweetText];

        if (symbols.length === 0) {

            return text;
        }

        const symbolRegex = this.getRegexBasedOnArray(symbols.map(({ text }) => `$${text}`));

        const parsedText = this.parseText(text, symbolRegex, (symbol, key) => (
            <a
                key={key}
                className="external-link"
                target="_blank"
                href={`https://twitter.com/search?q=${encodeURIComponent(symbol)}&src=ctag`}
            >
                {symbol}
            </a>
        ));

        return parsedText;
    }

    parseHashtags(tweetText) {

        const { hashtags } = this.props;
        const text = Array.isArray(tweetText) ? tweetText : [tweetText];

        if (hashtags.length === 0) {

            return text;
        }

        const hashtagRegex = this.getRegexBasedOnArray(hashtags.map(({ text }) => `#${text}`));

        const parsedText = this.parseText(text, hashtagRegex, (hashtag, key) => (
            <a
                key={key}
                className="external-link"
                target="_blank"
                href={`https://twitter.com/hashtag/${
                    encodeURIComponent(hashtag.slice(1))
                }?src=hash`}
            >
                {hashtag}
            </a>
        ));

        return parsedText;
    }

    parseUsersMentions(tweetText) {

        const { userMentions } = this.props;
        const text = Array.isArray(tweetText) ? tweetText : [tweetText];

        if (userMentions.length === 0) {

            return text;
        }

        const userMentionRegex = this.getRegexBasedOnArray(
            userMentions.map(({ screen_name }) => `@${screen_name}`)
        );

        const parsedText = this.parseText(text, userMentionRegex, (userMention, key) => (
            <a
                key={key}
                className="external-link"
                target="_blank"
                href={`https://twitter.com/${userMention.slice(1)}`}
            >
                {userMention}
            </a>
        ));

        return parsedText;
    }

    parseUrls(tweetText) {

        const { urls } = this.props;
        const text = Array.isArray(tweetText) ? tweetText : [tweetText];

        if (urls.length === 0) {

            return text;
        }

        const urlRegex = this.getRegexBasedOnArray(urls.map(url => url.url));

        const parsedText = this.parseText(text, urlRegex, (url, key) => {

            const { display_url, expanded_url } = urls.find(eachUrl => eachUrl.url === url);

            if (this.props.disableUrlsLinks) {

                return display_url;
            }

            return (
                <a
                    key={key}
                    className="external-link"
                    target="_blank"
                    href={expanded_url}
                >
                    {display_url}
                </a>
            );
        });

        return parsedText;
    }

    parseText(text, entityRegex, renderElemCb) {

        const parsedText = text.reduce((output, textPart) => {

            const entities = (typeof textPart === 'string') && textPart.match(entityRegex);

            if (!entities) {

                output.push(textPart);

                return output;
            }

            const splittedTextPart = textPart.split(entityRegex);

            const parsedTextPart = splittedTextPart.reduce((output, textPart, index) => {

                const entity = entities[index];

                output.push(textPart);

                if (entity) {

                    output.push(renderElemCb(entity, this.generateElemKey()));
                }

                return output;

            }, []);

            return output.concat(parsedTextPart);

        }, []);

        return parsedText;
    }

    getRegexBasedOnArray(stringsArr) {

        const escapedStringsArr = stringsArr.map(
            str => str.replace(/[^A-Za-z0-9_\/]/, char => `\\${char}`)
        );

        return new RegExp(escapedStringsArr.join('|'), 'g');
    }

    generateElemKey() {

        if (this.lastKey === Number.MAX_SAFE_INTEGER) {

            this.lastKey = 0;
        }

        this.lastKey++;

        return this.lastKey;
    }
}

TweetContent.propTypes = {
    children: propTypes.string.isRequired,
    uselessUrls: propTypes.arrayOf(propTypes.string),
    disableUrlsLinks: propTypes.bool,

    urls: propTypes.arrayOf(propTypes.shape({
        url: propTypes.string.isRequired,
        display_url: propTypes.string.isRequired,
        expanded_url: propTypes.string.isRequired
    })),

    symbols: propTypes.arrayOf(propTypes.shape({
        text: propTypes.string.isRequired
    })),

    hashtags: propTypes.arrayOf(propTypes.shape({
        text: propTypes.string.isRequired
    })),

    userMentions: propTypes.arrayOf(propTypes.shape({
        screen_name: propTypes.string.isRequired
    }))
};

TweetContent.defaultProps = {
    urls: [],
    uselessUrls: [],
    symbols: [],
    hashtags: [],
    userMentions: [],
    disableUrlsLinks: false
};

export default TweetContent;