# -*- coding: utf-8 -*-
"""
Tencent is pleased to support the open source community by making 蓝鲸智云 - 监控平台 (BlueKing - Monitor) available.
Copyright (C) 2017-2022 THL A29 Limited, a Tencent company. All rights reserved.
Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""
from django.db.models import TextChoices
from django.utils.translation import ugettext_lazy as _


class WorkloadType(TextChoices):

    DEPLOYMENT = "deployment", _("deployment")

    SERVICE = "service", _("service")


class DeepflowComp:
    """一些Deepflow的固定值"""

    NAMESPACE = "deepflow"

    DEPLOYMENT_SERVER = "deepflow-server"
    DEPLOYMENT_GRAFANA = "deepflow-grafana"
    DEPLOYMENT_APP = "deepflow-app"

    SERVICE_SERVER = "deepflow-server"
    SERVICE_GRAFANA = "deepflow-grafana"
    SERVICE_APP = "deepflow-app"

    # service: deepflow-server的查询端口名称
    SERVICE_SERVER_PORT_QUERY = "querier"
    # service: deepflow-app的查询端口名称
    SERVICE_APP_PORT_QUERY = "app"

    # deepflow grafana数据源名称
    GRAFANA_DATASOURCE_TYPE_NAME = "deepflowio-deepflow-datasource"
