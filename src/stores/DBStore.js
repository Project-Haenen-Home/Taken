const DBStore = {
    data: {
        tasks: [],
        people: [],
        rooms: [],

        deadSlider: "12",

        taskFilter: { personID: [], roomID: "0", dayFilter: null}
    },
    methods: {
        getAll() {
            DBStore.methods.getTasks();
            DBStore.methods.getRooms();
            DBStore.methods.getPeople();
        },

        getTasks() {
            var query = "?";
            if(DBStore.data.taskFilter != null) {
                var qArr = [];
                if(DBStore.data.taskFilter.personID != null && DBStore.data.taskFilter.personID != "") qArr.push("personID=" + DBStore.data.taskFilter.personID.join('|'));
                if(DBStore.data.taskFilter.roomID != null && DBStore.data.taskFilter.roomID != "" && DBStore.data.taskFilter.roomID != "0") qArr.push("roomID=" + DBStore.data.taskFilter.roomID);
                if(DBStore.data.taskFilter.dayFilter != null && DBStore.data.taskFilter.dayFilter != "") qArr.push("dayFilter=" + DBStore.data.taskFilter.dayFilter);
                query += qArr.join("&");
            }

            fetch("http://wolleserver.local:2400/task" + query)
                .then(resp => resp.json())
                .then(data => {
                    DBStore.data.tasks = data;
                });
        },

        getPeople() {
            fetch("http://wolleserver.local:2400/person")
                .then(resp => resp.json())
                .then(data => {
                    DBStore.data.people = data;
                });
        },

        getRooms() {
            fetch("http://wolleserver.local:2400/room")
                .then(resp => resp.json())
                .then(data => {
                    DBStore.data.rooms = data;
                });
        }


    }
};

export default DBStore;