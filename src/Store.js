/* Copyright (C) 2018 TeselaGen Biotechnology, Inc. */
import { types, flow } from "mobx-state-tree";
import { size } from "lodash";

const fieldStore = types
  .model("fieldStore", {
    id: types.optional(types.string, ""),
    value: types.optional(types.union(types.string, types.boolean), false),
    type: types.optional(types.string, ""),
    required: types.optional(types.boolean, false)
  })
  .actions(self => ({
    addType(type) {
      if (type !== 'checkbox') {
        self.value = ""
      }
      self.type = type
    },
    handleValue(newValue) {
      if (self.type === "checkbox") {
        self.value = !self.value;
      } else {
        self.value = newValue;
      }
    }
  }));

export const formStore = types
  .model("formStore", {
    fields: types.optional(types.map(fieldStore), {}),
    sending: types.optional(types.boolean, false)
  })
  .actions(self => ({
    addListeners() {
      let keys = Array.from(self.fields.keys());
      keys.map(key => {
        let element = document.getElementById(key)
        self.fields.get(key).addType(element.type);
        element.addEventListener("change", function (e) {
          self.fields.get(key).handleValue(e.target.value);
        });
      });
    }
  }))
  .views(self => ({
    getFieldValue(key) {
      return self.fields.get(key).value
    },
    values() {
      let keys = Array.from(self.fields.keys());
      let obj = {};
      keys.map(key => obj[key] = self.fields.get(key).value);
      return ({
        values: keys.map(key => self.fields.get(key).value),
        keyValue: obj
      })
    },
    get Values() {
      let keys = Array.from(self.fields.keys());
      let obj = {};
      keys.map(key => obj[key] = self.fields.get(key).value);
      return ({
        values: keys.map(key => self.fields.get(key).value),
        keyValue: obj
      })
    }
  }));