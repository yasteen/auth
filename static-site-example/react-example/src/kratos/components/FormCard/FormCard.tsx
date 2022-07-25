import React, { useState } from "react";
import { useImperativeHandle } from "react";
import Card from "../Card/Card";
import styles from "./FormCard.module.css";

interface InputRow {
    displayName: string;
    name: string;
    type: string;
}

type InputValues = {
    [name: string]: string;
};

interface FormCardProps {
    title: string;
    inputs: InputRow[];
    submit: React.MouseEventHandler<HTMLButtonElement>;
}

interface FormCardHandle {
    getValues: () => InputValues;
}

const FormCard = React.forwardRef<FormCardHandle, FormCardProps>(
    ({ title, inputs, submit }, ref) => {
        const [values, setValues] = useState<InputValues>(
            inputs.reduce((cum, input) => ({ ...cum, [input.name]: "" }), {})
        );

        const updateValue = (name: string, value: string) => {
            setValues({ ...values, [name]: value });
        };

        useImperativeHandle(ref, () => ({
            getValues() {
                return values;
            },
        }));

        const inputToCssClass = (input: InputRow) =>
            input.name.replaceAll(".", "_");

        return (
            <Card>
                <h2 className={styles.title}>{title}</h2>
                <form
                    className={styles.form}
                    style={{
                        gridTemplateAreas: inputs
                            .reduce(
                                (str, input) =>
                                    str +
                                    `"${inputToCssClass(
                                        input
                                    )} ${inputToCssClass(input)}_field"\n`,
                                ""
                            )
                            .concat(`"submit submit"`),
                    }}
                >
                    {inputs.map((input) => (
                        <>
                            <div
                                key={input.name}
                                style={{ gridArea: inputToCssClass(input) }}
                            >
                                {input.displayName}
                            </div>
                            <input
                                key={`${input.name}_field`}
                                type={input.type}
                                name={input.name}
                                value={values[input.name]}
                                onChange={(e) =>
                                    updateValue(e.target.name, e.target.value)
                                }
                                style={{
                                    gridArea: `${inputToCssClass(input)}_field`,
                                }}
                            />
                        </>
                    ))}
                    <button
                        className={styles.submit}
                        type="submit"
                        onClick={submit}
                    >
                        Submit
                    </button>
                </form>
            </Card>
        );
    }
);

FormCard.displayName = "FormCard";
export default FormCard;
