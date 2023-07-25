import React from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";

RHFTextarea.propTypes = {
    name: PropTypes.string,
};

export default function RHFTextarea({ name, ...other }) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <TextareaAutosize
                        aria-label="minimum height"
                        {...field}
                        InputLabelProps={{
                            style: {
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#FF5B00",
                            },
                        }}
                        value={field.value }
                        error={!!error}
                        helperText={error?.message}
                        {...other}
                        style={{ width: "100%" ,height: 250 }}
                    />
                </>
            )}
        />
    );
}
