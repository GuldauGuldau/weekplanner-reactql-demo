export default function reducer(state, action) {

  switch (action.type) {
    case 'ADD_SCHEDULE':
      return [...state, action.payload];
    case 'REMOVE_SCHEDULE':
      const { payload } = action;
      const { eventUUID, day, time } = payload;
      return state.filter(schedule =>  {
          let deleted = !( eventUUID == schedule.eventUUID &&
                           day == schedule.day &&
                           time == schedule.time );
          return deleted;

      });
    case 'REMOVE_EVENT_FROM_SCHEDULE':
      return state.filter(schedule => action.eventUUID !== schedule.eventUUID);
    case 'RESET_SCHEDULE':
      return [];
  }
  return state;
}
