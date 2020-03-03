# v-field  
🖍A Vue.js directive for dynamic input  

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

### Installation  
```
npm i --save v-field
```

```
import Vue from 'vue';
import VField from 'v-field';

Vue.use(VField, directiveName); // default directiveName = 'field'

```
### Playground on the Web
[https://codesandbox.io/s/v-field-hh8g2](https://codesandbox.io/s/v-field-hh8g2)  (interactive playground with webpack and ESM)


### Options

```
<span
  v-field="{
    event: 'click',  // dblclick
    nodeName: 'TD',  // TH
    value: () => row.date, 
    input: val => row.date = val,
    disabled: () => false, 
  }"
>
  {{ row.date }}
<span>
```
you can set defaultOptions
```
import VField from 'v-field';

VField.defaultOptions.event = 'dblclick';
VField.defaultOptions.nodeName = 'TH';
```

