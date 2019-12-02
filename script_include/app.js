var data =  {
                id: 1,
                parent_id: null,
                name: "First",
                isFolder: true,
                order: 1,
                children:[
                  {
                      id: 2,
                      parent_id: 1,
                      name: "First Child",
                      isFolder: true,
                      order: 1,
                      children: [
                        {
                            id: 6,
                            parent_id: 2,
                            name: "First Grand Child",
                            isFolder: false,
                            order: 1,
                        },
                        {
                            id: 5,
                            parent_id: 2,
                            name: "Second Grand Child",
                            isFolder: false,
                            order: 2,
                        }
                    ]
                  },
                  {
                      id: 3,
                      parent_id: 1,
                      name: "Second Child",
                      isFolder: false,
                      order: 2,
                      children:null
                  }
                ]
            };

var demo = new Vue({
  el: '#app',
  data: {
    nodes: data
  }
})
