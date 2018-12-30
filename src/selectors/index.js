import { createSelectorCreator, defaultMemoize } from 'reselect'
import moment from 'moment';
import { isEqual } from 'lodash';

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

const getNotes = (state) => state.notes.notes;

export const getSortedNotes = createDeepEqualSelector(
  [ getNotes ],
  (notes) => Object.values(notes).sort((a, b) => moment(a.updated_at).isBefore(moment(b.updated_at)) ? 1 : -1)
);
