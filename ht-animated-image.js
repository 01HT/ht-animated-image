"use strict";
import { LitElement, html, css } from "lit-element";

class HTAnimatedImage extends LitElement {
  static styles = css`<style>
    :host {
      display: block;
      position:relative;
      box-sizing:border-box;
    }

    video {
      display:block;
    }
    
    #label {
      border-radius: 3px;
      opacity: 1;
      line-height: 20px;
      padding: 0 8px;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background-color: rgba(0, 0, 0, .3);
      position: absolute;
      transition: opacity 150ms ease;
      bottom: 16px;
      left: 16px;
    }
    
    #container:hover #label {
      display:none;
    }

    [hidden] {
      display:none;
    }
  </style>`;

  render() {
    const { data, loop } = this;
    if (data === undefined || data.public_id === undefined) return;
    let poster = `${window.cloudinaryURL}/${data.resource_type}/upload/v${
      data.version
    }/${data.public_id}.jpg`;
    let mp4 = `${window.cloudinaryURL}/${data.resource_type}/upload/v${
      data.version
    }/${data.public_id}.mp4`;
    let webm = `${window.cloudinaryURL}/${data.resource_type}/upload/v${
      data.version
    }/${data.public_id}.webm`;
    return html`
      <div id="container">
        <video width="100%" height="auto" ?autoplay="${loop}" loop muted="muted" poster="${poster}">
            <source type="video/mp4" src="${mp4}">
            <source type="video/webm" src="${webm}">
        </video>
        <div id="label" ?hidden="${loop}">GIF</div>
      </div>
`;
  }

  static get properties() {
    return {
      data: { type: Object },
      loop: { type: Boolean }
    };
  }

  updated() {
    // Fix for updating video element when sources change
    if (this.data === undefined) return;
    const video = this.shadowRoot.querySelector("video");
    if (video === null) return;
    if (!this.loop) {
      video.addEventListener("mouseover", _ => {
        // video.pause();
        // video.load();
        video.play();
      });
      video.addEventListener("mouseout", _ => {
        video.pause();
      });
    }
  }
}

customElements.define("ht-animated-image", HTAnimatedImage);
