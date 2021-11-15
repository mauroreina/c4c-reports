import react, { FC, useEffect, useState } from "react";
import ServiceTracking from "../../../services/tracking";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

const getTracking = async (setTracking: any) => {
    try {
        const { data, status } = await ServiceTracking.getDataTracking();
        if (status === 200) {
            setTracking(data);
        }
    } catch (error) {
        console.log(error);
    }
};

function UseReports() {
    const [tracking, setTracking] = useState<any>();
    const [formatedFile, setFormatedFile] = useState<any>();

    useEffect(() => {
        getTracking(setTracking);
    }, []);

    const formatObject = (tracking: any) => {
        let plainTable: any = [];
        const register = tracking?.Items.filter((r: any) => r.event === 'register');
        const history = tracking?.Items.filter((r: any) => r.event === 'history');

        register.map((r: any) => {
            const found = history.find((e: any) => e.uuid === r.uuid);
            found?.value.map((v: any) => {
                plainTable.push({
                    email: r.value,
                    uuid: r.uuid,
                    key: v.key,
                    start: v.start,
                    durationInSeconds: v?.durationInSeconds,
                    value: v.value,
                })
            })
        })
        setFormatedFile(plainTable);
        exportToExcel(plainTable)
    }

    const exportToExcel = (apiData: any) => {
        const fileName = 'trackingExcel'
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);

    };


    return {
        tracking,
        formatObject,
        formatedFile
    };
};

export default UseReports;
