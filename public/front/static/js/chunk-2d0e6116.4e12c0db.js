(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e6116"],{"96be":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("PageHeader",{attrs:{title:(e.$route.query.id?"编辑":"新建")+"项目种类"}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入名称，长度在2-10个字符之间"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{attrs:{placeholder:"如需换行，请以逗号隔开，比如：臻于化境 栩栩如生"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:"描述",prop:"desc"}},[r("el-input",{attrs:{placeholder:"请输入描述"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),r("div",{staticClass:"form-btns"},[r("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")])],1)],1)],1)},n=[],s=r("5530"),c=(r("96cf"),r("1da1")),i=r("365c"),o=r("08f3"),u={name:"CateCreate",data:function(){return{form:{name:"",title:"",desc:""},cities:o["a"],rules:{title:[{required:!0,message:"请输入标题"}],name:[{required:!0,message:"请输入名称"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],desc:[{required:!0,message:"请输入描述"}]}}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=e.$route.query.id,r){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,i["a"].cate.get(r);case 5:a=t.sent,e.form=Object(s["a"])({},a);case 7:case"end":return t.stop()}}),t)})))()},submit:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.form.validate(function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=6;break}return t.next=3,i["a"].cate.create(e.form);case 3:t.sent,e.$toast("".concat(e.form.id?"修改":"新建","成功")),e.$router.back();case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()}}},l=u,m=r("2877"),f=Object(m["a"])(l,a,n,!1,null,null,null);t["default"]=f.exports}}]);