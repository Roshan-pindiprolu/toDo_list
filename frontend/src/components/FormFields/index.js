import { useState } from "react";
import Dropdown from "./DropdownField";
import Email from "./EmailField";
import Password from "./PasswordField";
import Texts from "./TextField";

const FormFields = (props) => {

    const { formOptions } = props

    switch(formOptions) {
        case 'dropdown':
            return <Dropdown />
        case 'email':
            return <Email />
        case 'password':
            return <Password />
        case 'switch':
            <Switches />
        case 'text':
            <Texts />
    }

}

export default FormFields;