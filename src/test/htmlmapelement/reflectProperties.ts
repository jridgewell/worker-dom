/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import anyTest, { TestInterface } from 'ava';
import { testReflectedProperties } from '../reflectPropertiesHelper';
import { HTMLMapElement } from '../../worker-thread/dom/HTMLMapElement';
import { createDocument } from '../../worker-thread/dom/Document';

const test = anyTest as TestInterface<{
  element: HTMLMapElement;
}>;

test.beforeEach(t => {
  const document = createDocument();

  t.context = {
    element: document.createElement('map') as HTMLMapElement,
  };
});

testReflectedProperties([{ name: [''] }]);
