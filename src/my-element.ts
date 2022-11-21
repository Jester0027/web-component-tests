import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("my-element")
export class MyElement<T = any> extends LitElement {
  @state()
  private _data: T[] = [];
  @state()
  private _columns: { key: keyof T }[] = [];

  @property({ type: Boolean })
  base64: boolean = false;
  @property()
  data: string = "";
  @property()
  columns: string = "";

  private readonly parse = (data: string) =>
    JSON.parse(this.base64 ? atob(data) : data);

  override connectedCallback() {
    super.connectedCallback();
    this._data = this.parse(this.data);
    this._columns = this.parse(this.columns);
  }

  override render() {
    return html`
      <div>
        ${this._columns.map((col) =>
          this._data.map((item) => html`<p>${col.key} ${item[col.key]}</p>`)
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
