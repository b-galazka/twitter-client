export const persons = {
    users: [
        {
            profile_image_url_https: '',
            name: '',
            screen_name: '',
            id_str: ''
        }
    ]
};

export const profile = {
    profile_image_url_https: '',
    name: '',
    screen_name: ''
};

export const tweets = [
    {
        id_str: '',
        created_at: Date.now(),
        favorite_count: 0,
        retweet_count: 0,
        text: '',

        extended_entities: {
            media: []
        },

        user: {
            profile_image_url_https: '',
            name: '',
            screen_name: ''
        },

        entities: {
            urls: [],
            user_mentions: [],
            hashtags: [],
            symbols: []
        },

        quotedStatus: {
            id_str: '',
            text: '',

            entities: {
                urls: []
            },

            user: {
                name: '',
                screen_name: ''
            }
        },

        in_reply_to_screen_name: '',
        in_reply_to_status_id_str: '',
    }
];