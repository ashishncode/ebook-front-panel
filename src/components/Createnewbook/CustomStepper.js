import React, { useState, useEffect } from 'react';
import { Stepper, Step } from "react-form-stepper";
import PropTypes from 'prop-types';
import createnewbookStyle from "../../assets/css/createnewbook.module.css";

function CustomStepper(props) {
    const { activeStep, disabledColor } = props;
    console.log("props", props);

    // Initialize activeStepData from local storage or props
    const [activeStepData, setActiveStepData] = useState(() => {
        const storedStep = localStorage.getItem('activeStep');
        return storedStep ? parseInt(storedStep) : activeStep;
    });

    useEffect(() => {
        setActiveStepData(activeStep);
    }, [activeStep]);

    // Update local storage whenever activeStepData changes
    useEffect(() => {
        localStorage.setItem('activeStep', activeStepData.toString());
    }, [activeStepData]);
    console.log("activeStepData", activeStepData);


    return (

        <Stepper activeStep={activeStepData} disabledColor={disabledColor}>
            <Step
                label="Book Details"
                className={createnewbookStyle.step_active}
            />
            <Step
                label="Main Characters"
                className={activeStepData >= 2 ? createnewbookStyle.step_active_common : createnewbookStyle.step_common}
            />
            <Step
                label="Setting"
                className={activeStepData >= 3 ? createnewbookStyle.step_active_common : createnewbookStyle.step_common}
            />
            <Step
                label="Plot Summary"
                className={activeStepData >= 4 ? createnewbookStyle.step_active_common : createnewbookStyle.step_common}
            />
            <Step
                label="Writing Preferences"
                className={activeStepData >= 5 ? createnewbookStyle.step_active_common : createnewbookStyle.step_common}
            />
        </Stepper>
    );
}

CustomStepper.propTypes = {
    activeStep: PropTypes.number.isRequired,
    disabledColor: PropTypes.string.isRequired,
};

export default CustomStepper;
