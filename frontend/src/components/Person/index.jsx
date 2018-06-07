import React from 'react';
import propTypes from 'prop-types';

import sharedStrings from '../../shared/strings';

import './style.scss';

function Person(props) {

    return (
        <article className="person">
            <figure className="person__avatar">
                <img
                    className="person__image"
                    src={props.profileImageUrl}
                    alt={sharedStrings.profilePhotoAlt}
                />
            </figure>
            
            <div className="person__basic-info">
                <p className="person__name">
                    <a
                        href={`https://twitter.com/${props.nickName}`}
                        target="_blank"
                        className="external-link"
                    >
                        {props.name}
                    </a>     
                </p>

                <p className="person__nickname">@{props.nickName}</p>
            </div>
        </article>
    );
}

Person.propTypes = {
    profileImageUrl: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    nickName: propTypes.string.isRequired
};

export default Person;