import Vue from 'vue'
import './cmp'
// import draggable from 'vuedraggable'
import ElTableDraggable from 'element-ui-el-table-draggable'

Vue.component(`el-table-draggable`, ElTableDraggable)
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Pagination,
	Form,
	FormItem,
	Input,
	Select,
	Option,
	Popover,
	Popconfirm,
	Upload,
	Dialog,
	Image,
	DatePicker,
} from 'element-ui'

Vue.use(Button)
	.use(Dropdown)
	.use(DropdownMenu)
	.use(DropdownItem)
	.use(Pagination)
	.use(Form)
	.use(FormItem)
	.use(Input)
	.use(Select)
	.use(Option)
	.use(Popover)
	.use(Popconfirm)
	.use(Upload)
	.use(Dialog)
	.use(Image)
	.use(DatePicker)
