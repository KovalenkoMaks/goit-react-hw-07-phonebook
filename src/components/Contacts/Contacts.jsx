import PropTypes from 'prop-types';
import { ContactEl, ContactsList } from './Contacts.styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteContact,
  getContactsState,
  getFilterState,
} from '../redux/contactsSlice';

export function Contacts() {
  const contacts = useSelector(getContactsState);
  const filter = useSelector(getFilterState);
  const dispatch = useDispatch();
  return (
    <>
      <h2>Contacts</h2>
      <ContactsList>
        {contacts.map(e => {
          if (!e.name.toLowerCase().includes(filter.toLowerCase())) {
            return null;
          }

          return (
            <ContactEl key={e.id}>
              <p>
                {e.name}: {e.number}
              </p>
              <button
                type="button"
                onClick={() => {
                  dispatch(deleteContact(e.id));
                }}
              >
                Delete
              </button>
            </ContactEl>
          );
        })}
      </ContactsList>
    </>
  );
}
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
