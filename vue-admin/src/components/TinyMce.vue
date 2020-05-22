<template>
	<div>
		<editor
			api-key="xjtu5323l5kmn8ap36ec43743lpfvfq4czrqjqvsev32io7c"
			v-model="content"
			:initial-value="value"
			@onChange="changeValue"
			:init="{
				height: 300,
				menubar: false,
				language: 'zh_CN',
				forced_root_block: 'div',
				plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table paste code help wordcount',
				],
				toolbar:
					'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
			}"
		/>
	</div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
	name: 'TinyMce',
	props: {
		value: {
			type: String,
			value: '',
		},
	},
	model: {
		prop: 'value',
		event: 'change',
	},
	components: {
		editor: Editor,
	},
	data() {
		return {
			content: '',
		}
	},
	methods: {
		changeValue(evt) {
			const value = evt.level.content
			this.$emit('change', value.replace(/(<p><br><\/p>){1,}$/g, ''))
		},
	},
	// created() {
	// 	this.content = this.value
	// },
	// watch: {
	// 	value(value) {
	// 		console.log(value)
	// 		console.log(
	// 			this.content,
	// 			this.content.replace(/\s+/g, '') === value.replace(/\s+/g, ''),
	// 		)
	// 		this.content = value
	// 	},
	// },
}
</script>
