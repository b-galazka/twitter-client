import propTypes from 'prop-types';

export const baseTweetSchema = {
      
    id: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
    uselessUrls: propTypes.arrayOf(propTypes.string),

    urls: propTypes.arrayOf(propTypes.shape({
        url: propTypes.string.isRequired,
        display_url: propTypes.string.isRequired,
        expanded_url: propTypes.string.isRequired
    }))
};