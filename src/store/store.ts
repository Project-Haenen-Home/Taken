import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { Task, PairIDName } from "../common/types";

export interface RootState {
    tasks: Task[];
    rooms: PairIDName[];
    people: PairIDName[];

    overlay: PairIDName;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore() {
    return baseUseStore(key);
}

export default createStore<RootState>({
    state: {
        tasks: Array<Task>(),
        rooms: Array<PairIDName>(),
        people: Array<PairIDName>(),

        overlay: { _id: "", name: "" }
    },
    mutations: {
        setTasks(state, value: Task[]) {
            state.tasks = value;
        },
        setRoom(state, value: PairIDName[]) {
            state.rooms = value;
        },
        setPeople(state, value: PairIDName[]) {
            state.people = value;
        },
        setOverlay(state, value: PairIDName) {
            state.overlay = value;
        }
    },
    actions: {
        fetchAll(context) {
            context.dispatch("fetchTasks");
            context.dispatch("fetchRooms");
            context.dispatch("fetchPeople");
        },
        fetchTasks(context) {
            fetch("http://wolleserver.local:2400/task")
                .then((resp) => resp.json())
                .then((data: Task[]) => {
                    context.commit("setTasks", data);
                });
        },
        fetchRooms(context) {
            fetch("http://wolleserver.local:2400/room")
                .then((resp) => resp.json())
                .then((data: PairIDName[]) => {
                    context.commit("setRoom", data);
                });
        },
        fetchPeople(context) {
            fetch("http://wolleserver.local:2400/person")
                .then((resp) => resp.json())
                .then((data: PairIDName[]) => {
                    context.commit("setPeople", data);
                });
        }
    },
    modules: {}
});
