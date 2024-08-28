"use strict";
(self.webpackChunkmini_project_planner =
  self.webpackChunkmini_project_planner || []).push([
  [41],
  {
    41: (e, t, s) => {
      s.r(t), s.d(t, { Tooltip: () => n });
      class o {
        constructor(e, t = !1) {
          (this.hostElement = e ? document.getElementById(e) : document.body),
            (this.insertBefore = t);
        }
        detach() {
          this.element && this.element.remove();
        }
        attach() {
          this.hostElement.insertAdjacentElement(
            this.insertBefore ? "afterbegin" : "beforeend",
            this.element
          );
        }
      }
      class n extends o {
        constructor(e, t, s) {
          super(s), (this.closeNotifier = e), (this.text = t), this.create();
        }
        closeTooltip = () => {
          this.detach(), this.closeNotifier();
        };
        create() {
          const e = document.createElement("div");
          e.className = "card";
          const t = document.getElementById("tooltip"),
            s = document.importNode(t.content, !0);
          (s.querySelector("p").textContent = this.text), e.append(s);
          const o = this.hostElement.offsetLeft + 20,
            n =
              this.hostElement.offsetTop +
              this.hostElement.clientHeight -
              this.hostElement.parentElement.scrollTop -
              10;
          (e.style.position = "absolute"),
            (e.style.left = o + "px"),
            (e.style.top = n + "px"),
            e.addEventListener("click", this.closeTooltip),
            (this.element = e);
        }
      }
    },
  },
]);
