// (C) 2019 GoodData Corporation
import * as React from "react";
import { mount } from "enzyme";
import noop = require("lodash/noop");
import DataLabelsControl, { IDataLabelsControlProps } from "../DataLabelsControl";
import { createInternalIntl } from "../../../utils/internalIntlProvider";
import { DEFAULT_LOCALE } from "../../../../constants/localization";

describe("DataLabelsControl", () => {
    const defaultProps = {
        properties: {},
        intl: createInternalIntl(DEFAULT_LOCALE),
        pushData: noop,
        isDisabled: false,
    };

    function createComponent(customProps: Partial<IDataLabelsControlProps> = {}) {
        const props = { ...defaultProps, ...customProps };
        return mount<IDataLabelsControlProps, null>(<DataLabelsControl {...props} />);
    }

    describe("Rendering", () => {
        const VISIBLE_LABEL = "show";
        const AUTO_LABEL = "auto (default)";
        const dataLabelsButtonSelector = ".s-data-labels-config .dropdown-button";
        const dataLabelsButtonTextSelector = ".s-data-labels-config .dropdown-button .button-text";

        it("should render data labels control", () => {
            const wrapper = createComponent();

            expect(wrapper.find(DataLabelsControl).length).toBe(1);
        });

        it("should render dropdown as disabled when disabled", () => {
            const wrapper = createComponent({
                isDisabled: true,
            });

            expect(wrapper.find(`${dataLabelsButtonSelector}.disabled`).length).toBe(1);
        });

        it("should pass showDisabledMessage property to the dropdown control", () => {
            const wrapper = createComponent({
                showDisabledMessage: true,
            });

            const dropdown = wrapper.find("DropdownControl");

            expect(dropdown.prop("showDisabledMessage")).toBeTruthy();
        });

        it("should have `auto` by default", () => {
            const wrapper = createComponent();

            expect(wrapper.find(dataLabelsButtonTextSelector).text()).toEqual(AUTO_LABEL);
        });

        it("should show value that was passed", () => {
            const wrapper = createComponent({
                properties: {
                    controls: {
                        dataLabels: {
                            visible: true,
                        },
                    },
                },
            });

            expect(wrapper.find(dataLabelsButtonTextSelector).text()).toEqual(VISIBLE_LABEL);
        });
    });
});