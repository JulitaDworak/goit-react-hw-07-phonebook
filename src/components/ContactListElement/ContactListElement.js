import React from 'react';
import propTypes from 'prop-types';
import css from './ContactListElement.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

const ContactListElement = props => {
  const dispatch = useDispatch();

  const ContactDeleteHandler = () => {
    dispatch(deleteContact(props.id));
  };

  return (
    <li className={css.contactElement}>
      <p>{props.name}</p>
      <p>{props.phone}</p>
      <button
        className={css.contactElement__button}
        type="button"
        onClick={ContactDeleteHandler}
      >
        Delete
      </button>
    </li>
  );
};

ContactListElement.propTypes = {
  name: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
};

export default ContactListElement;
