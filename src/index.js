import React, { Component } from "react";
import { observer } from "mobx-react";
import { formStore } from "./Store";
import { InputField, CheckBox } from "./Fields";
import { get, size } from "lodash";

const searchObj = (obj, query) => {
  let result;
  for (let key in obj) {
    let value = obj[key];
    if (key === "props") {
      return searchObj(value, query);
    }
    if (key === query && value !== "submit") {
      console.log(key, value, query)
      return (result = value);
    }
  }
  return result;
};

const generateStore = props => {
  let fields = {};
  if (Array.isArray(props.children)) {
    props.children.map(children => {
      let id = searchObj(children, "id");
      if (id) {
        return (fields[id] = {
          id: id,
          required: searchObj(children, "required")
        });
      }
    });
  } else {
    let id = searchObj(props.children, "id");
    fields[id] = {
      id: id,
      required: searchObj(props.children, "required") || false
    };
  }
  return fields;
};

const noop = () => { }

let store, values, getFieldValue

const Form = observer(
  class Form extends Component {
    constructor(props) {
      super(props)
      let fields = generateStore(props);
      store = formStore.create({ fields })
      values = store.values;
      getFieldValue = store.getFieldValue
    }


    componentDidMount() {
      store.addListeners();
    }

    handleSubmit(e) {
      const { validation = noop, onSubmit = noop } = this.props;
      e.preventDefault();
      if (validation(store.Values.keyValue)) {
        onSubmit(store.Values);
      }
    }
    render() {
      const { children, formName } = this.props;
      return (
        <form className={'form-container'} onSubmit={(e) => this.handleSubmit(e)}>
          {children}
        </form>
      );
    }
  }
);


export { Form, InputField, CheckBox, values, getFieldValue };