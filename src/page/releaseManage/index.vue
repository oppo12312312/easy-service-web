<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-20 16:31:34
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 16:12:58
 -->
<template>
  <div class="release-manage">
    <megTitle class="mb20">
      发布管理
    </megTitle>
    <div class="button">
      <div class="left">
        <el-card
          shadow="never"
          class="meg-software"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>产品列表</span>
          </div>
          <div class="inputClass">
            <el-button
              type="primary"
              @click="newSdkVisible = true; isUpdate = false;"
              class="add-sdk-production"
            >
              新增SDK产品
            </el-button>
          </div>
          <el-dialog
            :title="isUpdate?'修改SDK':'新增SDK'"
            :visible.sync="newSdkVisible"
            width="30%"
            class="dialogClass"
          >
            <el-form
              :model="form"
              :rules="addRules"
            >
              <el-form-item
                label="SDK名称"
                label-width="100px"

                prop="name"
              >
                <el-input
                  v-model="form.name"
                ></el-input>
              </el-form-item>
            </el-form>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="newSdkVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="choose"
              >确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            :title="isUpdateVersion? '修改SDK版本':'新增SDK版本'"
            :visible.sync="updaVersionVisible"
            width="40%"
            class="dialogClass"
          >
            <el-form
              :model="tableForm"
              label-position="left"
              :rules="addSdkRules"
            >
              <el-form-item
                label="版本号"
                label-width="100px"
                prop="version"
              >
                <el-input v-model="tableForm.version"></el-input>
              </el-form-item>
              <el-form-item
                label="版本类型"
                label-width="100px"
                prop="type"
              >
                <el-select
                  v-model="tableForm.type"
                  class="width100"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in $t('select.sdkType')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="是否发布"
                label-width="100px"
                prop="status"
              >
                <el-select
                  v-model="tableForm.status"
                  class="width100"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in $t('select.sdkStatus')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="updaVersionVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="chooseVersion"
              >确 定</el-button>
            </span>
          </el-dialog>
          <el-input
            v-if="showNameSpace"
            placeholder="请输入产品名称"
            v-model="text"
            class="mb20"
            size="medium"
          >
            <el-select
              v-model="nameSpaceValue"
              @change="changeNameSpace"
              slot="prepend"
              placeholder="请选择分区"
            >
              <el-option
                v-for="item in nameSpaces"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-input>

          <el-scrollbar>
            <div
              v-for="(item, i) in showList"
              @click="open(item.sdk_type_id, item.sdk_type_name)"
              :key="item.sdk_type_id"
              class="item"
            >
              <span>{{ item.sdk_type_name }}</span>
              <el-button
                type="text"
                @click="changeSDK(item.sdk_type_id, i)"
                style="float: right; padding-right: 20px;"
              >
                修改
              </el-button>
            </div>
          </el-scrollbar>
        </el-card>
      </div>
      <div class="mr20"></div>
      <div class="right">
        <el-card
          shadow="never"
          class="box-card"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>版本{{ versionName }}</span>
          </div>
          <div class="inputClass">
            <el-button
              type="primary"
              @click="updaVersionVisible = true;isUpdateVersion = false;tableForm = {status: 'RELEASED', type: 'RELEASE'}"
              class="add-sdk-production"
            >
              新增SDK版本
            </el-button>
          </div>
          <template>
            <el-scrollbar>
              <el-table
                border
                :data="versionList"
                style="width: 100%"
              >
                <el-table-column
                  prop="sdk_version"
                  label="版本号"
                >
                </el-table-column>
                <el-table-column
                  prop="release_version_type"
                  label="版本类型"
                >
                </el-table-column>
                <el-table-column
                  prop="updated_time"
                  :formatter="formatterDateTime"
                  label="更新时间"
                >
                </el-table-column>
                <el-table-column
                  prop="sdk_download_url"
                  label="下载地址"
                >
                  <template slot-scope="scope">
                    <span @click="upload(scope.row)">
                      <el-upload
                        class="c-light pointer upload-class"
                        :action="uploadUrl"
                        :http-request="myUpload"
                        :show-file-list="false"
                      >
                        <span
                          class="el-upload__text "
                        ><em>点击上传</em></span>
                      </el-upload>
                    </span>
                    <span
                      class="c-light pointer"
                      @click="download(scope.row.sdk_id)"
                      type="text"
                    >
                      点击下载
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="修改/删除"
                >
                  <template
                    slot-scope="scope"
                  >
                    <span
                      class="c-light pointer"
                      @click="changeVersion(scope.row, scope.$index)"
                      type="text"
                    >
                      修改
                    </span>
                    <span
                      class="c-light pointer"
                      @click="deleteVersion(scope.$index, scope.row, versionList,)"
                      type="text"
                    >
                      删除
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-scrollbar>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import mixins from '@/common/mixins/util.js';
import axios from 'axios';
const serviceUrl = require('@/config.js');
export default {
  name: 'ReleaseManage',
  components: {
    megTitle,
  },
  directives: {
    focus: {// v-focus指令的定义
      inserted(el) {
        el.querySelector('input').focus();
      }
    }
  },
  mixins: [mixins],
  data() {
    return {
      isUpdate: false,
      isUpdateVersion: false,
      newSdkVisible: false,
      updaVersionVisible: false,
      showNameSpace: true,
      nameSpaceValue: 1,
      currentNamespaceId: 1,
      currentSdkTypeId: 1,
      currentSdkId: '',
      index: '',
      text: '',
      
      form: {
        name: '',
      },
      tableForm: {
        name: '',
        status: 'RELEASED',
        version: ''
      },
      list: [],
      visible: true,
      versionName: '',
      nameSpaces: [],
      versionList: [],
      addRules: {
        name: [
          { required: true, message: '请输入SDK名称', trigger: 'blur' }
        ]
      },
      addSdkRules: {
        version: [
          { required: true, message: '请输入SDK版本', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入版本类型', trigger: 'blur' }
        ]
      },
      uploadUrl: '',
      uploadHeader: {

      }
    };
  },
  computed: {
    showList() {
      let re = [];
      if (this.text === '') {
        re = this.list;
      } else {
        re = this.list.filter(item => {
          return item.sdk_type_name.indexOf(this.text) > -1;
        });
      }
      return re;
    }
  },
  mounted() {
    //获取分区列表
    this.$service.releaseManage.getList({
      admin_id: this.$store.getters['user/getAdminId']
    }).then((data) => {
      console.log(data);
      if (data.status === 200) {
        this.nameSpaces = data.data;
        this.currentNamespaceId = this.nameSpaces[0].id;
        this.nameSpaceValue = this.nameSpaces[0].name;
        //获取第一个分区的sdk产品
        this.$service.releaseManage.getSdk({
          admin_id: this.$store.getters['user/getAdminId'],
          namespace_id: this.currentNamespaceId,
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.list = response.data;
            //获取第一个分区的所有历史sdk
            this.$service.releaseManage.getSdkVersion({
              admin_id: this.$store.getters['user/getAdminId'],
              namespace_id: this.currentNamespaceId,
              sdk_type_id: this.list[0].sdk_type_id,
            }).then((response) => {
              console.log(response);
              this.versionList = response.data;
              //this.versionName = name;
            }).catch((error) => {
              console.log(error);
            });
          }
        })
          .catch((error) => {
            console.log(error);
          });
      }
    })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    //选择新增SDK还是修改SDK
    choose() {
      if (this.isUpdate) {
        this.updateSdk();
      } else {
        this.addSdk();
      }
    },
    chooseVersion() {
      if (this.isUpdateVersion) {
        this.updateVersion();
      } else {
        this.addSdkVersion();
      }
    },
    //根据分区获取sdk产品
    changeNameSpace(val) {
      this.currentNamespaceId = val;
      this.$service.releaseManage.getSdk({
        admin_id: this.$store.getters['user/getAdminId'],
        namespace_id: this.currentNamespaceId,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.list = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //新增SDK产品
    addSdk() {
      this.$service.releaseManage.createSdk({
        name: this.form.name,
        admin_id: this.$store.getters['user/getAdminId'],
        namespace_id: this.currentNamespaceId,
      }).then((response) => {
        if (response.status === 200) {
          console.log('新增SDK产品成功');
          this.newSdkVisible = false;
          console.log(response);
          this.list.push(response.data);
        }
      }).catch((error) => {
        console.log('新增SDK产品失败');
        console.log(error);
      });
    },
    //修改SDK产品按钮
    changeSDK(id, index) {
      this.index = index;
      this.isUpdate = true;
      this.currentSdkTypeId = id;
      this.newSdkVisible = true;
      debugger;
      this.form.name = this.list[this.index].sdk_type_name;
    },
    //修改SDK产品
    updateSdk() {
      this.$service.releaseManage.updateSdk({
        admin_id: this.$store.getters['user/getAdminId'],
        sdk_type_id: this.currentSdkTypeId,
        name: this.form.name
      }).then((response) => {
        if (response.status === 200) {
          console.log('修改SDK产品成功');
          this.newSdkVisible = false;
          this.list[this.index].sdk_type_name = this.form.name;
          console.log(response);
        }
      }).catch((error) => {
        console.log('修改SDK产品失败');
        console.log(error);
      });
    },
    //打开对应的版本号
    open(id, name) {
      this.versionList = [];
      this.$service.releaseManage.getSdkVersion({
        admin_id: this.$store.getters['user/getAdminId'],
        namespace_id: this.currentNamespaceId,
        sdk_type_id: id,
      }).then((response) => {
        if (response.status === 200) {
          console.log(response);
          this.currentSdkTypeId = id;
          this.versionList = response.data;
          this.versionName = name;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    //新增SDK版本
    addSdkVersion() {
      this.$service.releaseManage.createSdkVersion({
        admin_id: this.$store.getters['user/getAdminId'],
        namespace_id: this.currentNamespaceId,
        status: this.tableForm.status,
        sdk_type_id: this.currentSdkTypeId,
        version: this.tableForm.version,
        release_version_type: this.tableForm.type,
      }).then((response) => {
        if (response.status === 200) {
          console.log(response);
          this.updaVersionVisible = false;
          this.versionList.push(response.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    //点击下载
    download() {

    },
    upload(row) {
      this.currentSdkId = row.sdk_id;
      this.uploadUrl = serviceUrl.serviceUrl + '/admin/' + this.$store.getters['user/getAdminId'] + '/api/v1/sdks/' + this.currentSdkId + '/upload';
      console.log(this.uploadUrl);
    },

    myUpload(content) {
      const form = new FormData();
      form.append('file', content.file);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      };
      console.log('uploading');
      axios.put(content.action, form, config)
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              message: 'sdk文件上传成功',
              type: 'success'
            });
            console.log('上传成功');
            console.log(response);
          }
        }).catch((error) => {
          this.$message({
            message: 'sdk文件上传失败',
            type: 'warning'
          });
          console.log(error);
          console.log('上传失败');
        });
    },
    //修改SDK版本按钮
    changeVersion(row, index) {
      this.isUpdateVersion = true;
      this.index = index;
      this.currentSdkId = row.sdk_id;
      this.updaVersionVisible = true;
      this.tableForm.version = this.versionList[this.index].sdk_version;
      this.tableForm.type = this.versionList[this.index].release_version_type;
    },
    //修改SDK版本
    updateVersion() {
      this.$service.releaseManage.updateSdkVersion({
        admin_id: this.$store.getters['user/getAdminId'],
        sdk_id: this.currentSdkId,
        status: this.tableForm.status,
        version: this.tableForm.version,
        release_version_type: this.tableForm.type,
      }).then((response) => {
        if (response.status === 200) {
          console.log(response);
          console.log('修改成功');
          this.updaVersionVisible = false;
          this.versionList[this.index].sdk_version = this.tableForm.version;
          this.versionList[this.index].release_version_type = this.tableForm.type;
        }
      }).catch((error) => {
        console.log('修改失败');
        console.log(error);
      });
    },
    //删除SDK版本
    deleteVersion(index, row, table) {
      this.$confirm('确定删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row);
        console.log(table);
        this.currentSdkId = row.sdk_id;
        this.$service.releaseManage.deleteSdkVersion({
          admin_id: this.$store.getters['user/getAdminId'],
          sdk_id: this.currentSdkId,
          status: 'INACTIVE',
        }).then((response) => {
          if (response.status === 200) {
            console.log(response);
            console.log('删除成功');
            table.splice(index, 1);
          }
        }).catch((error) => {
          console.log('删除失败');
          console.log(error);
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style scoped>

</style>
