import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tweet from './';
import strings from './strings';

Enzyme.configure({ adapter: new Adapter() });

describe('Tweet component', () => {

    let tweet;

    beforeEach(() => {

        tweet = shallow(<Tweet
            id=""
            text=""
            favouriteCount={0}
            retweetCount={0}
            createdAt={new Date()}
            videosCount={0}
            photosCount={0}

            author={{
                name: '',
                screen_name: '',
                profile_image_url_https: ''
            }}
        />).instance();

        tweet.props = { ...tweet.props };
    });

    it('should render without crash', () => {

        render(
            <Tweet
                id=""
                text=""
                favouriteCount={0}
                retweetCount={0}
                createdAt={new Date()}
                videosCount={0}
                photosCount={0}

                author={{
                    name: '',
                    screen_name: '',
                    profile_image_url_https: ''
                }}
            />,

            document.createElement('div')
        );
    });

    describe('Tweet.prototype.setTweetsTimeHeadersUpdating', () => {

        it('should set updating UI once time per minute', () => {

            const spy = jest.spyOn(global, 'setInterval');

            tweet.setTweetsTimeHeadersUpdating();
            
            clearInterval(tweet.timeHeadersUpdatingInterval);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(tweet.forceUpdate, 60000);

            spy.mockReset();
            spy.mockRestore();
        });

        it('should be called in componentDidMount', () => {

            const spy = jest.fn();

            tweet.setTweetsTimeHeadersUpdating = spy;

            tweet.componentDidMount();

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Tweet.prototype.clearTweetsTimeHeadersUpdatingInterval', () => {

        it('should clear updating UI interval', () => {

            const spy = jest.spyOn(global, 'clearInterval');

            tweet.setTweetsTimeHeadersUpdating();
            tweet.clearTweetsTimeHeadersUpdatingInterval();

            expect(spy).toHaveBeenCalledWith(tweet.timeHeadersUpdatingInterval);

            spy.mockReset();
            spy.mockRestore();
        });

        it('should be called in componentWillUnmount', () => {

            const spy = jest.spyOn(tweet, 'clearTweetsTimeHeadersUpdatingInterval');

            tweet.componentWillUnmount();

            expect(spy).toHaveBeenCalled();

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('Tweet.prototype.renderTweetTime', () => {

        const dayInMs = 1000 * 60 * 60 * 24;
        const dateNow = Date.now;

        Date.now = () => 1525546007266;

        it('should return proper time string if tweet was created more than 7 days ago', () => {

            const tweetDate = new Date(Date.now() - dayInMs * 7 - 1);

            tweet.props.createdAt = tweetDate;

            expect(tweet.renderTweetTime()).toBe(
                `${tweetDate.toLocaleDateString()} ${tweetDate.toLocaleTimeString()}`
            );
        });

        it('should return proper time string if tweet was created ' +
            'more than 2 and less than 7 (or 7) days ago', () => {

            const tweetDate = new Date(Date.now() - dayInMs * 2 - 1);

            tweet.props.createdAt = tweetDate;

            expect(tweet.renderTweetTime()).toBe(
                `${strings.days[tweetDate.getDay()]} ${tweetDate.toLocaleTimeString()}`
            );
        });

        it('should return proper time string if tweet was created in day right before', () => {

            const tweetDate = new Date(Date.now() - dayInMs - 1);

            tweet.props.createdAt = tweetDate;

            expect(tweet.renderTweetTime()).toBe(
                `${strings.yesterday} ${tweetDate.toLocaleTimeString()}`
            );
        });

        it('should return proper time string if tweet was created in the same day', () => {

            const hourInMs = 1000 * 60 * 60;
            const tweetDate = new Date(Date.now() - hourInMs * 2);

            tweet.props.createdAt = tweetDate;

            expect(tweet.renderTweetTime()).toBe(
                `${Math.floor((Date.now() - tweetDate.getTime()) / hourInMs )} ${strings.hoursAgo}`
            );
        });

        it('should return proper time string if tweet was created in the same hour', () => {

            const minuteInMs = 1000 * 60;
            const tweetDate = new Date(Date.now() - minuteInMs * 2);

            tweet.props.createdAt = tweetDate;

            expect(tweet.renderTweetTime()).toBe(
                `${Math.floor((Date.now() - tweetDate.getTime()) / minuteInMs)} ${strings.minutesAgo}`
            );
        });

        it('should return proper time string if tweet was created less than 1 minute ago', () => {

            const tweetDate = new Date(Date.now() - 2000);

            tweet.props.createdAt = tweetDate;

            expect(tweet.renderTweetTime()).toBe(strings.justNow);
        });

        afterAll(() => {

            Date.now = dateNow;
        });
    });
});