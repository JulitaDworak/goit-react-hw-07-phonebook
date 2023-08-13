import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const isPendingAction = action => {
  return action.type.endsWith('pending');
};

const isRejectedAction = action => {
  return action.type.endsWith('rejected');
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  //The extraReducers "builder callback" notation
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.contactId === action.payload.contactId
        );
        state.contacts.splice(index, 1);
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectedAction, handleRejected);
  },

  // extraReducers: {
  //   [addContact.pending]: handlePending,
  //   [addContact.rejected]: handleRejected,
  //   [addContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.contacts.push(action.payload);
  //   },
  //   [deleteContact.pending]: handlePending,
  //   [deleteContact.rejected]: handleRejected,
  //   [deleteContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.contacts.findIndex(
  //       contact => contact.contactId === action.payload.contactId
  //     );
  //     state.contacts.splice(index, 1);
  //   },
  //   [fetchContacts.pending]: handlePending,
  //   [fetchContacts.rejected]: handleRejected,
  //   [fetchContacts.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.contacts = action.payload;
  //   },
  // },
});

export const contactsReducer = contactsSlice.reducer;
