import List from '../data/List';

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * LegendVisualProvider is an bridge that pick encoded color from data and
 * provide to the legend component.
 */
class LegendVisualProvider {

    private _getDataWithEncodedVisual: () => List;
    private _getRawData: () => List;

    constructor(
        // Function to get data after filtered. It stores all the encoding info
        getDataWithEncodedVisual: () => List,
        // Function to get raw data before filtered.
        getRawData: () => List
    ) {
        this._getDataWithEncodedVisual = getDataWithEncodedVisual;
        this._getRawData = getRawData;
    }

    getAllNames(): string[] {
        var rawData = this._getRawData();
        // We find the name from the raw data. In case it's filtered by the legend component.
        // Normally, the name can be found in rawData, but can't be found in filtered data will display as gray.
        return rawData.mapArray(rawData.getName);
    }

    containName(name: string): boolean {
        var rawData = this._getRawData();
        return rawData.indexOfName(name) >= 0;
    }

    indexOfName(name: string): number {
        // Only get data when necessary.
        // Because LegendVisualProvider constructor may be new in the stage that data is not prepared yet.
        // Invoking Series#getData immediately will throw an error.
        var dataWithEncodedVisual = this._getDataWithEncodedVisual();
        return dataWithEncodedVisual.indexOfName(name);
    }

    getItemVisual(dataIndex: number, key: string): any {
        // Get encoded visual properties from final filtered data.
        var dataWithEncodedVisual = this._getDataWithEncodedVisual();
        return dataWithEncodedVisual.getItemVisual(dataIndex, key);
    }
}

export default LegendVisualProvider;