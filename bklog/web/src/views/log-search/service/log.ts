/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台 (BlueKing PaaS) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台 (BlueKing PaaS) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台 (BlueKing PaaS):
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
import Axios from 'axios';

const request = Axios.create({
  baseURL: '/api/v1',
  headers: {},
  timeout: 60000,
  withCredentials: true,
  xsrfCookieName: 'bklog_csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

request.interceptors.response.use(
  response => response.data.data,
  error => {
    console.log('error = ', error);
  },
);

const scopeList = [
  {
    scopeId: 'bkcc__2',
    scopeType: 'space',
  },
];

export default {
  createFieldSettings: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/settings/`, rest);
  },

  deleteFieldSettings: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/settings/delete/`, rest);
  },

  exportLog: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/download_url/`, rest);
  },

  fetchFieldsSettings: data => request.get(`/search_module/index_set/${data}/settings/`),

  fetchIndexSetList: () =>
    request.post('/search_module/index_set/list/', {
      scopeList,
    }),

  fetchLogBarChart: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/aggs/date_histogram/`, rest);
  },

  fetchLogContext: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/context/`, rest);
  },

  fetchLogFields: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/fields/`, rest);
  },

  fetchLogSearch: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/search/`, rest);
  },

  fetchQueryStringInspect: data =>
    request.post('/search_module/index_set/inspect/', {
      query_string: data,
    }),

  fetchRealTimeLog: data => {
    const { indexSetId, ...rest } = data;
    return request.post(`/search_module/index_set/${indexSetId}/tail_f/`, rest);
  },

  fetchSearchConditionOptions: data =>
    request.post(`/search_module/index_set/${data.indexSet}/condition/options/`, {
      condition_id: data.ids,
    }),

  fetchSearchConditions: data => request.get(`/search_module/index_set/${data}/condition/`),

  fetchSearchHistory: data => request.get(`/search_module/index_set/${data}/history/`),

  fetchUserSettings: () => request.get('/search_module/settings/'),

  updateFieldSettings: data => {
    const { indexSetId, ...rest } = data;
    return request.put(`/search_module/index_set/${indexSetId}/settings/update/`, rest);
  },

  updateUseFieldSettings: data => {
    const { indexSetId, ...rest } = data;
    return request.put(`/search_module/index_set/${indexSetId}/settings/user/`, rest);
  },

  updateUserSettings: data => request.post('/search_module/settings/', data),
};
