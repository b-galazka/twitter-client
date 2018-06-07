import propTypes from 'prop-types';

import { baseTweetSchema } from '../Tweet/schemas';

export const quotedTweetShape = propTypes.shape({
    ...baseTweetSchema,

    author: propTypes.shape({
        name: propTypes.string.isRequired,
        screen_name: propTypes.string.isRequired
    }).isRequired
});