(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cca54"],{"4f8d":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("PageHeader",[n("div",{staticClass:"between-center table-top"},[n("div",[n("MySelect",{attrs:{list:t.cities,text:"城市"},on:{change:t.refresh},model:{value:t.cityId,callback:function(e){t.cityId=e},expression:"cityId"}})],1),n("div",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.$router.push("/job/create")}}},[t._v("新建")])],1)]),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"60"}}),n("el-table-column",{attrs:{prop:"city",label:"所属城市",width:"180"}}),n("el-table-column",{attrs:{prop:"name",label:"职位名称",width:"180"}}),n("el-table-column",{attrs:{prop:"content",label:"职位描述"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{domProps:{innerHTML:t._s(e.row.content)}})]}}])}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticStyle:{"margin-right":"6px"},attrs:{size:"mini"},on:{click:function(n){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),n("el-popconfirm",{attrs:{title:"确定删除吗？"},on:{onConfirm:function(n){return t.handleDelete(e.$index,e.row)}}},[n("el-button",{attrs:{slot:"reference",size:"mini",type:"danger"},slot:"reference"},[t._v("删除")])],1)]}}])})],1),n("div",{staticClass:"all-center table-page"},[n("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":t.size,"current-page":t.current},on:{"update:currentPage":function(e){t.current=e},"update:current-page":function(e){t.current=e}}})],1)],1)},a=[],c=(n("96cf"),n("1da1")),i=n("365c"),o=n("08f3"),l={name:"UserTable",data:function(){return{content:"",total:0,current:1,size:10,list:[],cityId:"",cities:o["a"]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.loading){e.next=2;break}return e.abrupt("return");case 2:return t.loading=!0,e.prev=3,t.loading=!1,n={current:t.current,size:t.size},t.cityId&&(n.cityId=t.cityId),e.next=9,i["a"].job.getJobList(n);case 9:r=e.sent,t.list=r.records,t.total=r.total,e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](3),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[3,14]])})))()},refresh:function(){this.current=1,this.fetchData()},handleEdit:function(t,e){this.$router.push("/job/create?id=".concat(e.id))},handleDelete:function(t,e){var n=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["a"].job.del(e.id);case 2:n.$toast("删除成功"),n.fetchData();case 4:case"end":return t.stop()}}),t)})))()}},watch:{current:function(t){this.fetchData()}}},s=l,u=n("2877"),d=Object(u["a"])(s,r,a,!1,null,null,null);e["default"]=d.exports}}]);