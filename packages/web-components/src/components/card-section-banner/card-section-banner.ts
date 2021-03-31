/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import styles from './card-section-banner.scss';
import DDSContentSection from '../content-section/content-section';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Banner component wrapped under the Card Section
 *
 * @element dds-card-section-banner
 */
@customElement(`${ddsPrefix}-card-section-banner`)
class DDSCardSectionBanner extends StableSelectorMixin(DDSContentSection) {
  /**
   * Applies section attribute
   */
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'section');
    }
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-section-banner`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCardSectionBanner;
