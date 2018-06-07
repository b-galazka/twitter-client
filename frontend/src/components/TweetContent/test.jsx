import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TweetContent from './';

Enzyme.configure({ adapter: new Adapter() });

describe('TweetContent component', () => {

    let tweetContent;

    beforeEach(() => {

        tweetContent = shallow(<TweetContent>content</TweetContent>).instance();
        tweetContent.props = { ...tweetContent.props };
    });

    it('should render without crash', () => {

        render(
            <TweetContent>
                content
            </TweetContent>,
            
            document.createElement('div')
        );
    });

    describe('TweetContent.prototype.generateElemKey', () => {

        it('should increment this.lastKey', () => {

            tweetContent.lastKey = 0;

            tweetContent.generateElemKey();

            expect(tweetContent.lastKey).toBe(1);
        });

        it('should set this.lastKey to 1 if it is equal to Number.MAX_SAFE_INTEGER', () => {

            tweetContent.lastKey = Number.MAX_SAFE_INTEGER;

            tweetContent.generateElemKey();

            expect(tweetContent.lastKey).toBe(1);
        });

        it('should return this.lastKey', () => {

            tweetContent.lastKey = 0;

            expect(tweetContent.generateElemKey()).toBe(tweetContent.lastKey);
        });
    });

    describe('TweetContent.prototype.getRegexBasedOnArray', () => {

        it('should return valid regex', () => {

            const strings = ['$str', '.text', '/str', 'te?xt'];
            const regex = tweetContent.getRegexBasedOnArray(strings);

            expect(regex).toEqual(/\$str|\.text|\/str|te\?xt/g);
        });
    });

    describe('TweetContent.prototype.parseText', () => {

        it('should return parsed text', () => {

            const textArr = ['lorem ipsum ', 'dolor $sit $amet'];

            const parsedText = tweetContent.parseText(textArr, /\$sit|\$amet/g, (entity, key) => {

                return <span key={key}>{entity}</span>;
            });

            expect(parsedText).toEqual([
                'lorem ipsum ',
                'dolor ',
                <span key={1}>$sit</span>,
                ' ',
                <span key={2}>$amet</span>,
                ''
            ]);
        });

        it('should parse partly parsed text', () => {

            const textArr = ['lorem ', <span>text</span>, ' ipsum ', 'dolor $sit $amet'];

            const parsedText = tweetContent.parseText(textArr, /\$sit|\$amet/g, (entity, key) => {

                return <span key={key}>{entity}</span>;
            });

            expect(parsedText).toEqual([
                'lorem ',
                <span>text</span>,
                ' ipsum ',
                'dolor ',
                <span key={1}>$sit</span>,
                ' ',
                <span key={2}>$amet</span>,
                ''
            ]);
        });

        it('should return unmodified text if there is nothing to parse', () => {

            const textArr = ['lorem ipsum ', 'dolor sit amet'];
            
            const parsedText = tweetContent.parseText(textArr, /\$str/, (entity, key) => {

                return <span key={key}>{entity}</span>
            });

            expect(parsedText).toEqual(textArr);
        });
    });

    describe('TweetContent.prototype.parseUrls', () => {

        beforeEach(() => {

            tweetContent.props.urls = [

                {
                    url: 'https://t.com/1',
                    expanded_url: 'https://google.com',
                    display_url: 'google.com'
                },

                {
                    url: 'https://t.com/2',
                    expanded_url: 'https://facebook.com',
                    display_url: 'facebook.com'
                }
            ];
        });

        it('should return parsed text', () => {

            const textArr = ['lorem ipsum https://t.com/1', ' dolor https://t.com/2 text'];
            const parsedText = tweetContent.parseUrls(textArr);

            expect(parsedText).toEqual([
                'lorem ipsum ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://google.com"
                >
                    google.com
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://facebook.com"
                >
                    facebook.com
                </a>,

                ' text'
            ]);
        });

        it('should parse partly parsed text', () => {

            const textArr = [
                'lorem',
                <span>a</span>,
                ' https://t.com/1',
                ' dolor https://t.com/2 text'
            ];

            const parsedText = tweetContent.parseUrls(textArr);

            expect(parsedText).toEqual([
                'lorem',
                <span>a</span>,
                ' ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://google.com"
                >
                    google.com
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://facebook.com"
                >
                    facebook.com
                </a>,

                ' text'
            ]);
        });

        it('shouldn\'t render <a> tags if props.disableUrlsLinks is set to true', () => {

            tweetContent.props.disableUrlsLinks = true;

            const textArr = ['lorem ipsum https://t.com/1', ' dolor https://t.com/2 text'];
            const parsedText = tweetContent.parseUrls(textArr);

            expect(parsedText).toEqual([
                'lorem ipsum ',
                'google.com',
                '',
                ' dolor ',
                'facebook.com',
                ' text'
            ]);
        });

        it('should return unmodified text if there is nothing to parse', () => {

            const textArr = ['lorem ipsum ', 'dolor sit amet'];
            const parsedText = tweetContent.parseUrls(textArr);

            expect(parsedText).toEqual(textArr);
        });
    });

    describe('TweetContent.prototype.parseUsersMentions', () => {

        beforeEach(() => {

            tweetContent.props.userMentions = [
                { screen_name: 'user1' },
                { screen_name: 'user2' }
            ];
        });

        it('should return parsed text', () => {

            const textArr = ['lorem ipsum @user1', ' dolor @user2 text'];
            const parsedText = tweetContent.parseUsersMentions(textArr);

            expect(parsedText).toEqual([
                'lorem ipsum ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/user1"
                >
                    @user1
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/user2"
                >
                    @user2
                </a>,

                ' text'
            ]);
        });

        it('should parse partly parsed text', () => {

            const textArr = [
                'lorem',
                <span>a</span>,
                ' @user1',
                ' dolor @user2 text'
            ];

            const parsedText = tweetContent.parseUsersMentions(textArr);

            expect(parsedText).toEqual([
                'lorem',
                <span>a</span>,
                ' ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/user1"
                >
                    @user1
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/user2"
                >
                    @user2
                </a>,

                ' text'
            ]);
        });

        it('should return unmodified text if there is nothing to parse', () => {

            const textArr = ['lorem ipsum ', 'dolor sit amet'];
            const parsedText = tweetContent.parseUsersMentions(textArr);

            expect(parsedText).toEqual(textArr);
        });
    });

    describe('TweetContent.prototype.parseHashtags', () => {

        beforeEach(() => {

            tweetContent.props.hashtags = [
                { text: 'hashtag1' },
                { text: 'hashtag2' }
            ];
        });

        it('should return parsed text', () => {

            const textArr = ['lorem ipsum #hashtag1', ' dolor #hashtag2 text'];
            const parsedText = tweetContent.parseHashtags(textArr);

            expect(parsedText).toEqual([
                'lorem ipsum ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/hashtag/hashtag1?src=hash"
                >
                    #hashtag1
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/hashtag/hashtag2?src=hash"
                >
                    #hashtag2
                </a>,

                ' text'
            ]);
        });

        it('should parse partly parsed text', () => {

            const textArr = [
                'lorem',
                <span>a</span>,
                ' #hashtag1',
                ' dolor #hashtag2 text'
            ];

            const parsedText = tweetContent.parseHashtags(textArr);

            expect(parsedText).toEqual([
                'lorem',
                <span>a</span>,
                ' ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/hashtag/hashtag1?src=hash"
                >
                    #hashtag1
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/hashtag/hashtag2?src=hash"
                >
                    #hashtag2
                </a>,

                ' text'
            ]);
        });

        it('should return unmodified text if there is nothing to parse', () => {

            const textArr = ['lorem ipsum ', 'dolor sit amet'];
            const parsedText = tweetContent.parseHashtags(textArr);

            expect(parsedText).toEqual(textArr);
        });
    });

    describe('TweetContent.prototype.parseSymbols', () => {

        beforeEach(() => {

            tweetContent.props.symbols = [
                { text: 'symbol1' },
                { text: 'symbol2' }
            ];
        });

        it('should return parsed text', () => {

            const textArr = ['lorem ipsum $symbol1', ' dolor $symbol2 text'];
            const parsedText = tweetContent.parseSymbols(textArr);

            expect(parsedText).toEqual([
                'lorem ipsum ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/search?q=%24symbol1&src=ctag"
                >
                    $symbol1
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/search?q=%24symbol2&src=ctag"
                >
                    $symbol2
                </a>,

                ' text'
            ]);
        });

        it('should parse partly parsed text', () => {

            const textArr = [
                'lorem',
                <span>a</span>,
                ' $symbol1',
                ' dolor $symbol2 text'
            ];

            const parsedText = tweetContent.parseSymbols(textArr);

            expect(parsedText).toEqual([
                'lorem',
                <span>a</span>,
                ' ',

                <a
                    key={1}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/search?q=%24symbol1&src=ctag"
                >
                    $symbol1
                </a>,

                '',
                ' dolor ',

                <a
                    key={2}
                    className="external-link"
                    target="_blank"
                    href="https://twitter.com/search?q=%24symbol2&src=ctag"
                >
                    $symbol2
                </a>,

                ' text'
            ]);
        });

        it('should return unmodified text if there is nothing to parse', () => {

            const textArr = ['lorem ipsum ', 'dolor sit amet'];
            const parsedText = tweetContent.parseSymbols(textArr);

            expect(parsedText).toEqual(textArr);
        });
    });
    
    describe('TweetContent.prototype.removeUselessUrls', () => {

        it('should return text without useless urls', () => {

            tweetContent.props.uselessUrls = [
                'https://a.com',
                'https://b.com'
            ];

            tweetContent.props.children = 'lorem ipsum https://a.com dolor https://b.com';

            expect(tweetContent.removeUselessUrls()).toBe('lorem ipsum  dolor ');
        });
    });
});