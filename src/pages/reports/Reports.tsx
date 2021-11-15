import React, { FC } from "react";
import useReports from "./hook";

const Reports: FC = () => {
    const { tracking, formatObject, formatedFile } = useReports();
    return (
        <div>
            <h1>Information of the tracking for C4C website</h1>
            <input type={'button'} value={'Download Excel'} onClick={() => formatObject(tracking)} />

        </div>
    );
};

export default Reports;
