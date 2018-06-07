import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import store from '../../store/mock';
import TweetsTab from './';

Enzyme.configure({ adapter: new Adapter() });

describe('TweetsTab component', () => {

    let tweetsTab;

    beforeEach(() => {

        tweetsTab = shallow(<TweetsTab store={store} />).dive().instance();
        tweetsTab.props = { ...tweetsTab.props };
    });

    it('should render without crash', () => {

        render(
            <Provider store={store}>
                <TweetsTab />
            </Provider>,

            document.createElement('div')
        );
    });

    describe('TweetsTab.prototype.countMedia', () => {

        const tweet = {
            extended_entities: {
                media: [
                    { type: 'photo' },
                    { type: 'video' },
                    { type: 'photo' }
                ]
            }
        };

        it('should return 0 if tweet.extended_entities is undefined', () => {

            expect(tweetsTab.countMedia({}, 'photo')).toBe(0);
        });

        it('should return valid number of photos', () => {

            expect(tweetsTab.countMedia(tweet, 'photo')).toBe(2);
        });

        it('should return valid number of videos', () => {

            expect(tweetsTab.countMedia(tweet, 'video')).toBe(1);
        });
    });

    describe('TweetsTab.prototype.getUselessUrls', () => {

        it('should return an empty array it tweet doesn\'t contain useless urls', () => {

            const tweet = {
                entities: { media: [] }
            };

            expect(tweetsTab.getUselessUrls(tweet)).toEqual([]);
        });

        it('should return media urls', () => {

            const tweet = {
                entities: {
                    media: [
                        { url: 'https://t.com/1' },
                        { url: 'https://t.com/2' },
                        { url: 'https://t.com/3' }
                    ]
                }
            };

            expect(tweetsTab.getUselessUrls(tweet)).toEqual([
                'https://t.com/1',
                'https://t.com/2',
                'https://t.com/3'
            ]);
        });

        it('should return url of quoted status', () => {

            const tweet = {
                quoted_status: {
                    id_str: '123',
                    user: { screen_name: 'user' }
                },

                entities: {
                    urls: [
                        {
                            url: 'https://t.com/1',
                            expanded_url: 'https://twitter.com/user/status/123'
                        }
                    ]
                }
            };

            expect(tweetsTab.getUselessUrls(tweet)).toEqual([
                'https://t.com/1'
            ]);
        });

        it('should return url of quoted status and urls of media', () => {

            const tweet = {
                quoted_status: {
                    id_str: '123',

                    user: { screen_name: 'user' }
                },

                entities: {
                    urls: [
                        {
                            url: 'https://t.com/4',
                            expanded_url: 'https://twitter.com/user/status/123'
                        }
                    ],

                    media: [
                        { url: 'https://t.com/1' },
                        { url: 'https://t.com/2' },
                        { url: 'https://t.com/3' }
                    ]
                }
            };

            expect(tweetsTab.getUselessUrls(tweet)).toEqual([
                'https://t.com/1',
                'https://t.com/2',
                'https://t.com/3',
                'https://t.com/4'
            ]);
        });
    });

    describe('TweetsTab.prototype.prepareQuotedStatus', () => {

        it('should return valid quouted status object', () => {

            const qoutedStatus = {
                id_str: 'id',
                text: 'lorem ipsum',

                entities: {

                    media: [
                        { url: 'https://t.com/1' },
                        { url: 'https://t.com/2' },
                        { url: 'https://t.com/3' }
                    ],

                    urls: ['https://google.com']
                },
                
                user: {
                    name: 'username',
                    screen_name: 'screen name'
                }
            };

            expect(tweetsTab.prepareQuotedStatus(qoutedStatus)).toEqual({
                id: 'id',
                text: 'lorem ipsum',
                uselessUrls: ['https://t.com/1', 'https://t.com/2', 'https://t.com/3'],
                urls: ['https://google.com'],

                author: {
                    name: 'username',
                    screen_name: 'screen name'
                }
            });
        });
    });
});