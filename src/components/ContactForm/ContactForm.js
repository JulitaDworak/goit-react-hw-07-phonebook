//Commented code in this file is the previous version of checking if the contact that we are adding is already in contacts
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import css from './ContactForm.module.css';
// import { selectContacts } from './../../redux/selectors';
// import Notiflix from 'notiflix';

const ContactForm = () => {
  const dispatch = useDispatch();
  // const contacts = useSelector(selectContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    // const names = contacts.map(contact => contact.name.toLowerCase());
    // const newContactName = form.elements.name.value.trim().toLowerCase();

    // if (names.find(name => name === newContactName)) {
    //   form.reset();
    //   return Notiflix.Notify.failure(
    //     `Contact with name '${newContactName}' is already in contacts.`
    //   );
    // }

    dispatch(
      addContact({
        name: form.elements.name.value,
        phone: form.elements.number.value,
      })
    );
    form.reset();
    // Notiflix.Notify.success(
    //   `Contact with name '${newContactName}' has been added succesfully to contacts list.`
    // );
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label className={css.contactForm__label} htmlFor="name">
        Name
      </label>
      <input
        className={css.contactForm__field}
        id="name"
        type="text"
        name="name"
        pattern="^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]+(([' \-][a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż])?[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.contactForm__label} htmlFor="number">
        Number
      </label>
      <input
        className={css.contactForm__field}
        id="number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.contactForm__button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
