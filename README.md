#v-input
A Vue.js directive for dynamic input
```
<el-table
  :data="tableData"
  style="width: 100%">
  <el-table-column
    prop="date"
    label="日期"
    width="180">
    <template slot-scope="{row}">
      <span v-field="{value: () => row.date, input: v => row.date = v}">{{ row.date }}<span>
    </template>
  </el-table-column>
</el-table>
```

###Installation
`npm i --save v-field`

```
import Vue from 'vue';
import VField from 'v-field';

Vue.use(VField, directiveName); // default directiveName = 'v-field'

```
###options

```
<span
  v-field="{
    type: 'click',   // dblclick
    nodeName: 'TD',  // TH
    value: () => row.date, 
    input: val => row.date = val,
    disabled: () => false, 
  }"
>
  {{ row.date }}
<span>
```

