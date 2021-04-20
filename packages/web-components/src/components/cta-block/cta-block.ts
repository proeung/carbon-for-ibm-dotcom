/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, internalProperty, property, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import styles from './cta-block.scss';
import DDSContentBlock from '../content-block/content-block';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  action: '_hasAction',
  'link-list': '_hasLinkList',
};

/**
 * The CTA BLOCK pattern
 *
 * @element dds-cta-block
 * @slot heading - The text heading.
 * @slot action - The CTA Buttons.
 */
@customElement(`${ddsPrefix}-cta-block`)
class DDSCTABlock extends StableSelectorMixin(DDSContentBlock) {
  @property({ type: Boolean, attribute: 'no-border', reflect: true })
  _noBorder = false;

  /**
   * `true` if there are CTA action in the content item area.
   */
  @internalProperty()
  protected _hasAction = false;

  /**
   * `true` if there is a link list.
   */
  @internalProperty()
  protected _hasLinkList = false;

  /**
   * Checks if the no-border attribute has changed and applies the border class accordingly
   */
  updated(changedProperties) {
    if (changedProperties.has('_noBorder')) {
      this.classList.toggle(`${prefix}--cta-block__border`, !this._noBorder);
    }
  }

  /**
   * Handles `slotchange` event, also sets height to all headings to the tallest one.
   *
   * @param event The event.
   */
  protected _handleSlotChange(event: Event) {
    const { target } = event;
    const { name } = target as HTMLSlotElement;

    if (!slotExistencePropertyNames[name]) {
      super._handleSlotChange(event);
      return;
    }
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name]] = hasContent;
  }

  /**
   * @returns The actions (CTA) content.
   */
  protected _renderActions(): TemplateResult | string | void {
    const { _hasAction: hasAction, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasAction}" class="${prefix}--content-item__cta">
        <slot name="action" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The main content.
   */
  protected _renderContent(): TemplateResult | string | void {
    const { _hasContent: hasContent, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasContent}" class="${prefix}--helper-wrapper">
        <div class="${prefix}--content-item-wrapper">
          <slot @slotchange="${handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  /**
   * @returns The main content.
   */
  protected _renderInnerBody(): TemplateResult | string | void {
    // Note: The media content in `<dds-cta-section>` is not supported at the time of writing this code
    return html`
      ${this._renderActions()}${this._renderLinkList()}${this._renderContent()}
    `;
  }

  /**
   * @returns The link list content.
   */
  protected _renderLinkList(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot name="link-list" @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * @returns The footer content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderFooter(): TemplateResult | string | void {
    // Note: The CTA content of `<dds-cta-section>` is rendered above the main content, instead of as a footer.
    // The slot name reflects that (`action`)
    return undefined;
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-block`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCTABlock;