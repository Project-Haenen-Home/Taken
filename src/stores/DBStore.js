const DBStore = {
    data: {
        tasks: [],
        people: [],
        rooms: []
    },
    methods: {
        getAll() {
            DBStore.methods.getTasks();
            DBStore.methods.getRooms();
            DBStore.methods.getPeople();
        },

        getTasks(filter) {
            var query = "?";
            if(filter != null) {
                var qArr = [];
                if(filter.personID != null && filter.personID != "") qArr.push("personID=" + filter.personID);
                if(filter.roomID != null && filter.roomID != "") qArr.push("roomID=" + filter.roomID);
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