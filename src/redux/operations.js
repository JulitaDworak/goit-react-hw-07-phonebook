import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

// axios.defaults.baseURL = 'https://644a708a79279846dce8a780.mockapi.io/contacts';

axios.defaults.baseURL = 'https://64c154f6fa35860baea0675d.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);



export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, thunkAPI) => {
    try {
      //pobranie obecnych kontaktów poprzez get:
      const {
        contacts: { contacts },
      } = thunkAPI.getState();
      //sprawdzenie czy jest kontakt na liście
      if (contacts.find(item => item.name === contact.name)) {
        //jakiś alert dla użytkownika i reject
        Notiflix.Notify.failure(
          `Contact with name '${contact.name}' is already in contacts.`
        );
        return thunkAPI.rejectWithValue('Contact already exist');
      }
      //jeśli przechodzi bo nie ma takiego kontaktu to dodajemy postem nowy kontakt
      const response = await axios.post('/contacts', contact);
      Notiflix.Notify.success(
        `Contact with name '${contact.name}' has been added succesfully to contacts list.`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
