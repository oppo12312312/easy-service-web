<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 14:33:37
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 16:21:49
 -->
<template>
  <div class="namespace-manage">
    <megTitle>分区管理</megTitle>
    <el-button
      type="primary"
      class="add-btn"
      @click="openDialog"
    >
      新增分区/namespace
    </el-button>
    <el-button
      type="primary"
      class="add-btn"
      @click="openOwnerDialog"
    >
      新增namespaceOwner
    </el-button>
    <el-dialog
      title="新增分区Owner"
      :visible.sync="ownerDialogVisible"
      width="30%"
      class="dialogClass"
    >
      <el-form
        :model="ownerForm"
        :rules="addOwnerRules"
      >
        <el-form-item
          label="Owner"
          label-width="100px"
          prop="owners"
        >
          <el-input v-model="ownerForm.owners"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="ownerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addNamespaceOwner"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增分区"
      :visible.sync="newDialogVisible"
      width="30%"
      class="dialogClass"
    >
      <el-form
        :model="form"
        :rules="addRules"
      >
        <el-form-item
          label="分区名称"
          label-width="100px"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="newDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addNamespace"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改分区"
      :visible.sync="editDialogVisible"
      width="40%"
      class="dialogClass"
    >
      <el-form
        :model="form"
        label-position="left"
      >
        <el-form-item
          label="分区名称"
          label-width="100px"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="Owner权限"
          label-width="100px"
        >
          <el-input v-model="form.owners"></el-input>
        </el-form-item>
        <el-form-item
          label="写权限"
          label-width="100px"
        >
          <el-input v-model="form.writers"></el-input>
        </el-form-item>
        <el-form-item
          label="技术支持权限"
          label-width="100px"
        >
          <el-input v-model="form.supporters"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editNamespace"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="分区名称"
      >
      </el-table-column>
      <el-table-column
        prop="owners"
        label="管理权限"
        :formatter="format"
      >
      </el-table-column>
      <el-table-column
        prop="writers"
        label="写权限"
        :formatter="format"
      >
      </el-table-column>
      <el-table-column
        prop="supporters"
        label="技术支持权限"
        :formatter="format"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="分区管理"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="changeNamespace(scope.$index, scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="text"
            @click="deleteNamespace(scope.$index, scope.row, tableData)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
export default {
  name: 'NamespaceManage',
  components: { megTitle },
  directives: {
    focus: {// v-focus指令的定义
      inserted(el) {
        el.querySelector('input').focus();
      }
    }
  },
  data() {
    return {
      index: '',
      admin_id: 1,
      namespace_id: '',
      ownerDialogVisible: false,
      newDialogVisible: false,
      editDialogVisible: false,
      tableData: [],
      ownerForm: {
        owners: ''
      },
      form: {
        name: '',
        owners: '',
        writers: '',
        supporters: ''
      },
      addRules: {
        name: [
          { required: true, message: '请输入分区名称', trigger: 'blur' }
        ]
      },
      addOwnerRules: {
        owner_id: [
          {
            required: true, message: '请输入分区Owner', trigger: 'blur'
          }
        ]
      }
    };
  },
  mounted() {
    this.getNamespaceList();
  },
  methods: {
    //获取分区列表
    getNamespaceList() {
      this.$service.namespaceManage.getList({
        admin_id: this.$store.getters['user/getAdminId']
      }).then((data) => {
        console.log(data);
        this.tableData = data.data;
      })
        .catch((error) => {
          console.log(error);
        });
    },
    openDialog() {
      this.form = {
        name: '',
        owners: '',
        writers: '',
        supporters: ''
      };
      this.newDialogVisible = true;
    },
    openOwnerDialog() {
      this.ownerForm = {};
      this.ownerDialogVisible = true;
    },
    //新增分区管理员
    addNamespaceOwner() {
      this.$service.namespaceManage.addOwener({
        admin_id: this.$store.getters['user/getAdminId'],
        owners: this.ownerForm.owners,
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.ownerDialogVisible = false;
          console.log('新增分区管理员成功');
        }
      })
        .catch((error) => {
          console.log(error);
          console.log('新增分区失败');
        });
    },
    //新增分区
    addNamespace() {
      this.$service.namespaceManage.creat({
        admin_id: this.$store.getters['user/getAdminId'],
        name: this.form.name
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.newDialogVisible = false;
          console.log('新增分区成功');
          const list = {
            name: this.form.name
          };
          this.tableData.push(list);
        }
      })
        .catch((error) => {
          console.log(error);
          console.log('新增分区失败');
        });
    },
    editNamespace() {
      const owners = this.form.owners.toString().split(',');
      const writers = this.form.writers.toString().split(',');
      const supporters = this.form.supporters.toString().split(',');
      this.$service.namespaceManage.update({
        admin_id: this.$store.getters['user/getAdminId'],
        namespace_id: this.namespace_id,
        name: this.form.name,
        owners,
        writers,
        supporters
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.editDialogVisible = false;
          console.log('修改分区成功');
          this.tableData[this.index].name = this.form.name;
          this.tableData[this.index].owners = this.form.owners;
          this.tableData[this.index].writers = this.form.writers;
          this.tableData[this.index].supporters = this.form.supporters;
        }
      })
        .catch((error) => {
          console.log(error);
          console.log('修改分区失败');
        });
    },

    //分区管理修改
    changeNamespace(index, row) {
      debugger;
      console.log(row);
      console.log('index:' + index);
      this.index = index;
      this.editDialogVisible = true;
      this.namespace_id = row.id;
      console.log(this.namespace_id);
      this.form.name = row.name;
      this.form.owners = row.owners.join(',');
      this.form.writers = row.writers.join(',');
      this.form.supporters = row.supporters.join(',');
    },
    //分区管理删除
    deleteNamespace(index, row, table) {
      console.log(row.id);
      this.$confirm('此操作将删除该分区, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.namespaceManage.delete({
          admin_id: this.$store.getters['user/getAdminId'],
          namespace_id: row.id,
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            table.splice(index, 1);
            console.log('删除分区成功');
          }
        })
          .catch((error) => {
            console.log(error);
            console.log('删除分区失败');
          });
      }).catch(() => {
      });
    },
    //table中将value格式化
    format(row, col, value) {
      return (value instanceof Array) ? String(value) : value;
    }
  }
};
</script>
