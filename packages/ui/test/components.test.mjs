import "./setup.mjs";
import { afterEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import { createElement as h } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Alert, AppCard, Button, Field, Input, Label, Navbar, RadioGroup, RadioGroupItem, Select, SelectTrigger, SelectValue } from "../dist/index.js";
import { cn } from "../dist/utils.js";

afterEach(cleanup);

describe("Field", () => {
  test("links label, hint, error and required to an Input", () => {
    render(h(Field, { label: "Subdomain", hint: "mail.yourngo.org", error: "Already taken", required: true }, h(Input, {})));
    const input = screen.getByLabelText(/Subdomain/);
    assert.equal(input.tagName, "INPUT");
    assert.equal(input.getAttribute("aria-invalid"), "true");
    assert.equal(input.required, true);
    const message = document.getElementById(input.getAttribute("aria-describedby"));
    assert.equal(message.textContent, "Already taken");
    assert.equal(message.getAttribute("aria-live"), "polite");
  });

  test("keeps the label when the control sets its own id", () => {
    render(h(Field, { label: "Organisation name" }, h(Input, { id: "org" })));
    assert.equal(screen.getByLabelText("Organisation name").id, "org");
  });

  test("names a RadioGroup through aria-labelledby", () => {
    render(h(Field, { label: "Billing cycle", required: true }, h(RadioGroup, { defaultValue: "m" }, h(RadioGroupItem, { value: "m", "aria-label": "Monthly" }))));
    const group = screen.getByRole("radiogroup", { name: "Billing cycle" });
    assert.equal(group.getAttribute("aria-required"), "true");
  });

  test("marks a Select trigger required with aria-required, not the invalid required attribute", () => {
    render(h(Field, { label: "Stack", required: true }, h(Select, null, h(SelectTrigger, null, h(SelectValue, { placeholder: "Choose" })))));
    const trigger = screen.getByRole("combobox", { name: /Stack/ });
    assert.equal(trigger.getAttribute("aria-required"), "true");
    assert.equal(trigger.hasAttribute("required"), false);
  });
});

describe("Button", () => {
  test("defaults to type=button so it never submits a form by accident", () => {
    render(h(Button, null, "Save"));
    assert.equal(screen.getByRole("button", { name: "Save" }).getAttribute("type"), "button");
  });

  test("loading disables the button and marks it busy", () => {
    render(h(Button, { loading: true }, "Deploying"));
    const button = screen.getByRole("button", { name: "Deploying" });
    assert.equal(button.disabled, true);
    assert.equal(button.getAttribute("aria-busy"), "true");
  });

  test("asChild + disabled marks the link disabled and blocks the click", () => {
    let clicked = false;
    render(h(Button, { asChild: true, disabled: true, onClick: () => { clicked = true; } }, h("a", { href: "/next" }, "Next")));
    const link = screen.getByRole("link", { name: "Next" });
    assert.equal(link.getAttribute("aria-disabled"), "true");
    assert.equal(link.getAttribute("tabindex"), "-1");
    const event = new window.MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true);
    assert.equal(clicked, false);
  });
});

describe("Alert", () => {
  test("is not a live region unless asked", () => {
    const { rerender } = render(h(Alert, { tone: "danger", title: "Deployment failed" }));
    assert.equal(screen.queryByRole("alert"), null);
    rerender(h(Alert, { tone: "danger", title: "Deployment failed", live: true }));
    assert.ok(screen.getByRole("alert"));
  });
});

describe("Navbar", () => {
  test("Escape closes the mobile menu and returns focus to the menu button", () => {
    render(h(Navbar, { logo: h("span", null, "yourngo"), links: [{ label: "Apps", href: "#apps" }] }));
    const button = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(button);
    assert.equal(button.getAttribute("aria-expanded"), "true");
    fireEvent.keyDown(document, { key: "Escape" });
    assert.equal(button.getAttribute("aria-expanded"), "false");
    assert.equal(document.activeElement, button);
  });
});

describe("Patterns and utils", () => {
  test("AppCard renders the chosen heading level", () => {
    render(h(AppCard, { name: "Listmonk", description: "Newsletters", logo: h("span", null, "L"), headingLevel: 2 }));
    assert.equal(screen.getByRole("heading", { name: "Listmonk" }).tagName, "H2");
  });

  test("cn lets later utilities win", () => {
    assert.equal(cn("px-4 text-sm", "px-2"), "text-sm px-2");
  });
});

// Label is re-exported for custom fields.
test("Label renders a label element", () => {
  render(h(Label, { htmlFor: "x" }, "Name"));
  assert.equal(screen.getByText("Name").tagName, "LABEL");
});
