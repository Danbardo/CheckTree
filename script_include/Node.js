
Vue.component('node', {
  template: '#node-template',
      name: 'node',
        props: {
            node: Object,
            checkState:Number
        },
        data() {
            return {
                'id': this.node.id,
                'name': this.node.name,
                'children': this.node.children,
                'isFolder': this.node.isFolder,
                'isOpen' : this.node.parent_id==null,
                'checked' : false,
                'checkAll' : 0,
                'childrenChecked' : 0,
                'editing' : false,
                'adding' : this.node.adding,
                'editChild' : false,
                'hover':false,
            }
        },
        watch: {
            checkState() {
                if(this.checkState!=0)
                    this.checkAll = this.checkState;
                if(this.checkState == 1)
                    this.checked = true;
                if(this.checkState == -1)
                    this.checked = false;
            },
            checked(){
                this.$emit('child-clicked', {c:this.checked,r:false})
            }
        },
        computed: {
            hasChildren(){
                return this.children!=null&&this.children.length>0;
            },
            canEdit(){
                return !this.editChild && this.hover;
            },
            canAdd(){
                return !this.editChild && this.isFolder && this.isOpen &&this.hover
            },
            getType(){
                return this.isFolder?"Folder" : "node"
            },
            noChildren(){
                return this.isOpen&&!this.hasChildren;
            },
            nChildren(){
              return this.children==null? 0 : this.children.length;
            }
        },
        methods: {
            childClicked(d) {
                if(d.r) {
                    this.checkAll = 0;
                    return;
                }
                let n = this.childrenChecked;
                d.c ? n++ : n--;
                n = n>0 ? n : 0;
                this.childrenChecked = n>this.nChildren ? this.nChildren : n;
                if(this.childrenChecked < this.nChildren){
                    this.checked = true;
                }else{
                    this.checked = false;
                }
                if(this.childrenChecked == 0){
                    this.checked = false;
                }else if(this.childrenChecked == this.nChildren){
                    this.checked = true;
                }
                console.log(this.children);
            },
            nodeClick() {
                if(this.isFolder&&!this.editChild) {
                    this.isOpen = !this.isOpen;
                }else if(!this.isFolder){
                    this.checked = !this.checked;
                    this.checkMark()
                }
            },
            typeToggle(){
                if(this.adding)
                    this.isFolder = !this.isFolder;
            },
            checkMark(){
                this.$emit('child-clicked', {c:this.checked,r:true})
                if(this.hasChildren){
                    if(this.checked) {
                        this.checkAll = 1;

                        this.childrenChecked = this.nChildren
                    }else{
                        this.checkAll = -1;
                        this.childrenChecked = 0
                    }
                }
            },
            openEdit(){
                this.editing = true;
                this.isOpen = false;
                this.$emit('edit-child');
            },
            addNode() {
                this.editChild = true;
                let n =  {
                    id: "node_"+ Math.random().toString(36).substr(2, 9),
                    name: "",
                    parent_id:this.id,
                    order: -1,
                    adding: true,
                    children:null
                };
                console.log(n);
                if(this.children==null){
                  this.children = [];
                }
                this.children.push(n);

                this.children.sort(
                  (a, b) => {
                      if (a.order > b.order)
                          return 1;
                      else if (a.order < b.order)
                          return -1;
                      return 0;
                })
            },
            saveNode(node) {
                this.editing=false;
                this.adding=false;
                this.$emit('save-child',this);
            },
            removeNode(){
              this.$emit('remove-child',this.id);
            },
            cancelEdit(){
                if(this.node.adding){
                  this.$emit('remove-child',this.node.id);
                }else{
                    this.editing=false;
                }
                this.$emit('cancel-add');
            },
            removeChild(id){
              const index = this.children.findIndex(b => b.id == id)
              if(index>=0)
                this.children.splice(index, 1)
            },
            saveChild(node){
              const index = this.children.findIndex(item => item.id == node.id)
              const found = this.children[index];
              for(key in found){
                this.children[index][key] = node[key];
              }
              this.editChild = false;
            }
        }

})
