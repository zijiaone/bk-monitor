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
import { computed, defineComponent, inject, PropType, provide, Ref, ref, watch } from 'vue';
import { Collapse, Radio } from 'bkui-vue';

import { getDefautTimezone } from '../../../../monitor-pc/i18n/dayjs';
import { IQueryParams, IViewOptions } from '../../../../monitor-ui/chart-plugins/typings';
import TimeSeries from '../../../plugins/charts/time-series/time-series';
import {
  REFLESH_IMMEDIATE_KEY,
  REFLESH_INTERVAL_KEY,
  TIME_OFFSET_KEY,
  TIME_RANGE_KEY,
  TIMEZONE_KEY,
  VIEWOPTIONS_KEY
} from '../../../plugins/hooks';
import { PanelModel } from '../../../plugins/typings';
import { ToolsFormData } from '../typings';

import './trend-chart.scss';

export default defineComponent({
  name: 'TrendChart',
  props: {
    content: {
      type: String,
      default: ''
    },
    queryParams: {
      type: Object as PropType<IQueryParams>,
      default: () => ({})
    }
  },
  setup(props) {
    const toolsFormData = inject<Ref<ToolsFormData>>('toolsFormData');

    const timezone = ref<string>(getDefautTimezone());
    const refleshImmediate = ref<number | string>('');
    const defaultViewOptions = ref<IViewOptions>({});
    const collapse = ref(true);
    const panel = ref<PanelModel>(
      new PanelModel({
        id: 6,
        title: '',
        gridPos: {
          x: 16,
          y: 16,
          w: 8,
          h: 4
        },
        type: 'graph',
        targets: [
          {
            // data_type: 'time_series',
            api: 'apm_profile.query',
            datasource: 'time_series',
            alias: 'Sample 数',
            data: {}
          }
        ]
      })
    );

    const timeRange = computed(() => toolsFormData.value.timeRange);
    const refreshInterval = computed(() => toolsFormData.value.refreshInterval);

    provide(TIME_RANGE_KEY, timeRange);
    provide(TIMEZONE_KEY, timezone);
    provide(REFLESH_INTERVAL_KEY, refreshInterval);
    provide(REFLESH_IMMEDIATE_KEY, refleshImmediate);
    provide(VIEWOPTIONS_KEY, defaultViewOptions);
    provide(TIME_OFFSET_KEY, ref([]));

    watch(
      () => props.queryParams,
      () => {
        panel.value.targets[0].data = {
          ...props.queryParams,
          diagram_types: ['tendency']
        };
      },
      {
        immediate: true,
        deep: true
      }
    );

    function handleCollapseChange(v) {
      collapse.value = v;
    }
    return {
      panel,
      collapse,
      handleCollapseChange
    };
  },
  render() {
    return (
      <div class='trend-chart'>
        <Collapse.CollapsePanel
          modelValue={this.collapse}
          onUpdate:modelValue={this.handleCollapseChange}
          v-slots={{
            content: () => (
              <div class='trend-chart-wrap'>
                {this.collapse && (
                  <TimeSeries
                    panel={this.panel}
                    showChartHeader={false}
                    showHeaderMoreTool={false}
                  />
                )}
              </div>
            )
          }}
        >
          <div
            class='trend-chart-header'
            onClick={e => e.stopPropagation()}
          >
            <Radio.Group
              type='capsule'
              modelValue='all'
            >
              <Radio.Button label='all'>{this.$t('总趋势')}</Radio.Button>
              <Radio.Button label='trace'>{this.$t('Trace 数据')}</Radio.Button>
            </Radio.Group>
          </div>
        </Collapse.CollapsePanel>
      </div>
    );
  }
});
