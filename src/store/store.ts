import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { Task, PairIDName, TaskFilter, Overlay } from "../common/types";

export interface RootState {
    tasks: Task[];
    rooms: PairIDName[];
    people: PairIDName[];

    overlay: Overlay[];
    taskFilter: TaskFilter;
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

        overlay: Array<Overlay>(),
        taskFilter: { personID: [], roomID: "0", dayFilter: Number.MAX_SAFE_INTEGER }
    },
    getters: {
        getOverlay(state): Overlay {
            const l = state.overlay.length;
            if (l == 0) return { id: "", name: "", mustReturn: false, popOut: false };

            return state.overlay[l - 1];
        }
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
        pushOverlay(state, value: Overlay) {
            console.log(value);
            if (value.mustReturn == undefined) value.mustReturn = false;
            if (value.popOut == undefined) alert("Define popout");
            state.overlay.push(value);
            console.log(state.overlay[state.overlay.length - 1]);
        },
        popOverlay(state) {
            console.log(state.overlay.pop());
        },
        popAllOverlay(state) {
            state.overlay = [];
        },
        setDayFilter(state, value: number) {
            state.taskFilter.dayFilter = value;
        }
    },
    actions: {
        fetchAll(context) {
            context.dispatch("fetchTasks");
            context.dispatch("fetchRooms");
            context.dispatch("fetchPeople");
        },
        fetchTasks(context) {
            const taskFilter = context.state.taskFilter;

            let query = "";
            const qArr: string[] = [];
            if (taskFilter.personID.length > 0) qArr.push("personID=" + taskFilter.personID.join("|"));

            if (taskFilter.roomID != "" && taskFilter.roomID != "0") qArr.push("roomID=" + taskFilter.roomID);

            if (taskFilter.dayFilter > 0 && taskFilter.dayFilter != Number.MAX_SAFE_INTEGER)
                qArr.push("dayFilter=" + taskFilter.dayFilter);

            if (qArr.length > 0) query = "?" + qArr.join("&");

            fetch("http://wolleserver.local:2400/task" + query)
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
        },
        deletePersonFilter(context, value: string) {
            const index = context.state.taskFilter.personID.indexOf(value);
            if (index > -1) {
                context.state.taskFilter.personID.splice(index, 1);
                context.dispatch("fetchTasks");
            }
        }
    },
    modules: {}
});
