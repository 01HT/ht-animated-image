"use strict";
import { LitElement, html } from "@polymer/lit-element";
class HTAnimatedImage extends LitElement {
  _render({ data }) {
    let poster = `${window.cloudinaryURL}/image/upload/v${data.version}/${
      data.public_id
      }.jpg`;
    let mp4 = `${window.cloudinaryURL}/image/upload/v${data.version}/${
      data.public_id
      }.mp4`;
    let webm = `${window.cloudinaryURL}/image/upload/v${data.version}/${
      data.public_id
      }.webm`;
    return html`
      <style>
        :host {
          display: block;
          position:relative;
          box-sizing:border-box;
        }
      </style>
      <div id="container">
        <video width="100%" height="auto" autoplay loop muted="muted" poster$="${poster}">
            <source type="video/mp4" src$="${mp4}">
            <source type="video/webm" src$="${webm}">
        </video>
      </div>
`;
  }

  static get is() {
    return "ht-animated-image";
  }

  static get properties() {
    return {
      data: Object
    };
  }
}

customElements.define(HTAnimatedImage.is, HTAnimatedImage);
