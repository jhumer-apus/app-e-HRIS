import React from 'react';
import {Button} from '@material-tailwind/react';
import { single } from 'rxjs';


interface ExportToCsvButtonInterface {
    data: any;
    header: any;
    isDisable: boolean;
    yearNumber: string | number;
    monthNumber: string | number;
}

function ExportToCsvButton(props: ExportToCsvButtonInterface)  {
    const {header, data, isDisable, monthNumber, yearNumber} = props;


    const convertToCSV = (header:string[], data:any):any => {

      if(data) {

        let content = [];
        const headerCopy = header
        const headerString = header.join(",");
        const headerDateOnly = headerCopy.splice(0, 2)

        content.push(headerString);

        const dataContent = data.map((row:any) => {

          let singleRow = [cleanValue(row.emp_no), cleanValue(row.full_name)];

          for(let i = 0; i < headerCopy.length; i++) {

            const key = headerCopy[i];
            let value = row[key]? row[key]: ''
 
            const cleanVal = cleanValue(value);
            singleRow.push(cleanVal)
          }

          return singleRow.join(",");

        });

        const dataContentString = dataContent.join("\n");
        content.push(dataContentString)

        return content.join("\n");

      } else {

        window.alert("No Data is Found")

      }
        // const replacer = (key: string, value: any) => value === null ? '' : value;
        // if(data){
        //   const header = Object.keys(data[0]);
        //   const csv = data.map((row:any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        //   csv.unshift(header.join(','));
        //   return csv.join('\r\n');
        // }else {
        //   window.alert("No Data is Found")
        // }
    };

    const cleanValue = (value:string) => {

      const valueString = value.toString();

      if(valueString.includes(",")) {
        return `"${value}"`;
      }
      return valueString;
    }

    const getMonthName = (monthNumber:any) => {
      const date = new Date(Date.UTC(2000, monthNumber - 1, 1)); // Subtract 1 from the month number since JavaScript months are zero-indexed
      return date.toLocaleString('en', { month: 'long' }); // Return the full name of the month
    }

    const downloadCSV = (csv: string, filename: string) => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownload = () => {
        if(!data){
          return; //Todo: Error Handling 
        }
        const csv = convertToCSV(header, data);
        if(csv){
          downloadCSV(csv, `${window.prompt("Enter the file name", `Skyfreight-Reports-${getMonthName(monthNumber)}-${yearNumber}`)}`);
        }
    };

    return (
        <Button 
          className='gap-2'
          color='indigo'
          variant='gradient'
          onClick={handleDownload}
          disabled={isDisable}
        >
            Export / Download as CSV
        </Button>
    );
}

export default ExportToCsvButton;