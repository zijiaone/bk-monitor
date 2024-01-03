/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
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
import { Component, Emit, Prop } from 'vue-property-decorator';
import { Component as tsc } from 'vue-tsx-support';
import { DropdownMenu, Input } from 'bk-magic-vue';

import { ViewModeItem } from '../../../typings/profiling-graph';

import './chart-title.scss';

interface IChartTitleProps {
  activeMode: string;
}
interface IChartTitleEvent {
  onModeChange: string;
}

@Component
export default class ChartTitle extends tsc<IChartTitleProps, IChartTitleEvent> {
  @Prop({ required: true, type: String }) activeMode: string;

  downloadTypeMaps = ['png', 'json', 'pprof', 'html'];
  viewModeList: ViewModeItem[] = [
    { id: 'table', icon: 'table' },
    { id: 'tableAndFlame', icon: 'mc-fenping' },
    { id: 'flame', icon: 'mc-flame' },
    { id: 'topo', icon: 'Component' }
  ];
  ellipsisDirection = 'ltr';

  @Emit('modeChange')
  handleModeChange(val) {
    return val;
  }

  handleEllipsisDirectionChange(val: string) {
    this.ellipsisDirection = val;
  }

  render() {
    return (
      <div class='profiling-chart-title'>
        <div class='view-mode button-group'>
          {this.viewModeList.map(mode => (
            <div
              class={`button-group-item ${this.activeMode === mode.id ? 'active' : ''}`}
              onClick={() => this.handleModeChange(mode.id)}
            >
              <i class={`icon-monitor icon-${mode.icon}`}></i>
            </div>
          ))}
        </div>
        <Input right-icon='bk-icon icon-search' />
        <div class='ellipsis-direction button-group'>
          <div
            class={`button-group-item ${this.ellipsisDirection === 'ltr' ? 'active' : ''}`}
            onClick={() => this.handleEllipsisDirectionChange('ltr')}
          >
            <i class='icon-monitor icon-AB'></i>
          </div>
          <div
            class={`button-group-item ${this.ellipsisDirection === 'rtl' ? 'active' : ''}`}
            onClick={() => this.handleEllipsisDirectionChange('rtl')}
          >
            <i class='icon-monitor icon-YZ'></i>
          </div>
        </div>

        <DropdownMenu
          class='option-dropdown-menu'
          align='right'
        >
          <div slot='dropdown-trigger'>
            <div class='download-button'>
              <i class='icon-monitor icon-xiazai1'></i>
            </div>
          </div>
          <ul
            class='bk-dropdown-list'
            slot='dropdown-content'
          >
            {this.downloadTypeMaps.map(item => (
              <li class='profiling-view-download-menu-item'>
                <a class='profiling-view-download-menu-item'>{item}</a>
              </li>
            ))}
          </ul>
        </DropdownMenu>
      </div>
    );
  }
}
