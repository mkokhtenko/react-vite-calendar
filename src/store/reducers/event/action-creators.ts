import UserService from "../../../api/UserService"
import { IUser } from "../../../models/IUser";
import { IEvent } from "../../../models/IEvent";
import { AppDispatch } from "../../store";
import { SetGuestsAction, SetEventsAction } from "./types";
import { EventActionEnum } from "./types";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestsAction => ({ type: EventActionEnum.SET_GUESTS, payload }),
    setEvents: (payload: IEvent[]): SetEventsAction => ({ type: EventActionEnum.SET_EVENTS, payload }),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data));
        } catch (e) {
            console.log(e);
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events");
            const json: IEvent[] = events ? JSON.parse(events) : [];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json));
        } catch (e) {
            console.log(e);
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events");
            const json: IEvent[] = events ? JSON.parse(events) : [];
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (e) {
            console.log(e);
        }
    }
};
