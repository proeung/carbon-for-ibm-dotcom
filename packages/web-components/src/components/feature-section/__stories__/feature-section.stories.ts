/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';

import imgXlg1x1 from '../../../../../storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/1312/fpo--1x1--1312x1312--002.jpg';
import imgMd1x1 from '../../../../../storybook-images/assets/960/fpo--1x1--960x960--002.jpg';
import imgSm1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXs1x1 from '../../../../../storybook-images/assets/320/fpo--1x1--320x320--002.jpg';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, href } = parameters?.props?.['dds-feature-section'] ?? {};
  return html`
    <dds-feature-section>
      <dds-image slot="image" default-src="${ifNonNull(imgLg1x1)}">
        <dds-image-item media="(min-width: 1584px)" srcset="${imgXlg1x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 1312px)" srcset="${imgLg1x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 960px)" srcset="${imgMd1x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 720px)" srcset="${imgSm1x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 0px)" srcset="${imgXs1x1}"> </dds-image-item>
      </dds-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-item-paragraph slot="copy">${copy}</dds-content-item-paragraph>

      <dds-card-link slot="footer" href="${href}" type="local">
        Try a free virtual business framing session with IBM Garage
        <dds-card-footer>
          <svg
            slot="icon"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
          </svg>
        </dds-card-footer>
      </dds-card-link>
    </dds-feature-section>
  `;
};

export default {
  title: 'Components/Feature section',
  decorators: [
    story => html`
      ${story()}
    `,
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    hasGrid: true,
    knobs: {
      'dds-feature-section': ({ groupId }) => ({
        eyebrow: textNullable('Card Eyebrow (required) (eyebrow):', '5 min activity', groupId),
        heading: textNullable('Card Heading (heading):', 'Ready when you are', groupId),
        copy: textNullable(
          'Card copy (copy):',
          `We're flexible. We can work with you on a wide variety of engagements on a project 
          or consulting basis. And we're technology agnostic. Our experts work with any vendor's technology, not just IBM's. 
          You decide how you want to work and where to focus our expertise.`,
          groupId
        ),
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
      }),
    },
  },
};