<!-- 上传文件组件 -->
<template>
  <div>
    <!-- 日期范围选择 -->
    <div class="block">
      <el-date-picker v-model="dateRange" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" value-format="yyyy-MM" :clearable="false" @change="getArticlePage"> </el-date-picker>
    </div>
    <!-- 搜索框 -->
    <el-input placeholder="请输入文章标题" v-model="query"> </el-input>
    <el-button type="primary" icon="el-icon-search" @click="getArticlePage">搜索</el-button>
    <el-button type="primary" icon="el-icon-edit" round id="addButton" @click="showAddDialog">新增数据</el-button>
    <h1></h1>
    <!-- 信息展示表单 -->
    <template>
      <el-scrollbar style="height: calc(100vh - 195px)">
        <el-table :data="articleData" stripe style="width: 100%">
          <el-table-column prop="article_title" label="文章名称" align="center">
            <template scope="scope">
              <span class="article-title">{{ scope.row.article_title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="article_createtime" label="创建时间" align="center" width="100px">
            <template scope="scope">
              {{ handleTime(scope.row.article_createtime) }}
            </template>
          </el-table-column>
          <el-table-column prop="article_summary" label="文章摘要" align="center">
            <template scope="scope">
              <span class="article-summary">{{ scope.row.article_summary }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="istop" label="是否置顶" align="center" width="80px">
            <template scope="scope">
              {{ scope.row.istop==1?'置顶':'--' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="showEditData(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteAirData(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <!-- 分页条 -->
      <div class="block" style="text-align: center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </div>

      <!-- 信息提交表单 -->
      <el-dialog title="文章信息" :visible.sync="dialogAddVisible" style="width: 100%">
        <!-- :rules="rules"  -->
        <el-form :model="addArticleData" ref="addArticleData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="年份" style="width: 100%" prop="timeYear">
                <el-select v-model="addArticleData.timeYear" placeholder="年份">
                  <el-option label="2022" value="2022"></el-option>
                  <el-option label="2021" value="2021"></el-option>
                  <el-option label="2020" value="2020"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月份" prop="timeMouth">
                <el-select v-model="addArticleData.timeMouth" placeholder="月份" label-width="100%">
                  <el-option v-for="index in (1, 12)" :label="index" :value="index" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="主目录">
                <el-select v-model="mainDirectory" placeholder="主目录" size="" @change="findCitys">
                  <el-option v-for="(directory,index) in directoryData" :key="index" :value="directory.mainDirectory">{{ directory.mainDirectory }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="子目录" prop="cId">
                <el-select v-model="childrenDirectory" placeholder="子目录" size="">
                  <el-option v-for="(children,index) in showChildrenDirectory.childrenDirectory" :key="index" :value="children">{{ children }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5">
              <el-form-item label="PM2.5" prop="pm2_5">
                <el-input v-model.number="addArticleData.pm2_5" style="width: 80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="SO₂" prop="so_2">
                <el-input v-model.number="addArticleData.so_2" style="width: 80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="O₃" prop="o_3">
                <el-input v-model.number="addArticleData.o_3" style="width: 80%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addData('addArticleData')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 信息修改表单 -->
      <!-- <el-dialog title="空气质量信息" :visible.sync="dialogEditFormVisible" style="width: 100%">
        <el-form :model="airDataEditform" :rules="rules" ref="airDataEditform">
          <el-row>
            <el-col :span="12">
              <el-form-item label="年份" style="width: 100%">
                <el-select v-model="airDataEditform.timeYear" disabled placeholder="年份" @change="$forceUpdate()">
                  <el-option label="2020" value="2020"></el-option>
                  <el-option label="2021" value="2021"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月份">
                <el-select v-model="airDataEditform.timeMouth" disabled placeholder="月份" @change="$forceUpdate()">
                  <el-option v-for="index in (1, 12)" :label="index" :value="index" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="城市">
                <el-select v-model="airDataEditform.city.cName" disabled placeholder="城市">
                  <el-option :label="airDataEditform.city.cName" :value="airDataEditform.city.cId" :key="airDataEditform.city.cId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="PM2.5" prop="pm2_5">
                <el-input v-model.number="airDataEditform.pm2_5" style="width: 80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="SO₂" prop="so_2">
                <el-input v-model.number="airDataEditform.so_2" style="width: 80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="O₃" prop="o_3">
                <el-input v-model.number="airDataEditform.o_3" style="width: 80%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeEditForm('airDataEditform')">取 消</el-button>
          <el-button type="primary" @click="editData('airDataEditform')">确 定</el-button>
        </div>
      </el-dialog> -->
    </template>
  </div>
</template>

<script>
export default {
  name: 'DataManage',
  data () {
    return {
      articleData: [], // 文章数据
      directoryData: [], // 服务器目录数据
      addArticleData: {}, // 待上传文章数据
      mainDirectory: '', // 选中的主目录
      childrenDirectory: '', // 选中的子目录
      dialogAddVisible: false, // 是否显示新增弹出层
      dialogEditFormVisible: false, // 是否显示编辑弹出层
      query: '', // 查询条件
      dateRange: ['', ''], // 查询的日期范围
      currentPage: 1, // 当前页码
      pageSizes: [10, 15, 20, 25], // 每个页面显示的数据条数的选项
      pageSize: 10, // 每页显示色数据条数
      total: 0 // 数据总条数
    }
  },
  computed: {
    handleTime: {
      get () {
        return function (time) {
          return this.$dayjs(time).format('YYYY-MM-DD')
        }
      }
    },
    showChildrenDirectory () {
      for (let i = 0; i < this.directoryData.length; i++) {
        if (this.directoryData[i].mainDirectory === this.mainDirectory) {
          return this.directoryData[i]
        }
      }
      return {}
    }
  },
  mounted () {
    // 获取文章数据
    this.getArticlePage()
    // 获取服务器目录信息
    this.getDirectoryData()
  },
  methods: {
    // 获取文章数据
    async getArticlePage () {
      const result = await this.$API.reqGetArticlePage({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        query: this.query
      })
      if (result.code === 200) {
        this.total = result.data.total
        this.articleData = result.data.rows
      }
    },
    // 获取服务器目录信息
    async getDirectoryData () {
      const result = await this.$API.reqGetDirectory()
      if (result.code === 200) {
        this.directoryData = result.data
      }
    },
    findCitys () {
      this.childrenDirectory = ''
      // console.log(this.showChildrenDirectory)
    },
    // 展示新增文章对话框
    showAddDialog () {
      this.dialogAddVisible = true
    },
    // 每页显示数据条数发生变化
    handleSizeChange (val) {
      this.pageSize = val
      this.getArticlePage() // 重新查询数据
    },
    // 当前页码发生改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticlePage() // 重新查询数据
    }
  }
}
</script>

<style lang="less" scoped>
//表格中文章标题列的样式
.article-title {
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

//表格中文章摘要列的样式
.article-summary {
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

//修改输入框样式
/deep/ .el-input {
  width: 25%;
}

/deep/ #addButton {
  float: right;
}

/deep/ .el-form-item {
  .el-input {
    width: 100%;
    // .el-input__inner{
    // width:100%
    // }
  }
}

//.first1.first2 表示有class="first1 first2"
/deep/ .el-scrollbar__bar.is-horizontal {
  display: none; //隐藏横向滚动条
}

/deep/ .el-scrollbar__bar.is-vertical {
  opacity: 1; //滚动条的不透明度
}
//去除底部出现的滚动条
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
//日期选择 样式
.block {
  display: inline-block;
  margin-right: 20px;
}
</style>
