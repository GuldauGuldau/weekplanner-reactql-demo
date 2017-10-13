const uuid = require('uuid');

export function addToDo(todo) {
  return {
    type: 'ADD_TODO',
    todo,
  };
}
export function removeToDo(todo) {
  return {
    type: 'REMOVE_TODO',
    todo,
  };
}

export function addEvent(eventName, eventColor, eventDesc) {
  return {
    type: 'ADD_EVENT',
    payload: {
      uuid: uuid.v4(),
      name: eventName,
      color: eventColor,
      desc: eventDesc ? eventDesc : 'Not descriptions'
    }
  };
}

export function editEvent(eventName, eventColor, eventDesc, uuid) {
  return {
    type: 'EDIT_EVENT',
    payload: {
      uuid: uuid,
      name: eventName,
      color: eventColor,
      desc: eventDesc
    }
  };
}

export function removeEvent(eventUUID) {
  return {
    type: 'REMOVE_EVENT',
    eventUUID,
  };
}

export function addSchedule(eventUUID, day, time) {
  return {
    type: 'ADD_SCHEDULE',
    payload: {
      eventUUID: eventUUID,
      day: day,
      startinterval: time,
      duration: 1
    }
  };
}

export function removeSchedule(eventUUID, day, time) {
  return {
    type: 'REMOVE_SCHEDULE',
    payload: {
      eventUUID: eventUUID,
      day: day,
      startinterval: time
    }
  };
}

export function removeEventFromSchedule(eventUUID) {
  return {
    type: 'REMOVE_EVENT_FROM_SCHEDULE',
    eventUUID
  }
}

export function resetSchedule() {
  return {
    type: 'RESET_SCHEDULE'
  };
}
