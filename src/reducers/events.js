export default function reducer(state, action) {
  switch (action.type) {
      case 'ADD_EVENT':
        return [...state, action.payload];
      case 'EDIT_EVENT':
        let payload = action.payload;
        return state.map(event => {
          if(event.uuid == payload.uuid) {
             return {...event, ...payload}
          }
          return event;
        });
      case 'REMOVE_EVENT':
        return state.filter(event =>  action.eventUUID !== event.uuid);
    }
  return state;
}
