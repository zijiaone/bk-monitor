<!--
  - Tencent is pleased to support the open source community by making BK-LOG 蓝鲸日志平台 available.
  - Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
  - BK-LOG 蓝鲸日志平台 is licensed under the MIT License.
  -
  - License for BK-LOG 蓝鲸日志平台:
  - -------------------------------------------------------------------
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
  - documentation files (the "Software"), to deal in the Software without restriction, including without limitation
  - the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
  - and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  - The above copyright notice and this permission notice shall be included in all copies or substantial
  - portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
  - LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  - NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  - WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  - SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
  -->

<template>
  <div class="log-search-component">
    <LogSearch
      :show-auto-query="true"
      :service-config="serviceConfig"
    />
  </div>
</template>

<script>
import LogSearch from '@blueking/log-search/vue2';
// import LogSearch from './components/vue2-full.es';
import '@blueking/log-search/dist/vue2-light.css';

import Service from './service/log';

export default {
  components: {
    LogSearch,
  },
  data() {
    return {
      serviceConfig: {
        createFieldSettings: Service.createFieldSettings,
        deleteFieldSettings: Service.deleteFieldSettings,
        exportLog: Service.exportLog,
        fetchFieldsSettings: Service.fetchFieldsSettings,
        fetchIndexSetList: Service.fetchIndexSetList,
        fetchLogBarChart: Service.fetchLogBarChart,
        fetchLogContext: Service.fetchLogContext,
        fetchLogFields: Service.fetchLogFields,
        fetchLogSearch: Service.fetchLogSearch,
        fetchQueryStringInspect: Service.fetchQueryStringInspect,
        fetchRealTimeLog: Service.fetchRealTimeLog,
        fetchSearchConditionOptions: Service.fetchSearchConditionOptions,
        fetchSearchConditions: Service.fetchSearchConditions,
        fetchSearchHistory: Service.fetchSearchHistory,
        fetchUserSettings: Service.fetchUserSettings,
        updateFieldSettings: Service.updateFieldSettings,
        updateUseFieldSettings: Service.updateUseFieldSettings,
        updateUserSettings: Service.updateUserSettings,
      },
    };
  },
};
</script>

<style>
  .log-search-component {
    height: 100%;
    padding: 20px;
  }
</style>
