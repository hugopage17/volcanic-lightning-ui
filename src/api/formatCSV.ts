import { Feature } from '@global-volcanic-lightning/types';

export const formatCSVData = (features: Feature[]) => {
    var csv = 'Name,Region,Volcano Type,20km Strikes,100km Strikes,Severity,Coordiantes\n';
    const csvFileData = features.map((feature) => {
        const { properties, geometry } = feature;
        return [
            properties.name,
            properties.area,
            properties.volcanoType,
            properties.twentyKmStrikes,
            properties.hundredKmStrikes,
            properties.severity === 'error' ? 'High' : 'Medium',
            `[${geometry.coordinates[0]} ${geometry.coordinates[1]}]`
        ];
    });
    csvFileData.forEach((row) => {  
        csv += row.join(',');  
        csv += "\n";  
    });
    return csv;
};

const downloadCSV = (features: Feature[], timestamp: string) => {
    const csv = formatCSVData(features) as any;
    var csvFile;  
    var downloadLink;  
    //define the file type to text/csv  
    csvFile = new Blob([csv], {type: 'text/csv'});  
    downloadLink = document.createElement("a");  
    downloadLink.download = `volcanic-lightning-${timestamp}.csv`;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";  
  
    document.body.appendChild(downloadLink);  
    downloadLink.click(); 
};

export default downloadCSV;
