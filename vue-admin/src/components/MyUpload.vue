<template>
	<div>
		<el-upload
			:class="`upload-demo ${fileList.length >= count ? 'is-disabled' : ''}`"
			drag
			list-type="picture-card"
			accept="image/*"
			:multiple="true"
			:limit="count"
			:file-list="fileList"
			:on-exceed="exceed"
			:on-success="onSuccess"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove"
			:action="`${$root.baseurl}/file/upload`"
		>
			<div>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			</div>

			<div class="el-upload__tip" slot="tip">
				只能上传jpg/png文件，且不超过1000kb
			</div>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="" />
		</el-dialog>
	</div>
</template>

<script>
import api from '@/api'

export default {
	name: 'PageHeader',
	props: {
		src: {
			type: String,
			default: '',
		},
		count: {
			default: 1,
		},
		list: {
			default() {
				return []
			},
		},
	},
	data() {
		return {
			fileList: [],
			dialogImageUrl: '',
			dialogVisible: false,
		}
	},
	created() {},
	methods: {
		handleRemove(file, fileList) {
			const path = file.path || file.response.data.path
			api.file.del(path)
			this.setList(fileList)
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
		exceed() {
			this.$toast(`已达到最大上限，无法上传`, 'warning')
		},
		onSuccess(res, file, fileList) {
			this.setList(fileList)
		},

		setList(fileList) {
			this.fileList = fileList.map((v) => ({
				...v,
				url: this.$resolveImg(v.response.data.path),
			}))
		},
	},
	watch: {
		src: {
			handler: function(val, oldVal) {
				if (val && this.count === 1) {
					this.fileList = [{ name: val, url: val }]
				}
			},
			immediate: true,
		},
		list: {
			handler: function(val, oldVal) {
				if (val && val.length === 1) {
					this.fileList = val
				}
			},
			immediate: true,
		},
		fileList(list) {
			this.$emit('update:list', list)
		},
	},
}
</script>

<style lang="scss">
.upload-demo {
	// width: 300px;
	// height: 240px;
	.el-upload-dragger,
	.el-upload {
		width: 146px;
		height: 146px;
	}
	.el-upload-dragger .el-upload__text {
		line-height: 1;
	}

	&.is-disabled .el-upload {
		display: none;
	}
}
</style>
