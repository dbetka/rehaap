import { makeRequest, request } from 'utils/request';
import { API_ERRORS } from 'utils/macros/errors';

export const eventController = {
  getEventById ({ eventId }) {
    return makeRequest({
      method: request.get,
      url: '/event',
      data: { eventId },
      transformResponseData: data => data /* here should be some changes */,
      ...API_ERRORS.getEventById,
    });
  },
  getPointsByEventId ({ eventId }) {
    return makeRequest({
      method: request.get,
      url: '/event/points',
      data: { eventId },
      transformResponseData: data => {
        return data.points.map(point => point /* here should be some changes */);
      },
      ...API_ERRORS.getPointsByEventId,
    });
  },
  getCategoriesByEventId ({ eventId }) {
    return makeRequest({
      method: request.get,
      url: '/event/point/categories',
      data: { eventId },
      transformResponseData: data => data.categories,
      ...API_ERRORS.getCategoriesByEventId,
    });
  },
  collectPoint ({ user, eventId, pointId }) {
    return makeRequest({
      method: request.put,
      url: '/event/point/collect',
      data: { user, eventId, pointId },
      ...API_ERRORS.collectPoint,
    });
  },
  removePoint ({ eventId, pointId }) {
    return makeRequest({
      method: request.delete,
      url: '/event/point',
      data: { eventId, pointId },
      ...API_ERRORS.removePoint,
    });
  },
  addPoint ({ point, eventId }) {
    return makeRequest({
      method: request.post,
      url: '/event/point',
      data: {
        point,
        eventId,
      },
      ...API_ERRORS.addPoint,
    });
  },
  editPoint ({ point, eventId }) {
    return makeRequest({
      method: request.put,
      url: '/event/point',
      data: {
        point,
        eventId,
      },
      ...API_ERRORS.editPoint,
    });
  },
  updateEvent ({
    eventId,
    eventName,
    eventStartDate,
    eventEndDate,
    mapLongitude,
    mapLatitude,
    mapZoom,
    mapRefreshTime,
  }) {
    return makeRequest({
      method: request.put,
      url: '/event',
      data: {
        eventId,
        eventName,
        eventStartDate,
        eventEndDate,
        mapLongitude,
        mapLatitude,
        mapZoom,
        mapRefreshTime,
      },
      ...API_ERRORS.updateEvent,
    });

  },
};
